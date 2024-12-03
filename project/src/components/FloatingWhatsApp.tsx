import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { generateTicketNumber } from '../utils/ticketGenerator';

export function FloatingWhatsApp() {
  const [ticketNumber, setTicketNumber] = useState('');

  useEffect(() => {
    setTicketNumber(generateTicketNumber());
  }, []);

  const message = encodeURIComponent(
    `Hello! 🎯 [Ticket: ${ticketNumber}]\n\nI'm interested in the ACE-240 smartwatch and would like to know more details.`
  );

  const whatsappUrl = `https://wa.me/2348144493361?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Chat with us
      </span>
    </a>
  );
}