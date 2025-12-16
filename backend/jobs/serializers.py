from rest_framework import serializers
from .models import Jobs

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jobs
        fields = ['id', 'job_name', 'company', 'status', \
                  'applied_at', 'job_link', 'comment']
        