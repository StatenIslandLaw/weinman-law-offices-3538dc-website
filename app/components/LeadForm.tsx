'use client';

import React, { useState } from 'react';
import { BREEZY_PROFESSIONAL_TOKEN } from '../../professionalConstants';

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonColor?: string;
  fields?: string;
  required?: string;
  successMessage?: string;
  className?: string;
  professional_token?: string;
}

type FormData = {
  [key: string]: string;
};

type FieldErrors = {
  [key: string]: string;
};

type TouchedFields = {
  [key: string]: boolean;
};

export default function LeadForm({
  title = "Get in Touch",
  subtitle = "Fill out the form below and we'll get back to you soon.",
  buttonText = "Submit",
  buttonColor = "blue",
  fields = "name,email,phone,message",
  required = "name,email",
  successMessage = "Thank you! We'll be in touch soon.",
  className = "",
  professional_token = BREEZY_PROFESSIONAL_TOKEN
}: LeadFormProps) {
  const fieldsList = fields.split(',').map(f => f.trim());
  const requiredFields = required.split(',').map(f => f.trim());
  
  const [formData, setFormData] = useState<FormData>(() => {
    const initial: FormData = {};
    fieldsList.forEach(field => {
      initial[field] = '';
    });
    return initial;
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({});

  // Validation helpers
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formatPhoneNumber = (value: string): string => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const validateField = (name: string, value: string): string => {
    if (requiredFields.includes(name) && !value.trim()) {
      return 'This field is required';
    }
    
    if (name === 'email' && value.trim() && !validateEmail(value)) {
      return 'Please enter a valid email address';
    }
    
    if (name === 'phone' && value.trim()) {
      const phoneDigits = value.replace(/\D/g, '');
      if (phoneDigits.length > 0 && phoneDigits.length < 10) {
        return 'Please enter a valid 10-digit phone number';
      }
    }
    
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    
    // Format phone number as user types
    if (name === 'phone') {
      processedValue = formatPhoneNumber(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear submit error when user starts typing
    if (submitError) {
      setSubmitError('');
    }
    
    // Validate field if it's been touched
    if (touchedFields[name]) {
      const error = validateField(name, processedValue);
      setFieldErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const errors: FieldErrors = {};
    let hasErrors = false;
    
    fieldsList.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        errors[field] = error;
        hasErrors = true;
      }
    });
    
    if (hasErrors) {
      setFieldErrors(errors);
      setTouchedFields(() => {
        const touched: TouchedFields = {};
        fieldsList.forEach(field => {
          touched[field] = true;
        });
        return touched;
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');

    try {
      // Prepare the data for the API
      const nameValue = formData.name || '';
      const nameParts = nameValue.split(' ');

      // Remove phone formatting for API submission
      const phoneDigits = formData.phone ? formData.phone.replace(/\D/g, '') : '';

      const submitData = {
        path: '/breezy/breezy_sites/public/create_lead',
        first_name: nameParts[0] || '',
        last_name: nameParts.slice(1).join(' ') || '',
        email: formData.email || '',
        phone: phoneDigits,
        address: formData.address || '',
        comments: formData.message || formData.comments || '',
        professional_token
      };

      // Use the proxy endpoint to avoid CORS issues
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error('Network error. Please check your connection and try again.');
      }

      const result = await response.json();
      
      // Check for errors in the response
      if (result === false || (result && result.error)) {
        throw new Error(result.error || 'Unable to submit form. Please try again.');
      }

      setSubmitSuccess(true);
      
      // Reset form
      const resetData: FormData = {};
      fieldsList.forEach(field => {
        resetData[field] = '';
      });
      setFormData(resetData);
      setFieldErrors({});
      setTouchedFields({});
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Something went wrong. Please try again or contact us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldType = (field: string): string => {
    if (field === 'email') return 'email';
    if (field === 'phone') return 'tel';
    return 'text';
  };

  const getFieldLabel = (field: string): string => {
    return field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ');
  };

  const buttonColorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    green: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    red: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    purple: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500',
    orange: 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500',
  }[buttonColor] || 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';

  return (
    <div className={`relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm p-8 ${className}`}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl pointer-events-none" />
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">{title}</h3>
          <p className="text-gray-600 text-lg">{subtitle}</p>
        </div>

      {submitSuccess && (
        <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-md animate-slideIn">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-green-800 font-medium">{successMessage}</p>
          </div>
        </div>
      )}

      {submitError && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-md animate-slideIn">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-red-800 text-sm">{submitError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {fieldsList.map(field => {
          const isRequired = requiredFields.includes(field);
          const isMessage = field === 'message' || field === 'comments';
          const hasError = touchedFields[field] && fieldErrors[field];
          const isValid = touchedFields[field] && !fieldErrors[field] && formData[field];
          const hasValue = formData[field].length > 0;
          
          // Dynamic border colors based on validation state
          let borderClass = 'border-gray-300 focus:border-blue-500';
          let ringClass = 'focus:ring-blue-500/20';
          if (hasError) {
            borderClass = 'border-red-300 focus:border-red-500';
            ringClass = 'focus:ring-red-500/20';
          } else if (isValid) {
            borderClass = 'border-green-400 focus:border-green-500';
            ringClass = 'focus:ring-green-500/20';
          }
          
          return (
            <div key={field} className="relative group">
              <div className="relative">
                {isMessage ? (
                  <>
                    <textarea
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      rows={4}
                      placeholder=" "
                      className={`peer w-full px-4 pt-6 pb-2 border-2 ${borderClass} rounded-xl focus:outline-none focus:ring-4 ${ringClass} transition-all duration-200 resize-none bg-white`}
                      aria-invalid={hasError ? 'true' : 'false'}
                      aria-describedby={hasError ? `${field}-error` : undefined}
                    />
                    <label 
                      htmlFor={field} 
                      className={`absolute left-4 transition-all duration-200 pointer-events-none
                        peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                        peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600
                        ${hasValue ? 'top-2 text-xs text-gray-600' : 'top-4 text-base text-gray-400'}
                        font-medium
                      `}
                    >
                      {getFieldLabel(field)} {isRequired && <span className="text-red-500">*</span>}
                    </label>
                  </>
                ) : (
                  <>
                    <input
                      type={getFieldType(field)}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder=" "
                      className={`peer w-full px-4 pt-6 pb-2 border-2 ${borderClass} rounded-xl focus:outline-none focus:ring-4 ${ringClass} transition-all duration-200 bg-white`}
                      aria-invalid={hasError ? 'true' : 'false'}
                      aria-describedby={hasError ? `${field}-error` : undefined}
                    />
                    <label 
                      htmlFor={field} 
                      className={`absolute left-4 transition-all duration-200 pointer-events-none
                        peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                        peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-blue-600
                        ${hasValue ? 'top-2 translate-y-0 text-xs text-gray-600' : 'top-1/2 -translate-y-1/2 text-base text-gray-400'}
                        font-medium
                      `}
                    >
                      {getFieldLabel(field)} {isRequired && <span className="text-red-500">*</span>}
                    </label>
                  </>
                )}
                
                {/* Validation icon */}
                {!isMessage && isValid && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 animate-fadeIn">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Error message */}
              {hasError && (
                <p id={`${field}-error`} className="mt-1.5 text-sm text-red-600 flex items-center animate-slideIn">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {fieldErrors[field]}
                </p>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${buttonColorClasses} text-white py-4 px-8 rounded-xl font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-2xl mt-2`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : buttonText}
        </button>
        
        {fieldsList.includes("phone") && (
          <p className="mt-3 text-xs text-gray-500 text-center">
            By providing your phone number, you agree to receive customer care messages from Breezy. Message frequency may vary. Msg & data rates may apply. Reply HELP for help or STOP to cancel.
          </p>
        )}
      </form>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
