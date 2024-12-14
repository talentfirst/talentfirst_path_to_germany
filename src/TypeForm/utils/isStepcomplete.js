// import isEducationComplete from './isEducationComplete';
// import isPersonalInfoComplete from './isPersonalInfoComplete';

// const isStepcomplete = useCallback(
//   (step, answers) => {
//     switch (step) {
//       case 0:
//         return isPersonalInfoComplete();
//       case 1:
//         return (
//           answers.industry &&
//           (answers.industry !== 'other' ||
//             (typeof answers.otherIndustry === 'string' &&
//               answers.otherIndustry.trim().length > 0))
//         );
//       case 2:
//         return isEducationComplete();
//       case 3:
//         return Object.values(answers.germanSkills).every(Boolean);
//       case 4:
//         return answers.program;
//       case 5:
//         return true; // Questions step is optional
//       default:
//         return false;
//     }
//   },
//   [answers, isEducationComplete, isPersonalInfoComplete]
// );

// export default isStepcomplete;
