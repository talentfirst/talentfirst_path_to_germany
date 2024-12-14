import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ConfirmDialog } from './components/ConfirmDialog';
import { useFormPersistence } from './hooks/useFormPersistence';
import { coursePayload } from './utils/coursePayload';

export function TypeFormGermany({ onTypeFormClose }) {
  // Initial form state
  const initialFormState = useMemo(
    () => ({
      uuid: '',
      personalInfo: {
        name: '',
        email: '',
        phone: '',
      },
      industry: '',
      otherIndustry: '',
      education: {
        qualification: '',
        workExperience: '',
        jobRole: '',
      },
      germanSkills: '',
      program: '',
      questions: '',
      isPartial: false,
      showErrors: false,
      isSubmitting: false,
      isSuccessMessage: false,
      status: 'in_progress',
      meta: {
        browserInfo: '',
        deviceType: '',
        ipAddress: '',
      },
    }),
    []
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [answers, setAnswers] = useState(initialFormState);
  const apiUrl = process.env.REACT_APP_API_URL;

  const { loadProgress, clearProgress, updateProgress } =
    useFormPersistence('german-recruitment');

  // Reset form function
  const resetForm = useCallback(() => {
    setAnswers(initialFormState);
    setCurrentStep(0);
    clearProgress();
  }, [clearProgress, initialFormState]);

  // Validation helpers
  const isValidEmail = (email) => {
    return email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const isValidPhone = (phone) => {
    return phone?.match(/^\+?[\d]{10,12}$/);
  };

  const isPersonalInfoComplete = useCallback(() => {
    return (
      answers.personalInfo?.name?.trim() &&
      isValidEmail(answers.personalInfo?.email) &&
      isValidPhone(answers.personalInfo?.phone)
    );
  }, [answers.personalInfo]);

  const isEducationComplete = useCallback(() => {
    return (
      answers.education?.qualification &&
      answers.education?.workExperience &&
      answers.education?.jobRole?.trim().length > 0
    );
  }, [answers.education]);

  const updateAnswer = useCallback((section, key, value) => {
    setAnswers((prev) => {
      if (
        typeof key === 'string' &&
        prev[section] &&
        typeof prev[section] === 'object'
      ) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [key]: value,
          },
        };
      }
      return {
        ...prev,
        [section]: value,
      };
    });
  }, []);

  const isStepComplete = useCallback(
    (step) => {
      switch (step) {
        case 0:
          return isPersonalInfoComplete();
        case 1:
          return (
            answers.industry &&
            (answers.industry !== 'other' ||
              (typeof answers.otherIndustry === 'string' &&
                answers.otherIndustry.trim().length > 0))
          );
        case 2:
          return isEducationComplete();
        case 3:
          return Object.values(answers.germanSkills).every(Boolean);
        case 4:
          return answers.program;
        case 5:
          return true;
        default:
          return false;
      }
    },
    [answers, isEducationComplete, isPersonalInfoComplete]
  );

  const handleStepComplete = useCallback(() => {
    if (isStepComplete(currentStep)) {
      if (
        currentStep === 1 &&
        answers.industry === 'other' &&
        (!answers.otherIndustry || !answers.otherIndustry.trim())
      ) {
        document
          .querySelector('input[placeholder="Please specify your industry"]')
          ?.focus();
        return;
      }
      setCurrentStep((curr) => curr + 1);
      updateProgress(answers, 'in_progress');
    }
  }, [currentStep, isStepComplete, answers, updateProgress]);

  const onFormSubmit = useCallback(
    async (answers, isPartial = false) => {
      try {
        const formData = await coursePayload({ ...answers, isPartial });
        if (!formData.personalInfo?.email && !formData.personalInfo?.phone) {
          return null;
        }

        // Update form status to submitted
        await updateProgress(formData, 'submitted');

        const response = await fetch(`${apiUrl}/api/consultation/submission`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }
        await clearProgress();
        const result = await response.json();
        console.log('Submission successful:', result);
        return result;
      } catch (error) {
        console.error('Form submission error:', error);
        throw error;
      }
    },
    [clearProgress, updateProgress, apiUrl]
  );
  // const onFormSubmit = async (formData, isPartial = false) => {
  //     console.log('onFormSubmit called with:', formData);
  //     try {
  //       // Only submit if we have at least an email or phone
  //       if (!formData.personalInfo?.email && !formData.personalInfo?.phone) {
  //         return;
  //       }

  //       const response = await fetch(`${apiUrl}/api/consultation/submission`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(formData)
  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to submit form');
  //       }

  //       const result = await response.json();
  //       console.log('Submission successful:', result); // Debug log
  //       return result;

  //     } catch (error) {
  //       console.error('Form submission error:', error);
  //       throw error;
  //     }
  //   };

  useEffect(() => {
    const savedData = loadProgress();
    if (savedData && savedData.status !== 'submitted') {
      setAnswers(savedData);
      setCurrentStep(savedData.currentStep || 0);
    }
  }, [loadProgress]);

  // Questions memo
  const questions = useMemo(() => {
    return require('./constants/questions').getQuestions({
      currentStep,
      answers,
      setAnswers,
      updateAnswer,
      isValidEmail,
      isValidPhone,
      isPersonalInfoComplete,
      handleStepComplete,
      handleCloseForm: () => setShowConfirmDialog(true),
      isEducationComplete,
      setCurrentStep,
      isStepComplete,
      onFormSubmit,
      setIsOpen,
      resetForm,
      onSubmitSuccess: () => {
        onTypeFormClose();
        resetForm();
      },
    });
  }, [
    currentStep,
    answers,
    updateAnswer,
    isPersonalInfoComplete,
    isEducationComplete,
    handleStepComplete,
    isStepComplete,
    resetForm,
    onFormSubmit,
    onTypeFormClose,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (answers.status === 'submitted') {
        clearProgress();
      }
    };
  }, [answers.status, clearProgress]);

  if (!isOpen) return null;

  return (
    <div className="relative bg-gray-50 min-h-screen">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
        <div
          className="h-full bg-teal-500 transition-all duration-500"
          style={{ width: `${(currentStep / 5) * 100}%` }}
        />
      </div>

      {questions.map((question) => (
        <React.Fragment key={question.id}>{question.component}</React.Fragment>
      ))}

      {currentStep < 5 && (
        <div className="fixed bottom-8 right-8 flex gap-4">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep((curr) => curr - 1)}
              className="p-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <button
            onClick={handleStepComplete}
            disabled={!isStepComplete(currentStep)}
            className="p-4 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      <ConfirmDialog
        onClose={() => setShowConfirmDialog(false)}
        isOpen={showConfirmDialog}
        onConfirm={() => {
          onTypeFormClose();
          setAnswers({ ...initialFormState, isPartial: true });
          onFormSubmit(answers, true);
        }}
      />
    </div>
  );
}
