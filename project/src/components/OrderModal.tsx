import React, { useState } from 'react';
import { useOrderStore } from '../store/orderStore';
import { ArrowLeft } from 'lucide-react';

interface OrderFormData {
  name: string;
  phone: string;
  address: string;
  deliveryDate: string;
  buyingToday: 'yes' | 'no';
  deliveryMethod: 'delivery' | 'pickup';
  paymentMethod: 'cash' | 'transfer';
  specialRequests: string;
}

export function OrderModal({ onClose }: { onClose: () => void }) {
  const { quantity, orderId, setOrderId } = useOrderStore();
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
    address: '',
    deliveryDate: '',
    buyingToday: 'yes',
    deliveryMethod: 'delivery',
    paymentMethod: 'cash',
    specialRequests: ''
  });

  const price = 37000;
  const discount = formData.buyingToday === 'yes' ? 0.05 : 0.03; // 5% off today, 3% off later
  const discountedPrice = price * (1 - discount) * quantity;
  const deliveryFee = formData.deliveryMethod === 'delivery' ? 3500 : 0;
  const total = discountedPrice + deliveryFee;

  const generateOrderId = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 7);
    return `ACE-${timestamp}-${randomStr}`.toUpperCase();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);

    const message = `🛍️ New Order #${newOrderId}!\n
👤 Customer Details:
- Name: ${formData.name}
- Phone: ${formData.phone}
- Address: ${formData.address}

📱 Order Details:
- Quantity: ${quantity}
- Buying Today: ${formData.buyingToday}
- Delivery Method: ${formData.deliveryMethod === 'delivery' ? 'Home Delivery' : 'Pickup'}
- Delivery Date: ${formData.deliveryDate || 'Not specified'}
- Payment Method: ${formData.paymentMethod}
- Price: ₦${discountedPrice.toLocaleString()}
- Delivery Fee: ₦${deliveryFee.toLocaleString()}
- Total: ₦${total.toLocaleString()}

📝 Special Requests:
${formData.specialRequests || 'None'}`;

    window.open(`https://wa.me/2348144493361?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onClose}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <span className="text-sm text-purple-600 font-medium">
            Order ID: {orderId || 'New Order'}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Are you buying today?</label>
            <select
              className="w-full rounded-lg border p-2"
              value={formData.buyingToday}
              onChange={e => setFormData({...formData, buyingToday: e.target.value as 'yes' | 'no'})}
            >
              <option value="yes">Yes - Get 5% Discount!</option>
              <option value="no">No - Get 3% Discount</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Delivery Method</label>
            <select
              className="w-full rounded-lg border p-2"
              value={formData.deliveryMethod}
              onChange={e => setFormData({...formData, deliveryMethod: e.target.value as 'delivery' | 'pickup'})}
            >
              <option value="delivery">Home Delivery (₦3,500)</option>
              <option value="pickup">Pickup (Free)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <input
              type="text"
              required
              className="w-full rounded-lg border p-2"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              required
              className="w-full rounded-lg border p-2"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              {formData.deliveryMethod === 'delivery' ? 'Delivery Address' : 'Pickup Location'}
            </label>
            {formData.deliveryMethod === 'delivery' ? (
              <textarea
                required
                className="w-full rounded-lg border p-2"
                rows={3}
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            ) : (
              <div className="text-gray-600 p-2 bg-gray-50 rounded-lg">
                Near police signboard, Lugbe, Abuja
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Preferred Date</label>
            <input
              type="date"
              className="w-full rounded-lg border p-2"
              min={new Date().toISOString().split('T')[0]}
              value={formData.deliveryDate}
              onChange={e => setFormData({...formData, deliveryDate: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Payment Method</label>
            <select
              className="w-full rounded-lg border p-2"
              value={formData.paymentMethod}
              onChange={e => setFormData({...formData, paymentMethod: e.target.value as 'cash' | 'transfer'})}
            >
              <option value="cash">Cash on Delivery (Abuja Only)</option>
              <option value="transfer">Bank Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Special Requests (Optional)</label>
            <textarea
              className="w-full rounded-lg border p-2"
              rows={2}
              value={formData.specialRequests}
              onChange={e => setFormData({...formData, specialRequests: e.target.value})}
              placeholder="Any special requirements or preferences?"
            />
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal ({quantity} item{quantity > 1 ? 's' : ''})</span>
              <span>₦{discountedPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span>₦{deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 text-lg font-semibold"
          >
            Complete Order
          </button>
        </form>
      </div>
    </div>
  );
}