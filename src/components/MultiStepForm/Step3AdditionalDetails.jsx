import React, { useState } from 'react';
import { User, Phone, Mail, Clock, MessageSquare } from 'lucide-react';

export default function Step3AdditionalDetails({ data, updateData, nextStep, prevStep }) {
  const [errors, setErrors] = useState({});

  const { contactInfo, description, urgency } = data;

  const handleContactChange = (e) => {
    updateData({
      contactInfo: {
        ...contactInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePhone = (phone) => {
    return String(phone).match(/^[0-9+\-\s()]{7,15}$/);
  };

  const validate = () => {
    let tempErrors = {};
    if (!contactInfo.name) tempErrors.name = 'Name is required';
    
    if (!contactInfo.phone) {
      tempErrors.phone = 'Phone number is required';
    } else if (!validatePhone(contactInfo.phone)) {
      tempErrors.phone = 'Invalid phone number format';
    }

    if (!contactInfo.email) {
      tempErrors.email = 'Email is required';
    } else if (!validateEmail(contactInfo.email)) {
      tempErrors.email = 'Invalid email address';
    }

    if (!urgency) {
      tempErrors.urgency = 'Please select urgency level';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) nextStep();
  };

  return (
    <div className="slide-in-right">
      <h3 style={{ marginBottom: '1.75rem', fontWeight: 600, fontSize: '1.25rem', color: 'var(--primary)' }}>Contact & Details</h3>

      <div className="form-group">
        <label className="form-label">Contact Name *</label>
        <div style={{ position: 'relative' }}>
          <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', opacity: 0.7 }} />
          <input type="text" name="name" value={contactInfo.name} onChange={handleContactChange} className="form-input" style={{ paddingLeft: '2.75rem' }} placeholder="Your full name" />
        </div>
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label">Contact Number *</label>
          <div style={{ position: 'relative' }}>
            <Phone size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', opacity: 0.7 }} />
            <input type="tel" name="phone" value={contactInfo.phone} onChange={handleContactChange} className="form-input" style={{ paddingLeft: '2.75rem' }} placeholder="+91 9876543210" />
          </div>
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label className="form-label">Email Address *</label>
          <div style={{ position: 'relative' }}>
            <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', opacity: 0.7 }} />
            <input type="email" name="email" value={contactInfo.email} onChange={handleContactChange} className="form-input" style={{ paddingLeft: '2.75rem' }} placeholder="you@example.com" />
          </div>
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Description / Brief</label>
        <div style={{ position: 'relative' }}>
          <MessageSquare size={16} style={{ position: 'absolute', left: '1rem', top: '1.2rem', color: 'var(--primary)', opacity: 0.7 }} />
          <textarea 
            name="description" 
            value={description} 
            onChange={handleChange} 
            className="form-textarea" 
            style={{ paddingLeft: '2.75rem' }}
            placeholder="Describe any other details about your requirement..."
            maxLength={500}
          />
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
          {description.length} / 500 characters
        </div>
      </div>

      <div className="form-group">
        <label className="form-label"><Clock size={16} /> Urgency *</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
          {['Immediate', 'Within a week', 'Within a month', 'Flexible'].map(opt => (
            <label key={opt} style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.8rem', cursor: 'pointer', borderRadius: '12px', 
              background: urgency === opt ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255,255,255,0.03)', 
              border: urgency === opt ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
              transition: 'all 0.3s ease', fontSize: '0.9rem', fontWeight: 500, color: urgency === opt ? 'white' : 'var(--text-secondary)'
            }}>
              <input type="radio" name="urgency" value={opt} checked={urgency === opt} onChange={handleChange} style={{ display: 'none' }} />
              {opt}
            </label>
          ))}
        </div>
        {errors.urgency && <span className="form-error">{errors.urgency}</span>}
      </div>

      <div className="actions">
        <button className="btn btn-secondary" onClick={prevStep}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m7 7-7-7 7-7"/></svg>
          Back
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Review Order
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  );
}
