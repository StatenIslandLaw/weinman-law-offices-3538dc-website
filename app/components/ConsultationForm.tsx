'use client';

import React, { useState } from 'react';
import { BREEZY_PROFESSIONAL_TOKEN } from '../../professionalConstants';

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    type: 'Buying',
    description: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const formatPhoneNumber = (value: string): string => {
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const nameParts = formData.fullName.split(' ');
      const phoneDigits = formData.phone.replace(/\D/g, '');

      const comments = `Consultation Request - ${formData.type}\n\n${formData.description || 'No additional details provided.'}`;

      const submitData = {
        path: '/breezy/breezy_sites/public/create_lead',
        first_name: nameParts[0] || '',
        last_name: nameParts.slice(1).join(' ') || '',
        email: formData.email,
        phone: phoneDigits,
        comments: comments,
        professional_token: BREEZY_PROFESSIONAL_TOKEN
      };

      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error('Network error. Please try again.');
      }

      const result = await response.json();

      if (result === false || (result && result.error)) {
        throw new Error(result.error || 'Unable to submit form. Please try again.');
      }

      setStatus('success');
      setFormData({ fullName: '', email: '', phone: '', type: 'Buying', description: '' });

      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please call us at (718) 442-2010.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    let processedValue = value;
    if (name === 'phone') {
      processedValue = formatPhoneNumber(value);
    }

    setFormData({
      ...formData,
      [name]: processedValue
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold text-white mb-2">
          Full Name <span className="text-amber-400">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-white border-2 border-slate-600 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 transition-all text-slate-900"
          placeholder="John Smith"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
          Email Address <span className="text-amber-400">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-white border-2 border-slate-600 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 transition-all text-slate-900"
          placeholder="john@example.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
          Phone Number <span className="text-amber-400">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-white border-2 border-slate-600 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 transition-all text-slate-900"
          placeholder="(718) 555-1234"
        />
      </div>

      {/* Type Dropdown */}
      <div>
        <label htmlFor="type" className="block text-sm font-semibold text-white mb-2">
          Are you buying, selling, or both? <span className="text-amber-400">*</span>
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-white border-2 border-slate-600 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 transition-all text-slate-900"
        >
          <option value="Buying">Buying</option>
          <option value="Selling">Selling</option>
          <option value="Both">Both</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-white mb-2">
          Brief description of your situation (optional)
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-white border-2 border-slate-600 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 transition-all resize-none text-slate-900"
          placeholder="Tell us a little about your real estate needs..."
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {status === 'submitting' ? 'Sending...' : 'Schedule My Free Consultation'}
        </button>
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="p-4 bg-green-50 border-2 border-green-500 rounded-lg text-green-800 text-center">
          Thank you! We'll contact you promptly to discuss your purchase or sale.
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-50 border-2 border-red-500 rounded-lg text-red-800 text-center">
          {errorMessage || 'There was an error sending your message. Please call us at (718) 442-2010.'}
        </div>
      )}
    </form>
  );
}
