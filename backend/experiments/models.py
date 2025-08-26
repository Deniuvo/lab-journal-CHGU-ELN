from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from taggit.managers import TaggableManager
from simple_history.models import HistoricalRecords
from ckeditor.fields import RichTextField

User = get_user_model()


class ExperimentStatus(models.TextChoices):
    PLANNED = 'planned', _('Planned')
    IN_PROGRESS = 'in_progress', _('In Progress')
    COMPLETED = 'completed', _('Completed')
    FAILED = 'failed', _('Failed')
    CANCELLED = 'cancelled', _('Cancelled')


class ExperimentPriority(models.TextChoices):
    LOW = 'low', _('Low')
    MEDIUM = 'medium', _('Medium')
    HIGH = 'high', _('High')
    CRITICAL = 'critical', _('Critical')


class Experiment(models.Model):
    title = models.CharField(max_length=200)
    description = RichTextField()
    objective = models.TextField()
    hypothesis = models.TextField(blank=True)
    
    # Status and priority
    status = models.CharField(
        max_length=20,
        choices=ExperimentStatus.choices,
        default=ExperimentStatus.PLANNED
    )
    priority = models.CharField(
        max_length=20,
        choices=ExperimentPriority.choices,
        default=ExperimentPriority.MEDIUM
    )
    
    # Dates
    planned_start_date = models.DateField()
    planned_end_date = models.DateField()
    actual_start_date = models.DateField(null=True, blank=True)
    actual_end_date = models.DateField(null=True, blank=True)
    
    # Relationships
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='created_experiments'
    )
    assigned_to = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_experiments'
    )
    collaborators = models.ManyToManyField(
        User,
        blank=True,
        related_name='collaborated_experiments'
    )
    
    # Protocol reference
    protocol = models.ForeignKey(
        'protocols.Protocol',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='experiments'
    )
    
    # Tags and metadata
    tags = TaggableManager(blank=True)
    equipment_used = models.TextField(blank=True)
    materials_used = models.TextField(blank=True)
    
    # Results and conclusions
    results = RichTextField(blank=True)
    conclusions = models.TextField(blank=True)
    success_criteria = models.TextField(blank=True)
    
    # Audit fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_archived = models.BooleanField(default=False)
    
    # History tracking
    history = HistoricalRecords()
    
    class Meta:
        verbose_name = _('Experiment')
        verbose_name_plural = _('Experiments')
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
    
    @property
    def duration_days(self):
        if self.actual_start_date and self.actual_end_date:
            return (self.actual_end_date - self.actual_start_date).days
        elif self.planned_start_date and self.planned_end_date:
            return (self.planned_end_date - self.planned_start_date).days
        return None
    
    @property
    def is_overdue(self):
        if self.status == ExperimentStatus.IN_PROGRESS and self.planned_end_date:
            from django.utils import timezone
            return timezone.now().date() > self.planned_end_date
        return False


class ExperimentStep(models.Model):
    experiment = models.ForeignKey(
        Experiment,
        on_delete=models.CASCADE,
        related_name='steps'
    )
    step_number = models.PositiveIntegerField()
    title = models.CharField(max_length=200)
    description = models.TextField()
    expected_duration = models.DurationField(null=True, blank=True)
    actual_duration = models.DurationField(null=True, blank=True)
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True)
    
    class Meta:
        verbose_name = _('Experiment Step')
        verbose_name_plural = _('Experiment Steps')
        ordering = ['step_number']
        unique_together = ['experiment', 'step_number']
    
    def __str__(self):
        return f"{self.experiment.title} - Step {self.step_number}: {self.title}"


class ExperimentComment(models.Model):
    experiment = models.ForeignKey(
        Experiment,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='experiment_comments'
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_internal = models.BooleanField(default=False)
    
    class Meta:
        verbose_name = _('Experiment Comment')
        verbose_name_plural = _('Experiment Comments')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Comment by {self.author.username} on {self.experiment.title}"


class ExperimentAttachment(models.Model):
    experiment = models.ForeignKey(
        Experiment,
        on_delete=models.CASCADE,
        related_name='attachments'
    )
    file = models.FileField(upload_to='experiment_attachments/')
    filename = models.CharField(max_length=255)
    file_type = models.CharField(max_length=100)
    file_size = models.PositiveIntegerField()
    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='uploaded_attachments'
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=500, blank=True)
    
    class Meta:
        verbose_name = _('Experiment Attachment')
        verbose_name_plural = _('Experiment Attachments')
        ordering = ['-uploaded_at']
    
    def __str__(self):
        return f"{self.filename} - {self.experiment.title}"
    
    def save(self, *args, **kwargs):
        if not self.filename:
            self.filename = self.file.name.split('/')[-1]
        super().save(*args, **kwargs)


class ExperimentLog(models.Model):
    experiment = models.ForeignKey(
        Experiment,
        on_delete=models.CASCADE,
        related_name='logs'
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='experiment_logs'
    )
    action = models.CharField(max_length=100)
    details = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    
    class Meta:
        verbose_name = _('Experiment Log')
        verbose_name_plural = _('Experiment Logs')
        ordering = ['-timestamp']
    
    def __str__(self):
        return f"{self.action} by {self.user.username} on {self.experiment.title}"
