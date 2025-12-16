from django.db import models
from django.utils import timezone

# Create your models here.
class Jobs(models.Model):
    STATUS_CHOICES = [
        ('applied','Applied'), 
        ('interview','Interview'), 
        ('offer', 'Offer'), 
        ('rejected', 'Rejected'),
        ('withdrawn', 'Withdrawn')
    ]

    job_name = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='applied')
    applied_at = models.DateTimeField(default=timezone.now)
    job_link = models.URLField(max_length=500, blank=True)
    comment = models.TextField(blank=True, null=True)

    # defult order the jobs by applied time
    class Meta:
        ordering = ['-applied_at']

    def __str__(self):
        return f"{self.job_name} at {self.company}"
    


