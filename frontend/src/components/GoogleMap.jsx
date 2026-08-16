import React from 'react';

// Free Google Maps embed - no API key or billing required
const GoogleMap = () => {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg min-h-[400px]">
      <iframe
        title="Göztepe Veteriner Kliniği Konum"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5852.604965382592!2d29.068227455820825!3d40.9803931954377!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac796f0547693%3A0xad34aa614d5c9afb!2zR8OWWlRFUEUgVkVURVLEsE5FUiBLTMSwTsSwxJ7EsA!5e0!3m2!1str!2sus!4v1786879276026!5m2!1str!2sus"
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
