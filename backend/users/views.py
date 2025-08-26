from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import User, UserProfile, UserSession
from .serializers import (
    UserSerializer, UserCreateSerializer, UserUpdateSerializer,
    LoginSerializer, ChangePasswordSerializer, UserSessionSerializer
)
from .permissions import IsAdminUser, IsModeratorUser, IsOwnerOrReadOnly


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)
            
            # Create session record
            UserSession.objects.create(
                user=user,
                session_key=request.session.session_key,
                ip_address=request.META.get('REMOTE_ADDR'),
                user_agent=request.META.get('HTTP_USER_AGENT', '')
            )
            
            return Response({
                'message': 'Login successful',
                'user': UserSerializer(user).data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'})


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['role', 'department', 'is_verified']
    search_fields = ['username', 'first_name', 'last_name', 'email']
    ordering_fields = ['username', 'date_joined', 'role']
    ordering = ['username']


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return UserUpdateSerializer
        return UserSerializer


class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if user.check_password(serializer.validated_data['old_password']):
                user.set_password(serializer.validated_data['new_password'])
                user.save()
                return Response({'message': 'Password changed successfully'})
            else:
                return Response(
                    {'error': 'Current password is incorrect'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserSessionListView(generics.ListAPIView):
    serializer_class = UserSessionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return UserSession.objects.filter(user=self.request.user, is_active=True)


class UserSessionDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def delete(self, request, session_key):
        try:
            session = UserSession.objects.get(
                user=request.user,
                session_key=session_key
            )
            session.is_active = False
            session.save()
            return Response({'message': 'Session terminated successfully'})
        except UserSession.DoesNotExist:
            return Response(
                {'error': 'Session not found'},
                status=status.HTTP_404_NOT_FOUND
            )


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_stats(request):
    """Get user statistics for analytics"""
    total_users = User.objects.count()
    active_users = User.objects.filter(is_active=True).count()
    verified_users = User.objects.filter(is_verified=True).count()
    
    role_counts = {}
    for role, _ in User.UserRole.choices:
        role_counts[role] = User.objects.filter(role=role).count()
    
    return Response({
        'total_users': total_users,
        'active_users': active_users,
        'verified_users': verified_users,
        'role_distribution': role_counts
    })


@api_view(['POST'])
@permission_classes([IsAdminUser])
def toggle_user_verification(request, user_id):
    """Toggle user verification status (admin only)"""
    try:
        user = User.objects.get(id=user_id)
        user.is_verified = not user.is_verified
        user.save()
        return Response({
            'message': f'User verification toggled to {user.is_verified}',
            'user': UserSerializer(user).data
        })
    except User.DoesNotExist:
        return Response(
            {'error': 'User not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([IsAdminUser])
def change_user_role(request, user_id):
    """Change user role (admin only)"""
    try:
        user = User.objects.get(id=user_id)
        new_role = request.data.get('role')
        
        if new_role not in dict(User.UserRole.choices):
            return Response(
                {'error': 'Invalid role'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user.role = new_role
        user.save()
        return Response({
            'message': f'User role changed to {new_role}',
            'user': UserSerializer(user).data
        })
    except User.DoesNotExist:
        return Response(
            {'error': 'User not found'},
            status=status.HTTP_404_NOT_FOUND
        )
