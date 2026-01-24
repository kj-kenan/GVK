#!/usr/bin/env python
"""
Update site settings with clinic information
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.core.models import SiteSettings

# Load or create settings
settings = SiteSettings.load()

# Update contact information
settings.phone = '0216 411 6520'
settings.mobile = '+90 533 070 2424'
settings.email = 'goztepevet@gmail.com'
settings.address_tr = 'Merdivenköy, Fahrettin Kerim Gökay Cd 259/4, 34732 Kadıköy/İstanbul'
settings.address_en = 'Merdivenköy, Fahrettin Kerim Gökay Cd 259/4, 34732 Kadıköy/İstanbul'

# Update working hours
settings.working_hours_weekday_tr = 'Pazartesi-Cuma 09:00-18:00'
settings.working_hours_weekday_en = 'Monday-Friday 09:00-18:00'
settings.working_hours_weekend_tr = 'Cumartesi-Pazar 10:00-16:00'
settings.working_hours_weekend_en = 'Saturday-Sunday 10:00-16:00'

# Admin email
settings.admin_email = 'goztepevet@gmail.com'

# Save settings
settings.save()

print('Site settings updated successfully!')
print('-----------------------------------')
print(f'Address: {settings.address_tr}')
print(f'Phone: {settings.phone}')
print(f'Mobile: {settings.mobile}')
print(f'Email: {settings.email}')
