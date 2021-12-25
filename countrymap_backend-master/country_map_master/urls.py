from django.conf.urls import url
from country_map_master import views

from django.conf.urls.static import static

urlpatterns=[
    url(r'^countrymap$',views.countrymapApi),
    url(r'^countrymap/([0-9]+)$',views.countrymapApi),
]