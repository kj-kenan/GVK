from django.urls import path
from .views import SiteSettingsView
from .admin_views import DashboardStatsView

urlpatterns = [
    path('settings/', SiteSettingsView.as_view(), name='site-settings'),
    path('admin/stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
]




