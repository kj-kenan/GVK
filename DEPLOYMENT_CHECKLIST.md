# 🚀 Deployment Checklist

Production'a geçmeden önce kontrol edilmesi gerekenler.

---

## 📋 Öncesi (Local)

### Backend

- [ ] Tüm paketler yüklü: `pip install -r requirements.txt`
- [ ] Migrations yapıldı: `python manage.py migrate`
- [ ] Static files toplandı: `python manage.py collectstatic`
- [ ] Admin superuser oluşturuldu
- [ ] Site settings dolduruldu (`python manage.py init_settings`)
- [ ] Google Reviews çekildi (`python manage.py fetch_google_reviews`)

### Frontend

- [ ] Tüm paketler yüklü: `npm install`
- [ ] Build çalışıyor: `npm run build`
- [ ] Preview test edildi: `npm run preview`
- [ ] Console'da hata yok (F12)

---

## 🔒 Güvenlik

### Backend

- [ ] `DEBUG=False` yapıldı
- [ ] `SECRET_KEY` değiştirildi (50+ karakter, rastgele)
- [ ] `ALLOWED_HOSTS` domain ile güncellendi
- [ ] `CORS_ALLOWED_ORIGINS` production domain eklendi
- [ ] `.env` dosyası `.gitignore`'da
- [ ] Database şifresi güçlü
- [ ] Admin paneli URL değiştirildi (opsiyonel)

### Frontend

- [ ] `.env` dosyası `.gitignore`'da
- [ ] API keys güvenli
- [ ] No console.log in production code
- [ ] Error boundaries ekli

---

## 🌍 Domain & Hosting

### Backend (Django)

- [ ] PostgreSQL veritabanı hazır
- [ ] Gunicorn kurulu
- [ ] Nginx yapılandırıldı
- [ ] SSL sertifikası (Let's Encrypt)
- [ ] Static files CDN'e yüklendi (opsiyonel)
- [ ] Media files backup alınıyor

### Frontend (React)

- [ ] Build dosyaları yüklendi
- [ ] CDN yapılandırıldı (opsiyonel)
- [ ] DNS ayarları yapıldı
- [ ] HTTPS aktif

---

## ⚙️ Environment Variables

### Backend `.env`

```env
# Production Settings
DEBUG=False
SECRET_KEY=your-super-secret-production-key-minimum-50-characters-long
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
ENVIRONMENT=production

# Database
DB_ENGINE=django.db.backends.postgresql
DB_NAME=veterinary_production
DB_USER=postgres_user
DB_PASSWORD=strong-database-password
DB_HOST=localhost
DB_PORT=5432

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=info@yourdomain.com
EMAIL_HOST_PASSWORD=email-app-password
DEFAULT_FROM_EMAIL=Göztepe Veteriner <info@yourdomain.com>
ADMIN_EMAIL=admin@yourdomain.com

# Google
GOOGLE_PLACES_API_KEY=your-backend-api-key
GOOGLE_PLACE_ID=ChIJxxxxxxxxxx

# Sentry (recommended)
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# CORS
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### Frontend `.env`

```env
# Production Settings
VITE_API_BASE_URL=https://yourdomain.com/api
VITE_GOOGLE_MAPS_API_KEY=your-frontend-api-key
VITE_GOOGLE_PLACE_ID=ChIJxxxxxxxxxx

# Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 🗄️ Database

- [ ] PostgreSQL kurulu ve çalışıyor
- [ ] Database backup stratejisi var
- [ ] Auto backup aktif (günlük)
- [ ] Migration history temiz
- [ ] Test data temizlendi

---

## 📊 Monitoring & Analytics

- [ ] Sentry projesi oluşturuldu
- [ ] Sentry DSN backend'e eklendi
- [ ] Google Analytics property oluşturuldu
- [ ] GA Measurement ID frontend'e eklendi
- [ ] Google Search Console eklendi
- [ ] Sitemap.xml oluşturuldu (opsiyonel)
- [ ] robots.txt yapılandırıldı (opsiyonel)

---

## 🔧 Server Yapılandırma

### Nginx Config Örneği

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Frontend
    location / {
        root /var/www/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Static files
    location /static/ {
        alias /var/www/backend/staticfiles/;
    }

    # Media files
    location /media/ {
        alias /var/www/backend/media/;
    }
}
```

### Gunicorn Service

```ini
[Unit]
Description=Gunicorn daemon for Django
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/backend
ExecStart=/var/www/backend/venv/bin/gunicorn \
          --workers 3 \
          --bind 127.0.0.1:8000 \
          config.wsgi:application

[Install]
WantedBy=multi-user.target
```

---

## 📱 PWA

- [ ] `manifest.json` doğru yapılandırılmış
- [ ] Icons hazır (192x192, 512x512)
- [ ] Service worker çalışıyor
- [ ] Offline fallback sayfası var (opsiyonel)
- [ ] "Ana ekrana ekle" prompt test edildi

---

## 🧪 Production Test

### Functionality

- [ ] Tüm sayfalar açılıyor
- [ ] Forms çalışıyor (contact, testimonials)
- [ ] Admin paneli erişilebilir
- [ ] Login/logout çalışıyor
- [ ] API endpoints çalışıyor
- [ ] Image upload çalışıyor
- [ ] Email gönderimi çalışıyor

### Performance

- [ ] Lighthouse score 90+
- [ ] GTmetrix grade A
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Images optimize edilmiş

### SEO

- [ ] Meta tags doğru
- [ ] Open Graph tags doğru
- [ ] Sitemap var
- [ ] robots.txt var
- [ ] Canonical URLs doğru
- [ ] Alt texts resimlerde var

### Security

- [ ] HTTPS çalışıyor
- [ ] SSL certificate geçerli
- [ ] HSTS headers aktif
- [ ] No mixed content warnings
- [ ] CORS doğru yapılandırılmış
- [ ] Rate limiting çalışıyor

---

## 🔄 Post-Deployment

### Immediate (İlk Saat)

- [ ] Tüm sayfaları manuel test et
- [ ] Sentry'de error var mı kontrol et
- [ ] Google Analytics veri geliyor mu?
- [ ] Forms test et (gerçek submission)
- [ ] Email notifications geliyor mu?
- [ ] WhatsApp button çalışıyor mu?

### First Day

- [ ] Google Search Console'a site ekle
- [ ] Google Analytics raporlarını incele
- [ ] Sentry dashboard kontrol et
- [ ] Server logs kontrol et
- [ ] Database backup kontrol et

### First Week

- [ ] SEO rankings kontrol et
- [ ] Page performance metrics
- [ ] User feedback topla
- [ ] Analytics insights incele
- [ ] Olası bugları düzelt

---

## 📞 Önemli Bilgiler

### Support Contacts

- Domain: [Domain sağlayıcı]
- Hosting: [Hosting sağlayıcı]
- SSL: [Let's Encrypt / CloudFlare]
- Email: [Email provider]
- Database: [DB provider]

### Credentials

⚠️ **Güvenli yerde sakla!**

- Admin panel: `yourdomain.com/admin`
- Database credentials
- FTP/SSH credentials
- Email credentials
- API keys
- Sentry project keys

---

## 🎯 Başarı Metrikleri

### Week 1 Goals

- [ ] 0 critical errors in Sentry
- [ ] Lighthouse score maintained
- [ ] 500+ page views (organic)
- [ ] 5+ WhatsApp messages
- [ ] 3+ contact form submissions

### Month 1 Goals

- [ ] Top 10 Google ranking (target keywords)
- [ ] 5000+ page views
- [ ] 50+ WhatsApp conversations
- [ ] 20+ contact submissions
- [ ] 10+ Google reviews

---

## ✅ Final Check

- [ ] README.md güncellendi
- [ ] Documentation tamamlandı
- [ ] Team'e bilgi verildi
- [ ] Backup stratejisi aktif
- [ ] Monitoring aktif
- [ ] Support plan hazır

---

**Deployment Hazır!** 🚀

Son kontrol: Tüm checkbox'lar işaretli mi?

**Deploy Tarihi**: _______________  
**Deploy Eden**: _______________  
**Version**: 2.0.0
