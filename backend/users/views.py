from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
# Google OAuth
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

from rest_framework import status

from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserSerializer

User = get_user_model()

class GoogleLogin(SocialLoginView):
    """
    Google OAuth Login with JWT
    POST /auth/google/
    Body: { "access_token": "google_access_token" }
    Response: {
        "access": "jwt_access_token",
        "refresh": "jwt_refresh_token",
        "user": {...}
    }
    """
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:5173"
    client_class = OAuth2Client
    
    def post(self, request, *args, **kwargs):
        # Call parent method to handle Google OAuth
        response = super().post(request, *args, **kwargs)
        print('response google', response)
        
        # Customize response
        if response.status_code in [200, 204]:
            user = self.user
            
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': UserSerializer(user).data,
                'message': 'Google login successful'
            }, status=status.HTTP_200_OK)
        
        return response


class RegisterView(generics.CreateAPIView):
    """
    User Registration with JWT
    POST /auth/register/
    Response: {
        "user": {...},
        "access": "jwt_access_token",
        "refresh": "jwt_refresh_token"
    }
    """
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
         # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'message': 'User registered successfully'
        }, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    """
    User Login with JWT
    POST /auth/login/
    Body: { "email": "...", "password": "..." }
    Response: {
        "user": {...},
        "access": "jwt_access_token",
        "refresh": "jwt_refresh_token"
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
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'user': UserSerializer(user).data,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'message': 'Login successful'
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'Invalid email or password'
            }, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    """
    User Logout - Blacklist refresh token
    POST /auth/logout/
    Body: { "refresh": "refresh_token" }
    """
    permission_classes = (IsAuthenticated,)
    
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()  # Blacklist the refresh token
            
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
    Headers: Authorization: Bearer <access_token>
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user