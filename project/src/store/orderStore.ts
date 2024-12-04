import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OrderState {
  quantity: number;
  orderId: string | null;
  orderHistory: Array<{
    id: string;
    date: string;
    quantity: number;
    total: number;
  }>;
  setQuantity: (quantity: number) => void;
  setOrderId: (orderId: string) => void;
  addToHistory: (order: { id: string; quantity: number; total: number }) => void;
  resetOrder: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      quantity: 1,
      orderId: null,
      orderHistory: [],
      setQuantity: (quantity) => set({ quantity }),
      setOrderId: (orderId) => set({ orderId }),
      addToHistory: (order) =>
        set((state) => ({
          orderHistory: [
            {
              ...order,
              date: new Date().toISOString(),
            },
            ...state.orderHistory,
          ],
        })),
      resetOrder: () => set({ quantity: 1, orderId: null }),
    }),
    {
      name: 'order-storage',
    }
  )
);