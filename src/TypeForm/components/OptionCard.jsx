// import React from 'react';

// export const OptionCard = ({ selected, onClick, children }) => (
//   <div 
//     onClick={onClick}
//     className={`
//       p-6 rounded-xl cursor-pointer transition-all duration-300 transform 
//       ${selected 
//         ? 'bg-teal-50 border-2 border-teal-500 scale-105 animate-scale-in' 
//         : 'bg-white border-2 border-gray-100 hover:border-teal-200 hover:scale-105'
//       }
//     `}
//   >
//     {children}
//   </div>
// );

// components/OptionCard.jsx
// export const OptionCard = ({ selected, onClick, children, disabled }) => (
//     <div 
//       onClick={disabled ? undefined : onClick}
//       className={`
//         p-6 rounded-xl cursor-pointer transition-all duration-300 transform
//         ${disabled ? 'cursor-not-allowed opacity-50' : ''}
//         ${selected 
//           ? 'bg-teal-50 border-2 border-teal-500 scale-105' 
//           : 'bg-white border-2 border-gray-100 hover:border-teal-200 hover:scale-105'}
//       `}
//     >
//       {children}
//     </div>
//   );


// OptionCard.jsx

// export const OptionCard = ({ children, selected = false, onClick, disabled = false }) => {
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`
//         w-full p-6 rounded-xl border-2 transition-all duration-200
//         hover:border-teal-500 hover:shadow-md
//         focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
//         ${selected 
//           ? 'border-teal-500 bg-teal-50/50' 
//           : 'border-gray-200 bg-white hover:bg-gray-50'
//         }
//         ${disabled 
//           ? 'opacity-50 cursor-not-allowed' 
//           : 'cursor-pointer'
//         }
//       `}
//       type="button" // Explicitly set button type
//       aria-pressed={selected} // Accessibility improvement
//     >
//       <div className={`
//         text-left
//         ${selected ? 'text-teal-900' : 'text-gray-900'}
//       `}>
//         {children}
//       </div>
//     </button>
//   );
// };


import React from 'react';

export const OptionCard = ({ children, selected = false, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full p-6 rounded-xl border-2 transition-all duration-200
        hover:border-teal-500 hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
        ${selected 
          ? 'border-teal-500 bg-teal-50/50' 
          : 'border-gray-200 bg-white hover:bg-gray-50'
        }
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer'
        }
      `}
      type="button"
      aria-pressed={selected} 
    >
      <div className={`
        text-left
        ${selected ? 'text-teal-900' : 'text-gray-900'}
      `}>
        {children}
      </div>
    </button>
  );
};


