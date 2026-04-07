'use client';

import React, { useState, useEffect } from 'react';
import Step1EventBasics from './Step1EventBasics';
import Step2CategoryFields from './Step2CategoryFields';
import Step3AdditionalDetails from './Step3AdditionalDetails';
import Step4ReviewSubmit from './Step4ReviewSubmit';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    eventName: '',
    eventType: '',
    eventDateType: 'single', // single or range
    eventDate: '',
    eventDateStart: '',
    eventDateEnd: '',
    location: '',
    venue: '',
    hiringFor: '',

    // Step 2 Data
    categoryData: {},

    // Step 3 Data
    contactInfo: {
      name: '',
      phone: '',
      email: ''
    },
    description: '',
    urgency: ''
  });

  const nextStep = () => {
    setStep((prev) => (prev < 4 ? prev + 1 : prev));
  };

  const prevStep = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1EventBasics data={formData} updateData={updateFormData} nextStep={nextStep} />;
      case 2:
        return <Step2CategoryFields data={formData} updateData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3AdditionalDetails data={formData} updateData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Step4ReviewSubmit data={formData} prevStep={prevStep} setStep={setStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="glass-card">
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Post Your Requirement</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Fill in the details to find the perfect match for your event</p>
      </div>

      <div className="progress-container">
        <div className="progress-steps">
          <div className="progress-bar-fill" style={{ width: `${(step - 1) * 33.33}%` }}></div>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`step-circle ${step === s ? 'active' : ''} ${step > s ? 'completed' : ''}`}>
              {step > s ? '✓' : s}
            </div>
          ))}
        </div>
      </div>

      <div className="step-content">
        {renderStep()}
      </div>
    </div>
  );
}
