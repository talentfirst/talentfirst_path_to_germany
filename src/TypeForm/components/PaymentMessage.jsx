import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';

export const PaymentMessage = ({ status, message }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md text-center animate-slideUp">
        <div className="mb-4">
          {status === 'success' ? (
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-500" />
            </div>
          ) : status === 'failed' ? (
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          ) : (
            <div className="w-16 h-16 flex items-center justify-center mx-auto">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500" />
            </div>
          )}
        </div>
        <p className="text-gray-600 mb-4">{message}</p>
        <p className="text-sm text-gray-500">
          Redirecting in {status === 'success' ? '3' : '5'} seconds...
        </p>
      </div>
    </div>
  );
};