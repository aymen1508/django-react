from django.db import models

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField(null=True, blank=True)
    updated_at=models.DateTimeField(auto_now=True)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title[0:50]