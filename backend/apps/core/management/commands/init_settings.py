from django.core.management.base import BaseCommand
from apps.core.models import SiteSettings


class Command(BaseCommand):
    help = 'Initialize default site settings'
    
    def handle(self, *args, **options):
        settings, created = SiteSettings.objects.get_or_create(
            pk=1,
            defaults={
                'address_tr': 'Merdivenköy, Fahrettin Kerim Gökay Cd 259/4, 34732 Kadıköy/İstanbul',
                'phone': '0216 411 65 20',
                'email': 'goztepevet@gmail.com',
                'admin_email': 'goztepevet@gmail.com',
                'working_hours_weekday_tr': 'Pazartesi-Cuma 09:00-19:00',
                'working_hours_weekend_tr': 'Cumartesi 09:00-19:00, Pazar Kapalı',
                'google_maps_embed_url': 'https://maps.app.goo.gl/4HTpEoY2Cvhkbk2AA',
            }
        )
        
        if created:
            self.stdout.write(
                self.style.SUCCESS('Site ayarları başarıyla oluşturuldu!')
            )
        else:
            self.stdout.write(
                self.style.WARNING('Site ayarları zaten mevcut.')
            )


