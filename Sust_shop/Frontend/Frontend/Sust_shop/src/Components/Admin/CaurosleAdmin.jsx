import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function CarouselAdmin() {
  const [carousels, setCarousels] = useState([]);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [todaysOffer, setTodaysOffer] = useState(false);
  const [todaysOfferDescription, setTodaysOfferDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch carousel list from backend
  const fetchCarousels = async () => {
    try {
      const res = await api.get('/api/carousel/');
      setCarousels(res.data);
    } catch (err) {
      console.error('Failed to fetch carousels:', err);
    }
  };

  useEffect(() => {
    fetchCarousels();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);
    formData.append('todays_offer', todaysOffer);
    formData.append('todays_offer_description', todaysOfferDescription);

    setLoading(true);
    try {
      await api.post('/api/carousel/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Carousel item added successfully!');
      // Reset form fields
      setImage(null);
      setDescription('');
      setTodaysOffer(false);
      setTodaysOfferDescription('');
      fetchCarousels(); // Refresh list
    } catch (err) {
      console.error('Failed to add carousel item:', err);
      alert('Failed to add carousel item. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Carousel</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-12" encType="multipart/form-data">
        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-semibold">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        {/* Description Text */}
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            maxLength={255}
            required
          />
        </div>

        {/* Today's Offer Checkbox */}
        <div className="flex items-center gap-3">
          <input
            id="todaysOffer"
            type="checkbox"
            checked={todaysOffer}
            onChange={(e) => setTodaysOffer(e.target.checked)}
          />
          <label htmlFor="todaysOffer" className="font-semibold">
            Today's Offer
          </label>
        </div>

        {/* Today's Offer Description (always visible) */}
        <div>
          <label className="block mb-1 font-semibold">Today's Offer Description</label>
          <textarea
            value={todaysOfferDescription}
            onChange={(e) => setTodaysOfferDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={3}
            placeholder="Write a brief offer description (optional)"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Add Carousel Item'}
        </button>
      </form>

      {/* Existing Carousel List */}
      <h2 className="text-xl font-semibold mb-4">Existing Carousel Items</h2>
      <div className="space-y-6">
        {carousels.length === 0 && <p>No carousel items found.</p>}
        {carousels.map((item) => (
          <div key={item.id} className="border rounded p-4 flex gap-4 items-center">
            <img
              src={item.image}
              alt={item.description}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-grow">
              <p className="font-semibold">{item.description}</p>
              {item.todays_offer ? (
                <>
                  <p className="text-green-600 font-semibold">Today's Offer:</p>
                  <p>{item.todays_offer_description}</p>
                </>
              ) : (
                <p>No offer today.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
