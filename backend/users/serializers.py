from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, UserProfile, UserSession


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['specialization', 'experience_years', 'publications', 'certifications']


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 'full_name',
            'role', 'department', 'position', 'phone', 'avatar', 'bio',
            'is_verified', 'two_factor_enabled', 'profile', 'date_joined'
        ]
        read_only_fields = ['id', 'date_joined', 'is_verified']
    
    def get_full_name(self, obj):
        return obj.get_full_name()


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = [
            'username', 'email', 'password', 'password_confirm',
            'first_name', 'last_name', 'role', 'department', 'position'
        ]
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user)
        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'department', 'position',
            'phone', 'bio', 'avatar'
        ]


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError('Invalid credentials')
            if not user.is_active:
                raise serializers.ValidationError('User account is disabled')
            attrs['user'] = user
        else:
            raise serializers.ValidationError('Must include username and password')
        
        return attrs


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField()
    new_password_confirm = serializers.CharField()
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError("New passwords don't match")
        return attrs


class UserSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSession
        fields = ['session_key', 'ip_address', 'user_agent', 'created_at', 'last_activity', 'is_active']
        read_only_fields = ['session_key', 'ip_address', 'user_agent', 'created_at', 'last_activity']
