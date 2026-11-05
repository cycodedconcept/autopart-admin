import React, { useState } from 'react';
import { X, MessageSquare, Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

interface MessageSellerModalProps {
  sellerId: number;
  businessName: string;
  onClose: () => void;
}

export const MessageSellerModal: React.FC<MessageSellerModalProps> = ({ sellerId, businessName, onClose }) => {
  const [messageText, setMessageText] = useState('');

  const messageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/sellers/${sellerId}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) throw new Error('Failed to dispatch alert message.');
      return response.json();
    },
    onSuccess: () => {
      alert(`Message successfully dispatched to ${businessName}.`);
      onClose();
    },
    onError: (err: any) => alert(err.message || 'Error transmitting notification payload.')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    messageMutation.mutate(messageText);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-lightborder rounded-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-left font-sans">
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare size={16} className="text-gray-500" />
            <span>Message {businessName}</span>
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 bg-transparent border-none p-0 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Message Text Body</label>
            <textarea
              required
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type dispatch updates or operational warning announcements directly notifying the merchant storefront dashboard channels..."
              rows={5}
              className="w-full border border-gray-200 rounded-lg p-3 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 resize-none bg-gray-50/50 text-gray-800"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-gray-100">
            <button type="button" onClick={onClose} disabled={messageMutation.isPending} className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer">Cancel</button>
            <button type="submit" disabled={messageMutation.isPending || !messageText.trim()} className="px-4 py-2 text-xs font-semibold text-white bg-gray-800 hover:bg-gray-900 rounded-lg flex items-center gap-2 min-w-31.25 justify-center cursor-pointer disabled:opacity-50">
              {messageMutation.isPending ? <><Loader2 size={12} className="animate-spin" /><span>Sending...</span></> : <span>Send Message</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
