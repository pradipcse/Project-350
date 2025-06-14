import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function CarouselSlider() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    api.get('/api/carousel/')
      .then(res => setSlides(res.data))
      .catch(err => console.error('Failed to fetch carousel:', err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  if (!slides.length) return <div className="text-center mt-10">Loading carousel...</div>;

  const slide = slides[index];

  return (
    <div className="relative w-full h-[400px] overflow-hidden bg-gray-200 rounded-lg shadow-md">
      <img
        src={slide.image}
        alt="carousel"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-white text-center px-4">
        <h2 className="text-3xl font-bold mb-2">{slide.todays_offer}</h2>
        <p className="text-lg max-w-2xl">{slide.description}</p>
      </div>
    </div>
  );
}
