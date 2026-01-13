import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

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

    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: ['places', 'marker'],
    });

    loader
      .load()
      .then((google) => {
        const mapOptions = {
          center: center || { lat: 40.9782, lng: 29.0742 }, // Default: Istanbul
          zoom: zoom,
          mapTypeControl: false,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
        };

        const map = new google.maps.Map(mapRef.current, mapOptions);

        // Add marker if placeId is provided
        if (placeId) {
          const service = new google.maps.places.PlacesService(map);
          
          service.getDetails(
            {
              placeId: placeId,
              fields: ['name', 'geometry', 'formatted_address', 'rating', 'user_ratings_total'],
            },
            (place, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && place.geometry?.location) {
                // Center map on the place
                map.setCenter(place.geometry.location);

                // Add marker
                new google.maps.Marker({
                  map: map,
                  position: place.geometry.location,
                  title: place.name,
                  animation: google.maps.Animation.DROP,
                });

                // Add info window
                const infoWindow = new google.maps.InfoWindow({
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
                const marker = new google.maps.Marker({
                  map: map,
                  position: place.geometry.location,
                  title: place.name,
                });

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
      })
      .catch((err) => {
        console.error('Error loading Google Maps:', err);
        setError('Google Maps yüklenirken bir hata oluştu');
        setLoading(false);
      });
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


