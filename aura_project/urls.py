from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers
from django.contrib import admin
from aura_backend import views

router = routers.DefaultRouter()

router.register('users', views.UsersView)
router.register('companies', views.CompaniesView)
router.register('vehicule', views.VehiculeView)
router.register('security_agent', views.SecuriyAgentsView)
router.register('request_panics', views.PanicsView)

urlpatterns = [
    url(r'^admin/', admin.site.urls), 
    path('', include(router.urls)),
    url(r'^agent_search/', views.AgentsSearch.as_view(), name="agents-search"),
    url(r'^company_search/', views.CompaniesSearch.as_view(), name="companies-search"),
    url(r'^filter_vehicule/', views.VehiculesFilters.as_view(), name="vehicules-filters"),
    url(r'^find_user/(?P<username>[\w.@+-]+)/$', views.FindUser.as_view(), name='find-user'),
]
