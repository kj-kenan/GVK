# 🗺️ Google Maps & Reviews Integration Setup Guide

This guide will help you set up Google Maps and Google Reviews integration for the Göztepe Veteriner Kliniği website.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Google API Keys](#getting-google-api-keys)
- [Finding Your Google Place ID](#finding-your-google-place-id)
- [Backend Configuration](#backend-configuration)
- [Frontend Configuration](#frontend-configuration)
- [Fetching Reviews](#fetching-reviews)
- [Testing the Integration](#testing-the-integration)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Google Cloud Platform account
- Google Business Profile for your veterinary clinic
- Credit card (for Google Cloud billing - free tier available)

---

## Getting Google API Keys

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a Project"** → **"New Project"**
3. Name your project (e.g., "Goztepe-Veteriner-Website")
4. Click **"Create"**

### Step 2: Enable Required APIs

1. In the Google Cloud Console, go to **"APIs & Services"** → **"Library"**
2. Search for and enable the following APIs:
   - **Maps JavaScript API** (for map display)
   - **Places API** (for reviews and place details)
   - **Geocoding API** (optional, for address lookup)

### Step 3: Create API Credentials

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"API Key"**
3. Copy the generated API key
4. Click **"Restrict Key"** (important for security)

### Step 4: Restrict Your API Key

**For the API key:**

1. **Application restrictions:**
   - Choose **"HTTP referrers (websites)"**
   - Add your domains:
     ```
     http://localhost:5173/*
     http://127.0.0.1:5173/*
     https://yourdomain.com/*
     ```

2. **API restrictions:**
   - Select **"Restrict key"**
   - Enable:
     - Maps JavaScript API
     - Places API
     - Geocoding API

3. Click **"Save"**

### Step 5: Enable Billing (Required)

1. Go to **"Billing"** in Google Cloud Console
2. Link a billing account (Google offers $300 free credit)
3. Note: The free tier includes:
   - Maps JavaScript API: 28,500 loads per month free
   - Places API: 100,000 requests per month free

---

## Finding Your Google Place ID

### Method 1: Using Google Place ID Finder

1. Go to [Google Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Search for "Göztepe Veteriner Kliniği" or your clinic address
3. Click on the marker
4. Copy the **Place ID** (starts with "ChIJ...")

### Method 2: Using Google Maps

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your clinic
3. Click on your business listing
4. Look at the URL: `https://www.google.com/maps/place/.../@...`
5. The Place ID is embedded in the URL or use the Place ID Finder tool above

### Method 3: Using API (if you know your address)

Create a temporary Python script:

```python
import requests
import os

API_KEY = "your-api-key-here"
ADDRESS = "Your clinic full address"

url = f"https://maps.googleapis.com/maps/api/geocode/json?address={ADDRESS}&key={API_KEY}"
response = requests.get(url)
data = response.json()

if data['status'] == 'OK':
    place_id = data['results'][0]['place_id']
    print(f"Place ID: {place_id}")
```

---

## Backend Configuration

### 1. Update Environment Variables

Copy `.env.example` to `.env`:

```bash
cd backend
copy .env.example .env  # Windows
# or
cp .env.example .env    # Linux/Mac
```

Edit `backend/.env` and add:

```env
# Google Places API Configuration
GOOGLE_PLACES_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
GOOGLE_PLACE_ID=ChIJXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 2. Run Database Migrations

```bash
cd backend
.\venv\Scripts\python.exe manage.py migrate
```

### 3. Create Admin Superuser (if not already created)

```bash
.\venv\Scripts\python.exe manage.py createsuperuser
```

---

## Frontend Configuration

### 1. Update Environment Variables

Copy `.env.example` to `.env`:

```bash
cd frontend
copy .env.example .env  # Windows
# or
cp .env.example .env    # Linux/Mac
```

Edit `frontend/.env` and add:

```env
# Google Maps API Key (same as backend)
VITE_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Google Place ID (same as backend)
VITE_GOOGLE_PLACE_ID=ChIJXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# API Base URL
VITE_API_BASE_URL=http://localhost:8000/api
```

### 2. Restart Development Server

If your frontend dev server is running, restart it to load the new environment variables:

```bash
npm run dev
```

---

## Fetching Reviews

### Initial Fetch

Run the management command to fetch reviews from Google:

```bash
cd backend
.\venv\Scripts\python.exe manage.py fetch_google_reviews
```

Expected output:
```
Fetching reviews from Google Places API...
Successfully fetched 5 reviews
New: 5, Updated: 0
Average Rating: 4.8⭐ (79 total reviews)
```

### Force Refresh

To bypass the 24-hour cache:

```bash
.\venv\Scripts\python.exe manage.py fetch_google_reviews --force
```

### Automated Refresh (Optional)

#### Option 1: Windows Task Scheduler

1. Open **Task Scheduler**
2. Create a new task:
   - **Trigger:** Daily at 2:00 AM
   - **Action:** Start a program
   - **Program:** `C:\Users\kaltu\Documents\GVK\backend\venv\Scripts\python.exe`
   - **Arguments:** `manage.py fetch_google_reviews`
   - **Start in:** `C:\Users\kaltu\Documents\GVK\backend`

#### Option 2: Cron Job (Linux/Mac)

```bash
crontab -e
```

Add this line:
```
0 2 * * * cd /path/to/backend && ./venv/bin/python manage.py fetch_google_reviews
```

---

## Testing the Integration

### 1. Test Backend API

Visit in your browser or use curl:

```bash
# Get reviews summary
curl http://localhost:8000/api/reviews/summary/

# Get all reviews
curl http://localhost:8000/api/reviews/
```

Expected response:
```json
{
  "average_rating": 4.8,
  "total_reviews": 79,
  "last_fetched": "2024-12-30T11:00:00Z",
  "reviews": [
    {
      "id": 1,
      "author_name": "Ahmet Yılmaz",
      "rating": 5,
      "text": "Harika bir klinik...",
      "relative_time_description": "1 ay önce"
    }
  ]
}
```

### 2. Test Frontend

1. Start backend server:
   ```bash
   cd backend
   .\venv\Scripts\python.exe manage.py runserver
   ```

2. Start frontend dev server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Visit `http://localhost:5173`
4. Scroll to the **Google Reviews** section
5. Scroll to the **Location Map** section

### 3. Verify in Admin Panel

1. Go to `http://localhost:8000/admin/`
2. Navigate to **Google Reviews** → **Google Reviews**
3. You should see imported reviews with ratings and text

---

## Troubleshooting

### Issue: "GOOGLE_PLACES_API_KEY not found"

**Solution:** Make sure your `.env` file exists and contains the API key.

```bash
cd backend
cat .env  # Check if variables are set
```

### Issue: "API Error: REQUEST_DENIED"

**Possible causes:**
1. API key is invalid
2. Places API is not enabled
3. Billing is not set up

**Solution:**
1. Check API key in Google Cloud Console
2. Enable Places API
3. Set up billing (free tier available)

### Issue: "No reviews found"

**Possible causes:**
1. Wrong Place ID
2. Business has no reviews yet
3. API restrictions blocking the request

**Solution:**
1. Verify Place ID using Google Place ID Finder
2. Check if your Google Business has reviews
3. Check API key restrictions

### Issue: Map not loading in frontend

**Possible causes:**
1. Environment variables not loaded
2. API key restrictions blocking localhost
3. Maps JavaScript API not enabled

**Solution:**
1. Restart frontend dev server after updating `.env`
2. Add `http://localhost:5173/*` to API key restrictions
3. Enable Maps JavaScript API in Google Cloud Console

### Issue: "CORS error" when fetching reviews

**Solution:** Update `backend/config/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]
```

### Issue: Reviews are outdated

**Solution:** Force refresh reviews:

```bash
cd backend
.\venv\Scripts\python.exe manage.py fetch_google_reviews --force
```

---

## API Rate Limits & Costs

### Free Tier (per month):
- **Places API:** 100,000 requests = Free
- **Maps JavaScript API:** 28,500 loads = Free
- **Geocoding API:** 40,000 requests = Free

### Your Usage (estimated):
- **Reviews fetch:** 1 request/day = 30 requests/month
- **Map loads:** ~500 users/day × 1 load = 15,000 loads/month
- **Total cost:** $0 (well within free tier)

### Cost After Free Tier:
- Places API: $17 per 1,000 requests
- Maps JavaScript API: $7 per 1,000 loads

---

## Security Best Practices

### ✅ DO:
- Restrict API keys to specific domains
- Use environment variables (never commit `.env`)
- Enable only required APIs
- Set up usage alerts in Google Cloud
- Rotate API keys periodically

### ❌ DON'T:
- Share API keys publicly
- Commit API keys to Git
- Use unrestricted API keys
- Skip billing setup (APIs won't work)

---

## Support & Resources

- [Google Maps JavaScript API Docs](https://developers.google.com/maps/documentation/javascript)
- [Google Places API Docs](https://developers.google.com/maps/documentation/places/web-service)
- [Google Cloud Free Tier](https://cloud.google.com/free)
- [API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)

---

## Quick Reference

### Start Backend
```bash
cd backend
.\venv\Scripts\python.exe manage.py runserver
```

### Start Frontend
```bash
cd frontend
npm run dev
```

### Fetch Reviews
```bash
cd backend
.\venv\Scripts\python.exe manage.py fetch_google_reviews
```

### Force Refresh Reviews
```bash
cd backend
.\venv\Scripts\python.exe manage.py fetch_google_reviews --force
```

---

**Need help?** Check the main [QUICKSTART.md](QUICKSTART.md) or [TROUBLESHOOTING.md](TROUBLESHOOTING.md) guides.


