import React, { useState } from 'react';
import { X, Layers, Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ChangePlanModalProps {
  sellerId: number;
  currentPlan: string;
  onClose: () => void;
}

export const ChangePlanModal: React.FC<ChangePlanModalProps> = ({ sellerId, currentPlan, onClose }) => {
  const queryClient = useQueryClient();
  const [selectedPlan, setSelectedPlan] = useState(currentPlan.toLowerCase());

  const changePlanMutation = useMutation({
    mutationFn: async (plan: string) => {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/sellers/${sellerId}/plan`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      if (!response.ok) throw new Error('Failed to update subscription level.');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sellers'] });
      queryClient.invalidateQueries({ queryKey: ['seller', sellerId] });
      onClose();
    },
    onError: (err: any) => alert(err.message || 'Error changing tier plan.')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changePlanMutation.mutate(selectedPlan);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-lightborder rounded-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-left font-sans">
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Layers size={16} className="text-blue-500" />
            <span>Modify Subscription Tier</span>
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 bg-transparent border-none p-0 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <p className="text-xs text-gray-500 leading-relaxed">Altering the subscription tier dynamically modifies seller feature constraints, fee caps, and marketplace discovery tiers.</p>
          
          <div className="space-y-2">
            {['basic', 'pro', 'enterprise'].map((tier) => {
              const isChecked = selectedPlan === tier;
              return (
                <label key={tier} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${isChecked ? 'border-orange-500 bg-orange-50/10' : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50'}`}>
                  <input type="radio" name="planTier" value={tier} checked={isChecked} onChange={(e) => setSelectedPlan(e.target.value)} className="accent-[#FF6600] w-4 h-4 cursor-pointer mt-0.5" />
                  <div>
                    <span className="text-xs font-bold capitalize block text-gray-800">{tier} Plan</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5 leading-normal">
                      {tier === 'basic' && 'Standard platform access with general marketplace listing limits.'}
                      {tier === 'pro' && 'Priority item rank visibility matching premium analytics suites.'}
                      {tier === 'enterprise' && 'Unlimited stock pipelines coupled with dedicated API integration access.'}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-gray-100">
            <button type="button" onClick={onClose} disabled={changePlanMutation.isPending} className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer">Cancel</button>
            <button type="submit" disabled={changePlanMutation.isPending || selectedPlan === currentPlan.toLowerCase()} className="px-4 py-2 text-xs font-semibold text-white bg-[#FF6600] hover:bg-[#E05500] rounded-lg flex items-center gap-2 min-w-30 justify-center cursor-pointer disabled:opacity-40">
              {changePlanMutation.isPending ? <><Loader2 size={12} className="animate-spin" /><span>Saving...</span></> : <span>Save Modifications</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
