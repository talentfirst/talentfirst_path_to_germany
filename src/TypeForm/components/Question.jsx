// import React from 'react';
// import { X } from 'lucide-react';

// export const Question = ({ children, isActive, onClose, isExiting }) => {
//   if (!isActive) return null;

//   return (
//     <div className={`
//       flex items-center justify-center min-h-screen w-full absolute top-0 left-0
//       transition-all duration-500
//       ${isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100 animate-slide-up'}
//     `}>
//       {onClose && (
//         <button
//           onClick={onClose}
//           className="fixed top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-50"
//           aria-label="Close form"
//         >
//           <X size={24} className="text-gray-500 hover:text-gray-700" />
//         </button>
//       )}
//       <div className="max-w-2xl w-full p-8">
//         {children}
//       </div>
//     </div>
//   );
// };
// components/Question.jsx
// export const Question = ({ children, isActive, onClose, isExiting }) => {
//     if (!isActive) return null;

//     return (
//       <div className={`
//         flex items-center justify-center min-h-screen w-full absolute top-0 left-0
//         transition-all duration-500
//         ${isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
//       `}>
//         {onClose && (
//           <button
//             onClick={onClose}
//             className="fixed top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-50"
//             aria-label="Close form"
//           >
//             <X size={24} className="text-gray-500 hover:text-gray-700" />
//           </button>
//         )}
//         <div className="max-w-2xl w-full p-8">
//           {children}
//         </div>
//       </div>
//     );
//   };

import React from 'react';
import { X } from 'lucide-react';

export const Question = ({ children, isActive, onClose, isExiting }) => {
  if (!isActive) return null;

  return (
    <div
      className={`
      flex items-center justify-center min-h-screen w-full absolute top-0 left-0 
      transition-all duration-500 
      ${isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
    `}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="fixed top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-50"
          aria-label="Close form"
          type="button"
        >
          <X size={24} className="text-gray-500 hover:text-gray-700" />
        </button>
      )}
      <div className="max-w-2xl w-full p-8">{children}</div>
    </div>
  );
};
