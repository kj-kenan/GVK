import React from 'react';

// Free Google Maps embed - no API key or billing required
const GoogleMap = () => {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg min-h-[400px]">
      <iframe
        title="Göztepe Veteriner Kliniği Konum"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3012.3!2d29.0506!3d40.9765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ccb796f954765f%3A0xad34aa614d4d9bfb!2sG%C3%B6ztepe%20Veteriner%20Klini%C4%9Fi!5e0!3m2!1str!2str!4v1699999999999!5m2!1str!2str"
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
