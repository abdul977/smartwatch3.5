import React from 'react';
import { QuantitySelector } from './QuantitySelector';
import { useOrderStore } from '../store/orderStore';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PriceSection() {
  const { quantity, setQuantity } = useOrderStore();
  const navigate = useNavigate();
  const price = 39000;
  const discount = 0.10; // 10% off
  const discountedPrice = price * (1 - discount);
  const savings = price - discountedPrice;

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex items-center mb-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>

      <div>
        <div className="text-2xl sm:text-3xl font-bold">₦{discountedPrice.toLocaleString()}</div>
        <div className="text-red-500 text-sm sm:text-base">
          -{(discount * 100)}% | Save ₦{savings.toLocaleString()}
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Tax excluded, add at checkout if applicable. Extra 1% off with coins
      </div>

      <div className="border-t pt-4">
        <QuantitySelector 
          quantity={quantity}
          onChange={setQuantity}
          max={5}
        />
      </div>
    </div>
  );
}