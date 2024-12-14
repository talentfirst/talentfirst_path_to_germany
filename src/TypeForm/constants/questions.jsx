import React from 'react';
import {
  Check,
  ChevronLeft,
  Code,
  Briefcase,
  ArrowRight,
  Stethoscope,
  Wrench,
  HardHat,
} from 'lucide-react';
import { Question } from '../components/Question';
import { OptionCard } from '../components/OptionCard';
import { coursePrograms } from './coursePlans';
import { isPhoneValid } from '../utils/isPhoneValid';
import isValidEmail from '../utils/isValidEmail';

export const getQuestions = ({
  currentStep,
  answers,
  setAnswers,
  isPersonalInfoComplete,
  isEducationComplete,
  updateAnswer,
  handleStepComplete,
  handleCloseForm,
  setCurrentStep,
  setIsOpen,
  onSubmitSuccess,
  onFormSubmit,
}) => [
  // Personal Information
  {
    id: 'personal',
    component: (
      <Question isActive={currentStep === 0} onClose={handleCloseForm}>
        <h2 className="text-4xl font-bold mb-8 text-gray-800">
          Your Information
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-xl mb-2">What is your name?</label>
            <input
              type="text"
              className={`w-full p-4 text-xl border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none
                ${answers.showErrors && !answers.personalInfo?.name?.trim() ? 'border-red-500' : 'border-gray-200'}`}
              placeholder="Type your full name"
              value={answers.personalInfo?.name || ''}
              onChange={(e) => {
                setAnswers((prev) => ({
                  ...prev,
                  showErrors: false,
                  personalInfo: { ...prev.personalInfo, name: e.target.value },
                }));
              }}
            />
            {answers.showErrors && !answers.personalInfo?.name?.trim() && (
              <p className="mt-2 text-red-500 text-sm">
                Please enter your name
              </p>
            )}
          </div>

          <div>
            <label className="block text-xl mb-2">Your email address?</label>
            <input
              type="email"
              inputMode="email" // Better for mobile keyboards
              className={`w-full p-4 text-xl border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none
                ${answers.showErrors && !isValidEmail(answers.personalInfo?.email) ? 'border-red-500' : 'border-gray-200'}`}
              placeholder="name@example.com"
              value={answers.personalInfo?.email || ''}
              onChange={(e) => {
                setAnswers((prev) => ({
                  ...prev,
                  showErrors: false,
                  personalInfo: { ...prev.personalInfo, email: e.target.value },
                }));
              }}
            />
            {answers.showErrors &&
              !isValidEmail(answers.personalInfo?.email) && (
                <p className="mt-2 text-red-500 text-sm">
                  Please enter a valid email address
                </p>
              )}
          </div>

          <div>
            <label className="block text-xl mb-2">Phone number</label>
            <input
              type="tel"
              inputMode="tel" // Better for mobile keyboards
              className={`w-full p-4 text-xl border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none
                ${answers.showErrors && !isPhoneValid(answers.personalInfo?.phone) ? 'border-red-500' : 'border-gray-200'}`}
              placeholder="+1234567890"
              value={answers.personalInfo?.phone || ''}
              onChange={(e) => {
                // Only allow numbers and + symbol
                const phoneNumber = e.target.value;
                setAnswers((prev) => ({
                  ...prev,
                  showErrors: false,
                  personalInfo: { ...prev.personalInfo, phone: phoneNumber },
                }));
              }}
            />
            {answers.showErrors &&
              !isPhoneValid(answers.personalInfo?.phone) && (
                <p className="mt-2 text-red-500 text-sm">
                  Please enter a valid phone number
                </p>
              )}
          </div>

          {/* Auto-validation message */}
          {!answers.showErrors &&
            answers.personalInfo?.name?.trim() &&
            isValidEmail(answers.personalInfo?.email) &&
            isPhoneValid(answers.personalInfo?.phone) && (
              <div className="text-teal-600 text-sm flex items-center gap-2">
                <Check size={16} />
                Click continue to proceed.
              </div>
            )}
          {/* {isPersonalInfoComplete?handleStepComplete():""} */}

          <button
            className="sm:w-full w-1/2 flex flex-row justify-center  bg-teal-500 text-white p-4 rounded-xl text-xl font-medium hover:bg-teal-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={() => {
              if (isPersonalInfoComplete()) {
                setCurrentStep((curr) => curr + 1);
                setAnswers((prev) => ({ ...prev, showErrors: false }));
              } else {
                setAnswers((prev) => ({ ...prev, showErrors: true }));
              }
            }}
          >
            Continue
          </button>
        </div>

        {/* Navigation Controls */}
        {/* <div className="fixed bottom-8 right-8 flex gap-4">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(curr => curr - 1)}
              className="p-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          {isPersonalInfoComplete() && (
            <button
              onClick={() => handleStepComplete()}
              className="p-4 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div> */}
      </Question>
    ),
  },
  // Industry
  {
    id: 'industry',
    component: (
      <Question isActive={currentStep === 1} onClose={handleCloseForm}>
        <h2 className="text-4xl font-bold mb-8 text-gray-800">
          Which industry do you work in?
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: 'healthcare', icon: Stethoscope, label: 'Healthcare' },
            { id: 'tech', icon: Code, label: 'IT & Tech' },
            { id: 'engineering', icon: Wrench, label: 'Engineering' },
            { id: 'construction', icon: HardHat, label: 'Construction' },
            { id: 'other', icon: Briefcase, label: 'Other' },
          ].map(({ id, icon: Icon, label }) => (
            <OptionCard
              key={id}
              selected={answers.industry === id}
              onClick={() => {
                updateAnswer('industry', null, id);
                // Automatically move to next step if not 'other'
                if (id !== 'other') {
                  handleStepComplete();
                }
              }}
            >
              <div className="flex flex-col items-center gap-3">
                <Icon size={32} className="text-teal-500" />
                <div className="text-xl">{label}</div>
              </div>
            </OptionCard>
          ))}
        </div>

        {answers.industry === 'other' && (
          <div className="mt-6">
            <input
              type="text"
              className="w-full p-4 text-xl border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              placeholder="Please specify your industry"
              value={answers.otherIndustry || ''}
              onChange={(e) => {
                updateAnswer('otherIndustry', null, e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && answers.otherIndustry?.trim()) {
                  handleStepComplete();
                }
              }}
              onBlur={() => {
                if (answers.otherIndustry?.trim()) {
                  handleStepComplete();
                }
              }}
            />
            <div className="mt-2 text-sm text-gray-500">
              Press Enter or click outside to continue
            </div>
          </div>
        )}
      </Question>
    ),
  },
  // Education
  {
    id: 'education',
    component: (
      <Question isActive={currentStep === 2} onClose={handleCloseForm}>
        <h2 className="text-4xl font-bold mb-8 text-gray-800">
          Educational Background
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-xl mb-2">
              Highest Education Qualification
            </label>
            <select
              className={`w-full p-4 text-xl border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none
                ${answers.showErrors && !answers.education?.qualification ? 'border-red-500' : 'border-gray-200'}`}
              onChange={(e) => {
                updateAnswer('education', 'qualification', e.target.value);
                if (answers.showErrors) {
                  setAnswers((prev) => ({ ...prev, showErrors: false }));
                }
              }}
              value={answers.education?.qualification || ''}
            >
              <option value="">Select your qualification</option>
              <option value="phd">Ph.D.</option>
              <option value="masters">Master's Degree</option>
              <option value="bachelors">Bachelor's Degree</option>
              <option value="diploma">Diploma</option>
              <option value="other">Other</option>
            </select>
            {answers.showErrors && !answers.education?.qualification && (
              <p className="mt-2 text-red-500 text-sm">
                Please select your qualification
              </p>
            )}
          </div>

          <div>
            <label className="block text-xl mb-2">
              Work Experience (in years)
            </label>
            <input
              type="text" // Changed from number to text for better mobile compatibility
              inputMode="numeric"
              pattern="\d*"
              className={`w-full p-4 text-xl border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none
                ${answers.showErrors && !answers.education?.workExperience ? 'border-red-500' : 'border-gray-200'}`}
              placeholder="Years of experience"
              value={answers.education?.workExperience || ''}
              onChange={(e) => {
                // Only allow numbers
                const value = e.target.value.replace(/[^\d]/g, '');
                if (parseInt(value) <= 50 || value === '') {
                  updateAnswer('education', 'workExperience', value);
                  if (answers.showErrors) {
                    setAnswers((prev) => ({ ...prev, showErrors: false }));
                  }
                }
              }}
            />
            {answers.showErrors && !answers.education?.workExperience && (
              <p className="mt-2 text-red-500 text-sm">
                Please enter your work experience
              </p>
            )}
          </div>

          <div>
            <label className="block text-xl mb-2">Current Job Role</label>
            <input
              type="text"
              className={`w-full p-4 text-xl border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none
                ${answers.showErrors && !answers.education?.jobRole ? 'border-red-500' : 'border-gray-200'}`}
              placeholder="e.g., Software Engineer, Nurse, Project Manager"
              value={answers.education?.jobRole || ''}
              onChange={(e) => {
                updateAnswer('education', 'jobRole', e.target.value);
                if (answers.showErrors) {
                  setAnswers((prev) => ({ ...prev, showErrors: false }));
                }
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && isEducationComplete()) {
                  handleStepComplete();
                }
              }}
            />
            {answers.showErrors && !answers.education?.jobRole && (
              <p className="mt-2 text-red-500 text-sm">
                Please enter your current job role
              </p>
            )}
          </div>

          {/* Show error messages only when showErrors is true */}
          {answers.showErrors && (
            <div className="space-y-2">
              {!answers.education?.qualification && (
                <div className="text-red-500 text-sm">
                  Please select your qualification
                </div>
              )}
              {!answers.education?.workExperience && (
                <div className="text-red-500 text-sm">
                  Please enter your work experience
                </div>
              )}
              {!answers.education?.jobRole && (
                <div className="text-red-500 text-sm">
                  Please enter your current job role
                </div>
              )}
            </div>
          )}
        </div>
      </Question>
    ),
  },
  // German Language Knowledge
  {
    id: 'germanLevel',
    component: (
      <Question isActive={currentStep === 3} onClose={handleCloseForm}>
        <h2 className="text-4xl font-bold mb-8 text-gray-800">
          German Language Knowledge
        </h2>
        <div className="space-y-6">
          <h3 className="text-xl font-medium">
            Please indicate your knowledge level of German:
          </h3>
          <div>
            <select
              className="w-full p-4 text-xl border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              onChange={(e) => {
                setAnswers((prev) => ({
                  ...prev,
                  germanSkills: e.target.value,
                }));
              }}
              value={answers.germanSkills || ''}
            >
              <option value="">Select level</option>
              <option value="none">No Knowledge</option>
              <option value="a1">A1</option>
              <option value="a2">A2</option>
              <option value="b1">B1</option>
              <option value="b2">B2</option>
              <option value="c1">C1</option>
              <option value="c2">C2</option>
            </select>
          </div>
        </div>
      </Question>
    ),
  },
  // Program Selection
  {
    id: 'program',
    component: (
      <Question isActive={currentStep === 4} onClose={handleCloseForm}>
        <h2 className="text-4xl font-bold mb-8 text-gray-800">
          Choose Your Program
        </h2>

        <div className="space-y-8">
          {/* Fast Track Program - Prominent Section */}
          <div className="relative bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-2xl border-2 border-teal-100">
            <div className="absolute top-0 right-0 -translate-y-1/2 bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              Recommended
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-teal-800">
                    Fast Track Program (A1-B2)
                  </h3>
                  <p className="text-teal-600">
                    Complete A1 to B2 in just 4-6 months
                  </p>
                </div>

                <ul className="grid grid-cols-2 gap-3">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-teal-500" />
                    <span>Daily interactive sessions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-teal-500" />
                    <span>Comprehensive coverage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-teal-500" />
                    <span>Personalized learning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-teal-500" />
                    <span>Regular assessments</span>
                  </li>
                </ul>
              </div>

              <div className="lg:w-64 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-teal-600">
                      ₹30,000
                    </span>
                    <span className="text-gray-400 line-through text-sm">
                      ₹1,00,000
                    </span>
                  </div>
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                    70% OFF
                  </span>
                  <div className="text-teal-600 text-sm font-medium">
                    Save ₹10,000 vs individual courses
                  </div>
                </div>
                <button
                  onClick={() => {
                    updateAnswer('program', null, 'fastTrack');
                    setTimeout(() => handleStepComplete(), 300);
                  }}
                  className={`w-full py-3 px-4 rounded-xl text-white font-medium transition-colors
                    ${
                      answers.program === 'fastTrack'
                        ? 'bg-teal-700 hover:bg-teal-800'
                        : 'bg-teal-500 hover:bg-teal-600'
                    }`}
                >
                  {answers.program === 'fastTrack' ? (
                    <span className="flex items-center justify-center gap-2">
                      Selected <Check size={16} />
                    </span>
                  ) : (
                    'Choose Fast Track'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Individual Programs */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Individual Certification Programs
            </h3>
            <div className="grid lg:grid-cols-2 gap-4">
              {coursePrograms
                .filter((p) => p.id !== 'fastTrack')
                .map((program) => (
                  <OptionCard
                    key={program.id}
                    selected={answers.program === program.id}
                    onClick={() => {
                      updateAnswer('program', null, program.id);
                      setTimeout(() => handleStepComplete(), 300);
                    }}
                    className="border-gray-200 hover:border-teal-200"
                  >
                    <div className="flex justify-between gap-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-lg font-bold">{program.level}</h4>
                          <p className="text-sm text-gray-600">
                            {program.duration} duration
                          </p>
                        </div>

                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-teal-600">
                            ₹{program.price.toLocaleString()}
                          </span>
                          <span className="text-gray-400 line-through text-xs">
                            ₹{program.originalPrice.toLocaleString()}
                          </span>
                          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                            70% OFF
                          </span>
                        </div>

                        <ul className="space-y-1 text-sm">
                          {program.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Check
                                size={12}
                                className="text-teal-500 flex-shrink-0"
                              />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {answers.program === program.id && (
                        <div className="text-teal-500">
                          <Check size={24} />
                        </div>
                      )}
                    </div>
                  </OptionCard>
                ))}
            </div>
          </div>

          {answers.showErrors && !answers.program && (
            <div className="text-red-500 text-sm">
              Please select a program to continue
            </div>
          )}
        </div>
      </Question>
    ),
  },
  {
    id: 'questions',
    component: (
      <Question isActive={currentStep === 5} onClose={handleCloseForm}>
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Almost Done!</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-xl mb-4">
              Do you have any questions for our counsellor?
            </label>
            <textarea
              className="w-full p-4 text-xl border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none min-h-[120px] border-gray-200"
              placeholder="Ask about course structure, timings, or any other queries you have..."
              value={answers.questions || ''}
              onChange={(e) => {
                updateAnswer('questions', null, e.target.value);
              }}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-xl">
            <p className="text-blue-800">
              <span className="font-medium">What happens next?</span>
              <br />
              Our counsellor will review your profile and contact you within 24
              hours to discuss:
            </p>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center gap-2 text-blue-800">
                <Check size={16} className="text-blue-500" />
                Personalized learning path based on your goals
              </li>
              <li className="flex items-center gap-2 text-blue-800">
                <Check size={16} className="text-blue-500" />
                Course schedule and start dates
              </li>
              <li className="flex items-center gap-2 text-blue-800">
                <Check size={16} className="text-blue-500" />
                Payment plans and options
              </li>
            </ul>
          </div>
          {answers.showErrors && (
            <div className="mt-4 p-4 bg-red-50 rounded-xl">
              <p className="text-red-600 text-sm">
                Failed to submit form. Please try again or contact support if
                the problem persists.
              </p>
            </div>
          )}

          <button
            onClick={async () => {
              console.log('Submit button clicked');
              try {
                setAnswers((prev) => ({ ...prev, isSubmitting: true }));
                console.log('Set submitting state');

                const result = await onFormSubmit(answers, false);
                console.log('Form submission result:', result);

                if (!result) {
                  throw new Error('No response from server');
                }

                setAnswers((prev) => ({
                  ...prev,
                  isSubmitting: false,
                  showSuccessMessage: true,
                }));

                // Clear timeout if it exists
                if (window.navigationTimeout) {
                  clearTimeout(window.navigationTimeout);
                }

                // Set new timeout and store reference
                window.navigationTimeout = setTimeout(() => {
                  console.log(
                    'Timeout triggered, closing form and navigating...'
                  );
                  if (typeof setIsOpen === 'function') {
                    setIsOpen(false);
                  }
                  if (typeof onSubmitSuccess === 'function') {
                    onSubmitSuccess();
                  } else {
                    console.error(
                      'onSubmitSuccess is not a function:',
                      onSubmitSuccess
                    );
                  }
                }, 3000);
              } catch (error) {
                console.error('Error in submit handler:', error);
                setAnswers((prev) => ({
                  ...prev,
                  isSubmitting: false,
                  showErrors: true,
                }));
              }
            }}
            className="sm:w-ful w-1/2 bg-teal-500 text-white p-4 rounded-xl text-xl font-medium hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={answers.isSubmitting}
          >
            {answers.isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Application
                <ArrowRight size={20} />
              </>
            )}
          </button>

          {/* Step Navigation */}
          <div className="fixed bottom-8 right-8 flex gap-4">
            <button
              onClick={() => setCurrentStep((curr) => curr - 1)}
              className="p-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          {/* Success Message Overlay */}
          {answers.showSuccessMessage && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4 animate-scale-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">
                  Application Submitted!
                </h3>
                <p className="text-gray-600 text-center">
                  Thank you for your interest. Our counsellor will contact you
                  within 24 hours to discuss your German language journey.
                </p>
              </div>
            </div>
          )}
        </div>
      </Question>
    ),
  },
];
