import React from 'react';
import { useOrderStore } from '../store/orderStore';
import { ArrowLeft } from 'lucide-react';

interface OrderFormData {
  name: string;
  phone: string;
  address: string;
  deliveryMethod: 'delivery' | 'pickup';
  paymentMethod: 'cash' | 'transfer';
}

export function OrderModal({ onClose }: { onClose: () => void }) {
  const { quantity, orderId, setOrderId } = useOrderStore();
  const [formData, setFormData] = React.useState<OrderFormData>({
    name: '',
    phone: '',
    address: '',
    deliveryMethod: 'delivery',
    paymentMethod: 'cash'
  });

  const price = 37000;
  const discount = 0.05; // 5% off
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
👤 Name: ${formData.name}
📱 Phone: ${formData.phone}
📍 ${formData.deliveryMethod === 'delivery' ? 'Delivery Address' : 'Pickup'}: ${formData.address || 'Near police signboard, Lugbe, Abuja'}
🛒 Quantity: ${quantity}
💳 Payment: ${formData.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Bank Transfer'}
💰 Total: ₦${total.toLocaleString()}`;

    window.open(`https://wa.me/2348144493361?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-purple-600 font-medium">Quick Order</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              required
              placeholder="Your Name"
              className="w-full rounded-lg border p-3"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div>
            <input
              type="tel"
              required
              placeholder="Phone Number"
              className="w-full rounded-lg border p-3"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              className="rounded-lg border p-3"
              value={formData.deliveryMethod}
              onChange={e => setFormData({...formData, deliveryMethod: e.target.value as 'delivery' | 'pickup'})}
            >
              <option value="delivery">Delivery</option>
              <option value="pickup">Pickup</option>
            </select>

            <select
              className="rounded-lg border p-3"
              value={formData.paymentMethod}
              onChange={e => setFormData({...formData, paymentMethod: e.target.value as 'cash' | 'transfer'})}
            >
              <option value="cash">Cash</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>
          
          {formData.deliveryMethod === 'delivery' && (
            <textarea
              required
              placeholder="Delivery Address"
              className="w-full rounded-lg border p-3"
              rows={2}
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
            />
          )}

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
            className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 font-semibold"
          >
            Complete Order on WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}