from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, get_user_model
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.authtoken.models import Token
from rest_framework import status

from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserSerializer

User = get_user_model()

class GoogleLogin(SocialLoginView):
    """
    API endpoint for Google login
    POST /auth/google/
    Body: { "access_token": "google_access_token" }
    Response: { "token": "your_token", "user": {...} }
    """
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:5173"
    client_class = OAuth2Client
    
    def post(self, request, *args, **kwargs):
        # Call parent method to handle Google OAuth
        response = super().post(request, *args, **kwargs)
        
        # Customize response
        if response.status_code == 200:
            user = self.user
            
            # Get or create token
            token, created = Token.objects.get_or_create(user=user)
            
            # Return custom response with token
            return Response({
                'token': token.key,
                'user': UserSerializer(user).data,
                'message': 'Google login successful'
            }, status=status.HTTP_200_OK)
        
        return response


class RegisterView(generics.CreateAPIView):
    """
    User Registration
    POST /auth/register/
    Body: {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "SecurePass123!",
        "password2": "SecurePass123!"
    }
    """
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'user': UserSerializer(user).data,
            'token': token.key,
            'message': 'User registered successfully'
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """
    User Login with Email and Password
    POST /auth/login/
    Body: {
        "email": "john@example.com",
        "password": "SecurePass123!"
    }
    """
    permission_classes = (AllowAny,)
    
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        
        # Authenticate with email and password
        user = authenticate(request, username=email, password=password)
        
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'user': UserSerializer(user).data,
                'token': token.key,
                'message': 'Login successful'
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'Invalid email or password'
            }, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    """
    User Logout
    POST /auth/logout/
    """
    permission_classes = (IsAuthenticated,)
    
    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response({
                'message': 'Logout successful'
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    Get/Update User Profile
    GET/PATCH /auth/profile/
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user