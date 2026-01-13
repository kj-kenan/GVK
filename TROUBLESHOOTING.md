# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### ❌ LibreTranslate Installation Error (torch==2.0.1)

**Error Message:**
```
ERROR: Could not find a version that satisfies the requirement torch==2.0.1
ERROR: No matching distribution found for torch==2.0.1
```

**Solution:**
✅ **This is already fixed!** We removed `libretranslate` from `requirements.txt` because:

1. LibreTranslate runs in **Docker**, not as a Python package
2. The Python package has heavy dependencies (PyTorch) that cause platform-specific issues
3. We only need `requests` library to communicate with the Docker container

**What to do:**
```bash
# Make sure you have the latest requirements.txt
cd backend
pip install -r requirements.txt
```

The `requirements.txt` now has `requests==2.31.0` instead of `libretranslate==1.5.3`.

---

### 🐳 LibreTranslate Docker Issues

**Issue: Container won't start**
```bash
docker-compose down
docker-compose up -d
docker-compose logs -f libretranslate
```

**Issue: Port 5000 already in use**
```bash
# Check what's using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Mac/Linux

# Stop the process or change port in docker-compose.yml
```

**Issue: Translations not working**
```bash
# Test if LibreTranslate is running
curl http://localhost:5000/languages

# Should return: ["en","ar","zh","fr","de","hi","id","ga","it","ja","ko","pl","pt","ru","es","tr","uk","vi"]
```

---

### 📦 Backend Installation Issues

**Issue: pip install fails**
```bash
# Upgrade pip first
python -m pip install --upgrade pip

# Try installing again
pip install -r requirements.txt
```

**Issue: Pillow installation fails (Windows)**
```bash
# Install Visual C++ Build Tools from:
# https://visualstudio.microsoft.com/visual-cpp-build-tools/

# Or use pre-built wheel:
pip install --upgrade Pillow
```

**Issue: psycopg2-binary fails**
```bash
# If you're using SQLite for development, you can comment out this line
# in requirements.txt (only needed for PostgreSQL)
```

---

### ⚛️ Frontend Installation Issues

**Issue: npm install fails**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json  # Mac/Linux
rmdir /s node_modules & del package-lock.json  # Windows

# Reinstall
npm install
```

**Issue: Port 5173 already in use**
```bash
# Kill process on port 5173
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process

# Mac/Linux:
kill -9 $(lsof -ti:5173)
```

---

### 🗄️ Database Issues

**Issue: Migrations fail**
```bash
cd backend

# Delete db.sqlite3 and migrations (start fresh)
del db.sqlite3  # Windows
rm db.sqlite3   # Mac/Linux

# Delete all migration files except __init__.py in each app
# Then run:
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

**Issue: "Table doesn't exist" errors**
```bash
python manage.py migrate --run-syncdb
```

---

### 📧 Email Issues (Development)

**Issue: Emails not sending**

For development, use console email backend:

```python
# In backend/.env
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
```

Or run a test SMTP server:
```bash
python -m smtpd -n -c DebuggingServer localhost:1025
```

Then in `.env`:
```
EMAIL_HOST=localhost
EMAIL_PORT=1025
EMAIL_USE_TLS=False
```

---

### 🌍 Translation Issues

**Issue: Translations are empty**

1. Make sure LibreTranslate Docker is running:
```bash
docker ps
# Should show libretranslate container
```

2. Check LibreTranslate logs:
```bash
docker-compose logs libretranslate
```

3. Manually trigger translation in Django Admin:
   - Select items
   - Choose "Regenerate English translations" action
   - Click "Go"

---

### 🖼️ Image Upload Issues

**Issue: Images not displaying**

1. Make sure MEDIA_ROOT directory exists:
```bash
cd backend
mkdir media
```

2. Check Django settings:
```python
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

3. Make sure backend is serving media files (development):
```python
# In backend/config/urls.py
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

---

### 🔐 CORS Issues

**Issue: API calls blocked by CORS**

Make sure in `backend/config/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

And `corsheaders.middleware.CorsMiddleware` is at the **top** of MIDDLEWARE list.

---

### 💻 General Tips

**Clear browser cache:**
- Press Ctrl+Shift+R (Windows/Linux)
- Press Cmd+Shift+R (Mac)

**Check all services are running:**
```bash
# Backend
curl http://localhost:8000/api/services/

# Frontend  
# Open http://localhost:5173/ in browser

# LibreTranslate
curl http://localhost:5000/languages
```

**Restart everything:**
```bash
# Stop all
# Ctrl+C in Django terminal
# Ctrl+C in React terminal
docker-compose down

# Start all
docker-compose up -d
cd backend && python manage.py runserver
cd frontend && npm run dev
```

---

### 📞 Still Having Issues?

1. Check the main [README.md](README.md)
2. Check [QUICKSTART.md](QUICKSTART.md)
3. Review Django logs for errors
4. Check browser console for frontend errors
5. Make sure all prerequisites are installed

---

### ✅ Verification Checklist

Run these commands to verify everything is set up correctly:

```bash
# 1. Check Python version
python --version  # Should be 3.9+

# 2. Check Node version
node --version   # Should be 18+

# 3. Check Docker
docker --version
docker-compose --version

# 4. Check LibreTranslate
curl http://localhost:5000/languages

# 5. Check Backend API
curl http://localhost:8000/api/services/

# 6. Check Frontend
# Open http://localhost:5173/ in browser
```

All good? You're ready to go! 🚀



