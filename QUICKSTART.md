# 🚀 Quick Start Guide - Göztepe Veteriner Kliniği

Get the project running in 5 minutes!

> **🆕 New Feature:** Google Maps & Reviews integration! See [GOOGLE_SETUP_GUIDE.md](GOOGLE_SETUP_GUIDE.md) for setup.

**Clinic Info:**
- 📍 Merdivenköy, Fahrettin Kerim Gökay Cd 259/4, 34732 Kadıköy/İstanbul
- 📞 0216 411 65 20
- 📧 goztepevet@gmail.com
- 🗺️ [Google Maps](https://maps.app.goo.gl/4HTpEoY2Cvhkbk2AA)

## Prerequisites

✅ Python 3.9+
✅ Node.js 18+
✅ Docker Desktop

## Step 1: Start LibreTranslate (Docker)

```bash
docker-compose up -d
```

Wait for LibreTranslate to start (~30 seconds). Check status:
```bash
docker-compose logs libretranslate
```

## Step 2: Backend Setup

Open a new terminal:

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate

# Install dependencies (takes 2-3 minutes)
pip install -r requirements.txt

# Setup database
python manage.py makemigrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser
# Enter username, email, and password when prompted

# Initialize default settings
python manage.py init_settings

# Start server
python manage.py runserver
```

✅ Backend running at **http://localhost:8000/**
✅ Admin panel at **http://localhost:8000/admin/**

## Step 3: Frontend Setup

Open another terminal:

```bash
cd frontend

# Install dependencies (takes 1-2 minutes)
npm install

# Start development server
npm run dev
```

✅ Frontend running at **http://localhost:5173/**

## 🎉 You're Ready!

### Optional: Google Maps & Reviews Setup

To enable Google Maps and Reviews features:

1. **Get API Keys:** Follow [GOOGLE_SETUP_GUIDE.md](GOOGLE_SETUP_GUIDE.md)
2. **Add to backend/.env:**
   ```
   GOOGLE_PLACES_API_KEY=your-key
   GOOGLE_PLACE_ID=your-place-id
   ```
3. **Add to frontend/.env:**
   ```
   VITE_GOOGLE_MAPS_API_KEY=your-key
   VITE_GOOGLE_PLACE_ID=your-place-id
   ```
4. **Fetch reviews:** `python manage.py fetch_google_reviews`
5. **Restart servers**

## 🎉 Access Your Site!

### Access Points:

- **Website**: http://localhost:5173/
- **Admin Panel**: http://localhost:8000/admin/
- **API**: http://localhost:8000/api/
- **LibreTranslate**: http://localhost:5000/

### First Steps:

1. **Login to Admin Panel**:
   - Go to http://localhost:8000/admin/
   - Login with your superuser credentials

2. **Configure Site Settings**:
   - Navigate to "Site Settings" in admin
   - Update address, phone, email, working hours

3. **Add Content**:
   - Add services (Services → Add Service)
   - Add team members (Team → Add Team Member)
   - Create blog categories (Blog → Categories)
   - Publish blog posts (Blog → Posts)
   - Upload gallery images (Gallery → Add Image)

4. **View Website**:
   - Open http://localhost:5173/
   - Content will appear automatically
   - Switch languages with TR/EN button

## 💡 Tips

### Content is Auto-Translated!
- Enter content in Turkish
- English translation generates automatically
- You can manually edit English translations after

### Test Email Notifications
For development, run a test SMTP server:
```bash
python -m smtpd -n -c DebuggingServer localhost:1025
```
Update backend/.env:
```
EMAIL_HOST=localhost
EMAIL_PORT=1025
EMAIL_USE_TLS=False
```

### Stop Services
```bash
# Stop Django (Ctrl+C in terminal)
# Stop React (Ctrl+C in terminal)
# Stop LibreTranslate:
docker-compose down
```

## 🐛 Troubleshooting

### LibreTranslate not starting?
```bash
docker-compose down
docker-compose up -d
docker-compose logs -f libretranslate
```

### Port already in use?
- Backend (8000): Stop other Django apps
- Frontend (5173): Stop other Vite/React apps
- LibreTranslate (5000): Check Docker Desktop

### Dependencies not installing?
```bash
# Backend
pip install --upgrade pip
pip install -r requirements.txt

# Frontend
npm cache clean --force
npm install
```

### Database errors?
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

## 📚 Next Steps

- Read [README.md](README.md) for full documentation
- Check [backend/README.md](backend/README.md) for backend details
- Check [frontend/README.md](frontend/README.md) for frontend details
- Review [veterinary_clinic_requirements.md](veterinary_clinic_requirements.md) for features

## 🎯 Sample Data

Want to see the site with sample data? Create some in the admin panel:

**Services** (3-4 services):
- Genel Muayene
- Aşılama
- Cerrahi Operasyonlar
- Diş Bakımı

**Team Members** (2-3 members):
- Add photos and bios
- Set specialties

**Blog Posts**:
- Create categories first
- Then add 2-3 posts

**Gallery**:
- Upload 5-10 clinic photos
- Use categories

## ✅ Checklist

- [ ] Docker running
- [ ] LibreTranslate started
- [ ] Backend migrations done
- [ ] Superuser created
- [ ] Site settings initialized
- [ ] Backend server running
- [ ] Frontend dependencies installed
- [ ] Frontend server running
- [ ] Admin panel accessible
- [ ] Website loads correctly

---

**Need Help?** Check the troubleshooting section or open an issue.

**Happy Coding! 🚀**


