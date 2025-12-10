"""
User Signals for Bizzer Website
"""

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomUser


@receiver(post_save, sender=CustomUser)
def calculate_lead_score_on_save(sender, instance, created, **kwargs):
    """Calculate lead score when user is created or updated"""
    if created:
        # Calculate initial lead score
        score = instance.calculate_lead_score()
        if score != instance.lead_score:
            # Use update to avoid triggering signal again
            CustomUser.objects.filter(pk=instance.pk).update(lead_score=score)
