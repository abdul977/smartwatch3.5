import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { MediaUpload } from './MediaUpload';

interface UserReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  media: string[];
}

export function ReviewForm() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [reviews, setReviews] = useLocalStorage<UserReview[]>('user-reviews', []);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert files to Data URLs for storage
    const mediaUrls = await Promise.all(
      selectedFiles.map(file => new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      }))
    );

    const newReview: UserReview = {
      id: Date.now().toString(),
      name,
      rating,
      comment,
      date: new Date().toISOString(),
      verified: true,
      media: mediaUrls,
    };

    setReviews([newReview, ...reviews]);
    setSubmitted(true);
    
    // Reset form
    setName('');
    setRating(5);
    setComment('');
    setSelectedFiles([]);

    // Hide success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
      
      {submitted && (
        <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg">
          Thank you for your review! It has been submitted successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(null)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredStar ?? rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Review
          </label>
          <textarea
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Share your experience with the product..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Add Photos/Videos
          </label>
          <MediaUpload
            onMediaSelect={setSelectedFiles}
            selectedFiles={selectedFiles}
            maxFiles={5}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
        >
          Submit Review
        </button>
      </form>

      {reviews && reviews.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Your Reviews</h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{review.name}</span>
                  <div className="flex items-center">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{review.comment}</p>
                {review.media && review.media.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-2">
                    {review.media.map((url, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        {url.startsWith('data:video/') ? (
                          <video
                            src={url}
                            className="w-full h-full object-cover"
                            controls
                          />
                        ) : (
                          <img
                            src={url}
                            alt={`Review media ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                  {review.verified && (
                    <span className="ml-2 text-green-600">✓ Verified Purchase</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}