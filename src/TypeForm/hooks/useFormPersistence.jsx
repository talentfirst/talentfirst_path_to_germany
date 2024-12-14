import { useCallback } from 'react';

export const useFormPersistence = (formId) => {
  const saveProgress = useCallback(
    async (data) => {
      try {
        // Don't save if the form is submitted or abandoned
        if (data.status === 'submitted') {
          localStorage.removeItem(`form_${formId}`);
          return;
        }

        // Save to localStorage
        localStorage.setItem(
          `form_${formId}`,
          JSON.stringify({
            data,
            timestamp: new Date().toISOString(),
          })
        );

        // Send to backend if email exists
        if (data.personalInfo?.email) {
          await fetch('/api/tracking/unfinished', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              formData: data,
              metadata: {
                lastActiveStep: data.currentStep,
                browserInfo: navigator.userAgent,
                deviceType: /Mobile/.test(navigator.userAgent)
                  ? 'mobile'
                  : 'desktop',
                exitPoint: window.location.pathname,
                formStatus: data.status || 'in_progress',
              },
            }),
          });
        }
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
    },
    [formId]
  );

  const loadProgress = useCallback(() => {
    try {
      const saved = localStorage.getItem(`form_${formId}`);
      if (!saved) return null;

      const parsedData = JSON.parse(saved);

      // Check if saved data is too old (24 hours)
      const savedTime = new Date(parsedData.timestamp).getTime();
      const currentTime = new Date().getTime();
      const ONE_DAY = 5 * 60 * 1000;

      if (currentTime - savedTime > ONE_DAY) {
        localStorage.removeItem(`form_${formId}`);
        return null;
      }

      return parsedData.data;
    } catch (error) {
      console.error('Failed to load progress:', error);
      return null;
    }
  }, [formId]);

  // const clearProgress = useCallback(async () => {
  //   try {
  //     // Clear localStorage
  //     localStorage.removeItem(`form_${formId}`);

  //     // Optionally notify backend about form cleanup
  //     await fetch('/api/tracking/cleanup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         formId,
  //         timestamp: new Date().toISOString()
  //       })
  //     });
  //   } catch (error) {
  //     console.error('Failed to clear progress:', error);
  //   }
  // }, [formId]);

  const clearProgress = useCallback(() => {
    try {
      localStorage.removeItem(`form_${formId}`);
      console.log('Form progress cleared successfully');
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }, [formId]);

  const updateProgress = useCallback(
    async (data, status = 'in_progress') => {
      try {
        const updatedData = {
          ...data,
          status,
          lastUpdated: new Date().toISOString(),
        };

        await saveProgress(updatedData);

        return updatedData;
      } catch (error) {
        console.error('Failed to update progress:', error);
        return data;
      }
    },
    [saveProgress]
  );

  return {
    saveProgress,
    loadProgress,
    clearProgress,
    updateProgress,
  };
};
