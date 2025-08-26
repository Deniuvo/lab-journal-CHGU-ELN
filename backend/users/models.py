from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class UserRole(models.TextChoices):
    ADMIN = 'admin', _('Administrator')
    MODERATOR = 'moderator', _('Moderator')
    MENTOR = 'mentor', _('Mentor')
    LEADER = 'leader', _('Leader')
    SENIOR_SCIENTIST = 'senior_scientist', _('Senior Scientist')
    JUNIOR_SCIENTIST = 'junior_scientist', _('Junior Scientist')
    ASSISTANT = 'assistant', _('Assistant')


class User(AbstractUser):
    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.ASSISTANT
    )
    department = models.CharField(max_length=100, blank=True)
    position = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    bio = models.TextField(blank=True)
    is_verified = models.BooleanField(default=False)
    two_factor_enabled = models.BooleanField(default=False)
    
    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')
    
    def __str__(self):
        return f"{self.get_full_name()} ({self.username})"
    
    @property
    def can_create_experiments(self):
        return self.role in [
            UserRole.ADMIN,
            UserRole.MODERATOR,
            UserRole.SENIOR_SCIENTIST,
            UserRole.JUNIOR_SCIENTIST
        ]
    
    @property
    def can_edit_protocols(self):
        return self.role in [
            UserRole.ADMIN,
            UserRole.MODERATOR,
            UserRole.SENIOR_SCIENTIST
        ]
    
    @property
    def can_moderate_content(self):
        return self.role in [
            UserRole.ADMIN,
            UserRole.MODERATOR
        ]
    
    @property
    def can_view_analytics(self):
        return self.role in [
            UserRole.ADMIN,
            UserRole.LEADER,
            UserRole.MENTOR
        ]


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    specialization = models.CharField(max_length=200, blank=True)
    experience_years = models.PositiveIntegerField(default=0)
    publications = models.TextField(blank=True)
    certifications = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('User Profile')
        verbose_name_plural = _('User Profiles')
    
    def __str__(self):
        return f"Profile of {self.user.username}"


class UserSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sessions')
    session_key = models.CharField(max_length=40, unique=True)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = _('User Session')
        verbose_name_plural = _('User Sessions')
    
    def __str__(self):
        return f"Session {self.session_key} for {self.user.username}"
