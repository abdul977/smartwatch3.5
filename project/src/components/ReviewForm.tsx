import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { MediaUpload } from './MediaUpload';
import { useReviewStore } from '../store/reviewStore';
import { useCollapse } from '../hooks/useCollapse';

export function ReviewForm() {
  const { addReview } = useReviewStore();
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { isExpanded, toggleExpand, contentRef, getCollapseProps } = useCollapse();

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

    const newReview = {
      id: Date.now().toString(),
      name,
      rating,
      comment,
      date: new Date().toISOString(),
      verified: true,
      media: mediaUrls,
    };

    addReview(newReview);
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
      <button
        onClick={toggleExpand}
        className="w-full flex items-center justify-between text-2xl font-bold mb-6 focus:outline-none group"
      >
        <span>Write a Review</span>
        <div className="transform transition-transform duration-200">
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
          ) : (
            <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
          )}
        </div>
      </button>
      
      <div
        ref={contentRef}
        {...getCollapseProps()}
        className="transition-all duration-300 ease-in-out"
      >
        {submitted && (
          <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg">
            Thank you for your review! It has been submitted successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Your Name</label>
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
            <label className="block text-sm font-medium mb-1">Rating</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(null)}
                  className="focus:outline-none transform transition-transform hover:scale-110"
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
            <label className="block text-sm font-medium mb-1">Your Review</label>
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
            <label className="block text-sm font-medium mb-1">Add Photos/Videos</label>
            <MediaUpload
              onMediaSelect={setSelectedFiles}
              selectedFiles={selectedFiles}
              maxFiles={5}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold transform hover:scale-105 duration-200"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}