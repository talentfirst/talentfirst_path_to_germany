import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const ConfirmDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-xl p-6 max-w-md w-full m-4 animate-scale-in">
        <div className="flex items-center gap-4 mb-4">
          <AlertTriangle className="text-yellow-500" size={24} />
          <h3 className="text-xl font-bold">Are you sure you want to leave?</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Your progress will be saved, and we'll send you an email to continue later.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
          >
            Continue Form
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Exit Form
          </button>
        </div>
      </div>
    </div>
  );
};