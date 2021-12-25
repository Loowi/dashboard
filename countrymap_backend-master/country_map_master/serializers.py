from rest_framework import serializers
from country_map_master.models import countrymap

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model=countrymap 
        fields=('country','type','subtype','riskmetrics','value','date')