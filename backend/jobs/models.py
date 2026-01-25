from django.db import models
from django.utils import timezone
from django.conf import settings


# Create your models here.
class Jobs(models.Model):
    STATUS_CHOICES = [
        ('Applied','Applied'), 
        ('Interview','Interview'), 
        ('Offer', 'Offer'), 
        ('Rejected', 'Rejected'),
        ('Withdrawn', 'Withdrawn')
    ]

    # Link to user
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='jobs'
    ) 

    position = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Applied')
    applied_at = models.DateTimeField(default=timezone.now)
    link = models.URLField(max_length=500, blank=True)
    comment = models.TextField(blank=True, null=True)

    # defult order the jobs by applied time
    class Meta:
        ordering = ['-applied_at']

    def __str__(self):
        return f"{self.job_name} at {self.company} - {self.user.username}"
    


