import React, { useState } from 'react';
import { MapPin, Building, Users, Mic, Briefcase } from 'lucide-react';

export default function Step1EventBasics({ data, updateData, nextStep }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!data.eventName) tempErrors.eventName = 'Event Name is required';
    if (!data.eventType) tempErrors.eventType = 'Event Type is required';
    
    if (data.eventDateType === 'single') {
      if (!data.eventDate) tempErrors.eventDate = 'Event Date is required';
    } else {
      if (!data.eventDateStart) tempErrors.eventDateStart = 'Start Date is required';
      if (!data.eventDateEnd) tempErrors.eventDateEnd = 'End Date is required';
    }
    
    if (!data.location) tempErrors.location = 'Location is required';
    if (!data.hiringFor) tempErrors.hiringFor = 'Please select who you are hiring for';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  const hiringOptions = [
    { id: 'planner', label: 'Event Planner', icon: <Briefcase size={32} /> },
    { id: 'performer', label: 'Performer', icon: <Mic size={32} /> },
    { id: 'crew', label: 'Crew', icon: <Users size={32} /> }
  ];

  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="slide-in-right">
      <h3 style={{ marginBottom: '1.75rem', fontWeight: 600, fontSize: '1.25rem', color: 'var(--primary)' }}>Event Basics</h3>

      <div className="form-group">
        <label className="form-label">Event Name *</label>
        <input 
          type="text" 
          name="eventName" 
          value={data.eventName} 
          onChange={handleChange} 
          className="form-input" 
          placeholder="e.g. Summer Music Festival"
        />
        {errors.eventName && <span className="form-error"> <MapPin size={14} /> {errors.eventName}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Event Type *</label>
        <div style={{ position: 'relative' }}>
          <select name="eventType" value={data.eventType} onChange={handleChange} className="form-select">
            <option value="">Select an event type</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Concert">Concert</option>
            <option value="Birthday Party">Birthday Party</option>
            <option value="Conference">Conference</option>
            <option value="Festival">Festival</option>
          </select>
        </div>
        {errors.eventType && <span className="form-error">{errors.eventType}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" style={{ marginBottom: '1rem' }}>Event Timing *</label>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '12px' }}>
          <label className="form-label" style={{ flex: 1, justifyContent: 'center', margin: 0, padding: '0.75rem', cursor: 'pointer', borderRadius: '8px', background: data.eventDateType === 'single' ? 'rgba(139, 92, 246, 0.15)' : 'transparent', border: data.eventDateType === 'single' ? '1px solid var(--primary)' : '1px solid transparent', transition: 'all 0.3s ease' }}>
            <input 
              type="radio" 
              name="eventDateType" 
              value="single" 
              checked={data.eventDateType === 'single'} 
              onChange={handleChange} 
              style={{ display: 'none' }}
            /> Single Day
          </label>
          <label className="form-label" style={{ flex: 1, justifyContent: 'center', margin: 0, padding: '0.75rem', cursor: 'pointer', borderRadius: '8px', background: data.eventDateType === 'range' ? 'rgba(139, 92, 246, 0.15)' : 'transparent', border: data.eventDateType === 'range' ? '1px solid var(--primary)' : '1px solid transparent', transition: 'all 0.3s ease' }}>
            <input 
              type="radio" 
              name="eventDateType" 
              value="range" 
              checked={data.eventDateType === 'range'} 
              onChange={handleChange} 
              style={{ display: 'none' }}
            /> Multiple Days
          </label>
        </div>

        {data.eventDateType === 'single' ? (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={{ position: 'relative' }}>
              <input type="date" name="eventDate" value={data.eventDate} onChange={handleChange} className="form-input" />
            </div>
            {errors.eventDate && <span className="form-error">{errors.eventDate}</span>}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', animation: 'fadeIn 0.4s ease' }}>
            <div style={{ flex: 1 }}>
              <label className="form-label" style={{fontSize:'0.75rem', opacity: 0.7}}>Start Date</label>
              <input type="date" name="eventDateStart" value={data.eventDateStart} onChange={handleChange} className="form-input" />
              {errors.eventDateStart && <span className="form-error">{errors.eventDateStart}</span>}
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label" style={{fontSize:'0.75rem', opacity: 0.7}}>End Date</label>
              <input type="date" name="eventDateEnd" value={data.eventDateEnd} onChange={handleChange} className="form-input" />
              {errors.eventDateEnd && <span className="form-error">{errors.eventDateEnd}</span>}
            </div>
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Location *</label>
        <div style={{ position: 'relative' }}>
          <MapPin size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', opacity: 0.7 }} />
          <input type="text" name="location" value={data.location} onChange={handleChange} className="form-input" style={{ paddingLeft: '2.75rem' }} placeholder="City or area" />
        </div>
        {errors.location && <span className="form-error">{errors.location}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Venue (Optional)</label>
        <div style={{ position: 'relative' }}>
          <Building size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', opacity: 0.7 }} />
          <input type="text" name="venue" value={data.venue} onChange={handleChange} className="form-input" style={{ paddingLeft: '2.75rem' }} placeholder="Specific hotel, hall, etc." />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" style={{ marginBottom: '1.25rem' }}>I am hiring for: *</label>
        <div className="options-grid">
          {hiringOptions.map(option => (
            <div 
              key={option.id}
              className={`option-card ${data.hiringFor === option.id ? 'selected' : ''}`}
              onClick={() => {
                if(data.hiringFor !== option.id) {
                  updateData({ hiringFor: option.id, categoryData: {} });
                } else {
                  updateData({ hiringFor: option.id });
                }
              }}
            >
              <div className="option-icon">{option.icon}</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{option.label}</div>
            </div>
          ))}
        </div>
        {errors.hiringFor && <span className="form-error">{errors.hiringFor}</span>}
      </div>

      <div className="actions" style={{ justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={handleNext}>
          Next Step 
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  );
}
