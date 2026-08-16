import React from 'react';

// Free Google Maps embed - no API key or billing required
const GoogleMap = () => {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg min-h-[400px]">
      <iframe
        title="Göztepe Veteriner Kliniği Konum"
        src="https://maps.google.com/maps?q=place_id:ChIJk3ZU8JbHyhQR-5pcTWGqNK0&output=embed&z=16&hl=tr"
        width="100%"
        height="100%"
        className="absolute inset-0 w-full h-full border-0"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default GoogleMap;
