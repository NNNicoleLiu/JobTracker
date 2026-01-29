from django.urls import path
from .views import RegisterView, LoginView, LogoutView, UserProfileView, GoogleLogin

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('google/', GoogleLogin.as_view(), name='google_callback'),
]