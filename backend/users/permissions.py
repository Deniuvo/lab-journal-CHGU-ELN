from rest_framework import permissions
from .models import User


class IsAdminUser(permissions.BasePermission):
    """
    Allow access only to admin users.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == User.UserRole.ADMIN
        )


class IsModeratorUser(permissions.BasePermission):
    """
    Allow access only to moderator users.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role in [User.UserRole.ADMIN, User.UserRole.MODERATOR]
        )


class IsMentorUser(permissions.BasePermission):
    """
    Allow access only to mentor users.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role in [
                User.UserRole.ADMIN,
                User.UserRole.MODERATOR,
                User.UserRole.MENTOR
            ]
        )


class IsLeaderUser(permissions.BasePermission):
    """
    Allow access only to leader users.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role in [
                User.UserRole.ADMIN,
                User.UserRole.LEADER
            ]
        )


class IsSeniorScientistUser(permissions.BasePermission):
    """
    Allow access only to senior scientist users.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role in [
                User.UserRole.ADMIN,
                User.UserRole.MODERATOR,
                User.UserRole.SENIOR_SCIENTIST
            ]
        )


class IsJuniorScientistUser(permissions.BasePermission):
    """
    Allow access only to junior scientist users.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role in [
                User.UserRole.ADMIN,
                User.UserRole.MODERATOR,
                User.UserRole.SENIOR_SCIENTIST,
                User.UserRole.JUNIOR_SCIENTIST
            ]
        )


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed for any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj == request.user


class CanCreateExperiments(permissions.BasePermission):
    """
    Allow experiment creation only to users with appropriate permissions.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.can_create_experiments
        )


class CanEditProtocols(permissions.BasePermission):
    """
    Allow protocol editing only to users with appropriate permissions.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.can_edit_protocols
        )


class CanModerateContent(permissions.BasePermission):
    """
    Allow content moderation only to users with appropriate permissions.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.can_moderate_content
        )


class CanViewAnalytics(permissions.BasePermission):
    """
    Allow analytics viewing only to users with appropriate permissions.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.can_view_analytics
        )
