# 🗺️ Google Maps & Reviews Integration

This document provides a technical overview of the Google Maps and Reviews integration.

## Features Implemented

### ✅ Google Reviews Display
- Fetches reviews from Google Business Profile via Places API
- Displays reviews in a beautiful Swiper carousel
- Shows reviewer name, profile picture, rating, text, and time
- "Read more" expansion for long reviews
- Cached to avoid API rate limits (refreshes every 24 hours)
- Summary with average rating and total review count

### ✅ Google Maps Integration
- Interactive embedded map showing clinic location
- Custom marker with clinic information
- Info window with name, address, and rating
- Responsive design for all screen sizes
- Smooth loading states and error handling

## Architecture

### Backend (Django)

#### Apps Structure
```
backend/apps/reviews/
├── models.py              # GoogleReview & ReviewsCache models
├── views.py               # REST API viewsets
├── serializers.py         # DRF serializers
├── admin.py               # Django admin configuration
├── urls.py                # API endpoints
└── management/
    └── commands/
        └── fetch_google_reviews.py  # CLI command to fetch reviews
```

#### Database Models

**GoogleReview:**
- Stores individual reviews from Google
- Fields: author_name, profile_photo_url, rating, text, time, etc.
- Auto-ordered by time (newest first)

**ReviewsCache:**
- Stores metadata about review fetching
- Prevents excessive API calls (24-hour cache)
- Tracks average rating and total review count

#### API Endpoints

```
GET /api/reviews/                    # List all reviews
GET /api/reviews/summary/            # Get summary with reviews
POST /api/reviews/refresh/           # Force refresh (admin only, rate limited)
```

#### Management Command

```bash
# Fetch reviews (respects 24-hour cache)
python manage.py fetch_google_reviews

# Force refresh
python manage.py fetch_google_reviews --force
```

### Frontend (React)

#### Components Structure

```
frontend/src/components/
├── GoogleMap.jsx                    # Interactive map component
└── GoogleReviews/
    ├── ReviewsCarousel.jsx          # Main carousel with Swiper
    └── ReviewCard.jsx               # Individual review card
```

#### Key Libraries

- **@googlemaps/js-api-loader** - Loads Google Maps JavaScript API
- **swiper** - Carousel/slider for reviews
- **framer-motion** - Smooth animations

## API Usage & Costs

### Google Places API

**Free Tier (per month):**
- 100,000 requests free
- After: $17 per 1,000 requests

**Your Usage:**
- 1 fetch per day = ~30 requests/month
- **Cost: $0** (well within free tier)

### Maps JavaScript API

**Free Tier (per month):**
- 28,500 map loads free
- After: $7 per 1,000 loads

**Your Usage:**
- ~500 visitors/day × 1 load = 15,000 loads/month
- **Cost: $0** (within free tier)

## Security

### API Key Restrictions

**Backend API Key:**
- Restricted by IP address (server only)
- Only Places API enabled

**Frontend API Key:**
- Restricted by HTTP referrer (your domain)
- Only Maps JavaScript API enabled

### Environment Variables

```bash
# Backend (.env)
GOOGLE_PLACES_API_KEY=...
GOOGLE_PLACE_ID=...

# Frontend (.env)
VITE_GOOGLE_MAPS_API_KEY=...
VITE_GOOGLE_PLACE_ID=...
```

**Note:** Never commit .env files to Git!

## Caching Strategy

### Why Cache?
- Avoid hitting API rate limits
- Reduce costs
- Improve performance
- Reviews don't change frequently

### Cache Implementation
1. **Database Cache:** Reviews stored in PostgreSQL/SQLite
2. **Time-based Refresh:** Auto-refresh after 24 hours
3. **Manual Override:** Force refresh with `--force` flag
4. **Admin Control:** Refresh endpoint for authorized users

### Cache Flow
```
Request → Check ReviewsCache.should_refresh()
         ↓
         Is cache > 24 hours old?
         ↓              ↓
        YES            NO
         ↓              ↓
    Fetch from      Return from
    Google API      database
         ↓
    Update cache
         ↓
    Return fresh data
```

## Error Handling

### Backend
- API request failures logged
- Graceful degradation (shows empty state)
- Rate limiting on refresh endpoint

### Frontend
- Loading states during data fetch
- Error messages for failed API calls
- Fallback avatars for missing profile pictures
- Graceful map loading failures

## Automation

### Recommended: Daily Auto-Refresh

**Windows (Task Scheduler):**
```
Program: C:\path\to\venv\Scripts\python.exe
Arguments: manage.py fetch_google_reviews
Start in: C:\path\to\backend
Schedule: Daily at 2:00 AM
```

**Linux/Mac (Cron):**
```bash
0 2 * * * cd /path/to/backend && ./venv/bin/python manage.py fetch_google_reviews
```

## Monitoring

### Check Review Status

**Admin Panel:**
1. Go to http://localhost:8000/admin/
2. Navigate to "Google Reviews"
3. View imported reviews and cache status

**API:**
```bash
curl http://localhost:8000/api/reviews/summary/
```

**Database:**
```sql
SELECT COUNT(*) FROM reviews_googlereview;
SELECT * FROM reviews_reviewscache;
```

## Development Notes

### Testing Without API Keys

The components handle missing API keys gracefully:
- Map shows error message
- Reviews show empty state
- No crashes or broken functionality

### Local Development

1. Use environment variables for API keys
2. Test with `--force` flag to bypass cache
3. Monitor Chrome DevTools for API errors
4. Check Django logs for backend issues

### Production Deployment

1. **Set environment variables** on your hosting platform
2. **Restrict API keys** to production domains
3. **Set up automated refresh** (cron/scheduler)
4. **Monitor API usage** in Google Cloud Console
5. **Enable HTTPS** (required for geolocation features)

## Troubleshooting

### Reviews Not Showing

**Check:**
1. API key configured in backend/.env
2. Place ID is correct
3. Reviews fetched: `python manage.py fetch_google_reviews`
4. Backend running and accessible
5. CORS configured correctly

### Map Not Loading

**Check:**
1. API key configured in frontend/.env
2. Maps JavaScript API enabled
3. API key allows your domain
4. Browser console for errors
5. Dev server restarted after .env changes

### "REQUEST_DENIED" Error

**Causes:**
- API key invalid
- API not enabled
- Billing not set up
- API key restrictions too strict

**Solution:**
1. Check API key in Google Cloud Console
2. Enable required APIs
3. Set up billing (free tier available)
4. Adjust API key restrictions

## Future Enhancements

### Potential Improvements
- [ ] Review filtering by rating
- [ ] Multi-language review support
- [ ] Review response from business
- [ ] Photo galleries from reviews
- [ ] Directions integration
- [ ] Business hours display
- [ ] Click-to-call/email buttons

### Advanced Features
- [ ] Sentiment analysis on reviews
- [ ] Review analytics dashboard
- [ ] Automated response suggestions
- [ ] Social media integration
- [ ] Review reminders to customers

## Resources

- [Google Maps JavaScript API Docs](https://developers.google.com/maps/documentation/javascript)
- [Google Places API Docs](https://developers.google.com/maps/documentation/places/web-service)
- [Swiper Documentation](https://swiperjs.com/)
- [Google Cloud Pricing](https://cloud.google.com/maps-platform/pricing)

## Support

For setup help, see [GOOGLE_SETUP_GUIDE.md](GOOGLE_SETUP_GUIDE.md)

For general troubleshooting, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md)


