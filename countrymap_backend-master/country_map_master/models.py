from django.db import models
from django.db.models.fields import NullBooleanField

# Create your models here.
class countrymap(models.Model):
    country = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    subtype = models.CharField(max_length=50)
    riskmetrics = models.CharField(max_length=50)
    value = models.CharField(max_length=50 , null=True) 
    date = models.CharField(max_length=50)

    class Meta:
        db_table="maplist"