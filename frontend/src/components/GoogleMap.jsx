import React, { useEffect, useRef, useState } from 'react';

const GoogleMap = ({ apiKey, placeId, center, zoom = 15 }) => {
  const mapRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!apiKey) {
      setError('Google Maps API key is not configured');
      setLoading(false);
      return;
    }

    const loadGoogleMaps = () => {
      // Check if script already loaded
      if (window.google && window.google.maps) {
        initMap();
        return;
      }

      // Load Google Maps script dynamically
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        initMap();
      };
      
      script.onerror = () => {
        setError('Google Maps yüklenirken bir hata oluştu');
        setLoading(false);
      };
      
      document.head.appendChild(script);
    };

    const initMap = () => {
      if (!window.google) return;

      const mapOptions = {
        center: center || { lat: 40.9782, lng: 29.0742 }, // Default: Istanbul
        zoom: zoom,
        mapTypeControl: false,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);

      // Add marker if placeId is provided
      if (placeId) {
        const service = new window.google.maps.places.PlacesService(map);
        
        service.getDetails(
          {
            placeId: placeId,
            fields: ['name', 'geometry', 'formatted_address', 'rating', 'user_ratings_total'],
          },
          (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && place.geometry?.location) {
              // Center map on the place
              map.setCenter(place.geometry.location);

              // Add marker
              const marker = new window.google.maps.Marker({
                map: map,
                position: place.geometry.location,
                title: place.name,
                animation: window.google.maps.Animation.DROP,
              });

              // Add info window
              const infoWindow = new window.google.maps.InfoWindow({
                content: `
                  <div style="padding: 10px; max-width: 250px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #1e3a8a;">
                      ${place.name}
                    </h3>
                    <p style="margin: 0 0 6px 0; font-size: 14px; color: #374151;">
                      ${place.formatted_address || ''}
                    </p>
                    ${
                      place.rating
                        ? `<p style="margin: 0; font-size: 14px; color: #f59e0b;">
                            ⭐ ${place.rating} (${place.user_ratings_total || 0} değerlendirme)
                          </p>`
                        : ''
                    }
                  </div>
                `,
              });

              // Show info window on marker click
              marker.addListener('click', () => {
                infoWindow.open(map, marker);
              });

              // Auto-open info window
              setTimeout(() => {
                infoWindow.open(map, marker);
              }, 500);
            }
          }
        );
      }

      setLoading(false);
    };

    try {
      loadGoogleMaps();
    } catch (err) {
      console.error('Error loading Google Maps:', err);
      setError('Google Maps yüklenirken bir hata oluştu');
      setLoading(false);
    }
  }, [apiKey, placeId, center, zoom]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center p-6">
          <p className="text-red-500 mb-2">❌ {error}</p>
          <p className="text-sm text-gray-600">Harita yüklenemedi</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-gray-600">Harita yükleniyor...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full min-h-[400px]" />
    </div>
  );
};

export default GoogleMap;


