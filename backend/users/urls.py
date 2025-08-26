from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    # Authentication
    path('auth/login/', views.LoginView.as_view(), name='login'),
    path('auth/logout/', views.LogoutView.as_view(), name='logout'),
    
    # User management
    path('users/', views.UserListView.as_view(), name='user-list'),
    path('users/create/', views.UserCreateView.as_view(), name='user-create'),
    path('users/<int:pk>/', views.UserDetailView.as_view(), name='user-detail'),
    path('users/profile/', views.UserProfileView.as_view(), name='user-profile'),
    path('users/change-password/', views.ChangePasswordView.as_view(), name='change-password'),
    
    # Sessions
    path('users/sessions/', views.UserSessionListView.as_view(), name='user-sessions'),
    path('users/sessions/<str:session_key>/', views.UserSessionDeleteView.as_view(), name='user-session-delete'),
    
    # Admin functions
    path('users/stats/', views.user_stats, name='user-stats'),
    path('users/<int:user_id>/toggle-verification/', views.toggle_user_verification, name='toggle-verification'),
    path('users/<int:user_id>/change-role/', views.change_user_role, name='change-role'),
]
