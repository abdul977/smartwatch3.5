import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  media?: string[];
}

interface ReviewState {
  reviews: Review[];
  addReview: (review: Review) => void;
  removeReview: (id: string) => void;
  clearReviews: () => void;
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set) => ({
      reviews: [],
      addReview: (review) =>
        set((state) => ({
          reviews: [review, ...state.reviews],
        })),
      removeReview: (id) =>
        set((state) => ({
          reviews: state.reviews.filter((review) => review.id !== id),
        })),
      clearReviews: () => set({ reviews: [] }),
    }),
    {
      name: 'review-storage',
    }
  )
);