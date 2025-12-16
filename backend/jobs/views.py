from rest_framework import viewsets
from .models import Jobs
from .serializers import JobSerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Jobs.objects.all()
    serializer_class = JobSerializer
