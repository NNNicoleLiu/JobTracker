from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Jobs
from .serializers import JobSerializer

class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Only return applications for the logged-in user
        return Jobs.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        # Automatically set the user when creating
        serializer.save(user=self.request.user)