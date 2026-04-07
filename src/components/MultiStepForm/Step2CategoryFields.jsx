import React, { useState } from 'react';

export default function Step2CategoryFields({ data, updateData, nextStep, prevStep }) {
  const [errors, setErrors] = useState({});

  const { hiringFor, categoryData } = data;

  const handleCategoryChange = (e) => {
    updateData({ 
      categoryData: { 
        ...categoryData, 
        [e.target.name]: e.target.value 
      } 
    });
  };

  const handleMultiSelect = (field, value) => {
    const currentValues = categoryData[field] || [];
    let newValues;
    if (currentValues.includes(value)) {
      newValues = currentValues.filter((v) => v !== value);
    } else {
      newValues = [...currentValues, value];
    }
    updateData({ categoryData: { ...categoryData, [field]: newValues } });
  };

  const validate = () => {
    let tempErrors = {};
    if (hiringFor === 'planner') {
      if (!categoryData.budgetRange) tempErrors.budgetRange = 'Budget is required';
      if (!categoryData.expectedGuestCount) tempErrors.expectedGuestCount = 'Guest count is required';
    } else if (hiringFor === 'performer') {
      if (!categoryData.performanceType) tempErrors.performanceType = 'Performance Type is required';
      if (!categoryData.durationNeeded) tempErrors.durationNeeded = 'Duration is required';
    } else if (hiringFor === 'crew') {
      if (!categoryData.crewType || categoryData.crewType.length === 0) tempErrors.crewType = 'Select at least one crew type';
      if (!categoryData.teamSizeNeeded) tempErrors.teamSizeNeeded = 'Team size is required';
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) nextStep();
  };

  // Content for Event Planner
  const renderPlannerFields = () => (
    <>
      <div className="form-group" style={{ animationDelay: '0.1s' }}>
        <label className="form-label">
          Budget Range
          <span style={{ marginLeft: 'auto', fontWeight: 600, color: 'var(--primary)', background: 'rgba(139, 92, 246, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
            ₹ {Number(categoryData.budgetRange || 10000).toLocaleString('en-IN')}
          </span>
        </label>
        <input type="range" name="budgetRange" min="10000" max="1000000" step="10000" 
          value={categoryData.budgetRange || 10000} onChange={handleCategoryChange} className="form-input" />
        {errors.budgetRange && <span className="form-error">{errors.budgetRange}</span>}
      </div>

      <div className="form-group" style={{ animationDelay: '0.2s' }}>
        <label className="form-label">Services Needed</label>
        <div className="chips-container">
          {['Full Planning', 'Partial Planning', 'Day Coordination', 'Vendor Management'].map(service => (
            <div 
              key={service} 
              className={`chip ${(categoryData.servicesNeeded || []).includes(service) ? 'selected' : ''}`}
              onClick={() => handleMultiSelect('servicesNeeded', service)}
            >
              {service}
            </div>
          ))}
        </div>
      </div>

      <div className="form-group" style={{ animationDelay: '0.3s' }}>
        <label className="form-label">Expected Guest Count *</label>
        <div style={{ position: 'relative' }}>
          <input type="number" name="expectedGuestCount" value={categoryData.expectedGuestCount || ''} 
            onChange={handleCategoryChange} className="form-input" min="1" placeholder="Number of guests" />
        </div>
        {errors.expectedGuestCount && <span className="form-error">{errors.expectedGuestCount}</span>}
      </div>

      <div className="form-group" style={{ animationDelay: '0.4s' }}>
        <label className="form-label">Special Requirements</label>
        <textarea name="specialRequirements" value={categoryData.specialRequirements || ''} 
          onChange={handleCategoryChange} className="form-textarea" placeholder="Any specific themes or requirements?" />
      </div>
    </>
  );

  // Content for Performer
  const renderPerformerFields = () => (
    <>
      <div className="form-group" style={{ animationDelay: '0.1s' }}>
        <label className="form-label">Performance Type *</label>
        <select name="performanceType" value={categoryData.performanceType || ''} onChange={handleCategoryChange} className="form-select">
          <option value="">Select type</option>
          <option value="Singer">Singer</option>
          <option value="Dancer">Dancer</option>
          <option value="DJ">DJ</option>
          <option value="Band">Band</option>
          <option value="Comedian">Comedian</option>
          <option value="Magician">Magician</option>
        </select>
        {errors.performanceType && <span className="form-error">{errors.performanceType}</span>}
      </div>

      <div className="form-group" style={{ animationDelay: '0.2s' }}>
        <label className="form-label">Duration Needed (Hours) *</label>
        <input type="number" name="durationNeeded" value={categoryData.durationNeeded || ''} 
          onChange={handleCategoryChange} className="form-input" min="1" placeholder="e.g. 2" />
        {errors.durationNeeded && <span className="form-error">{errors.durationNeeded}</span>}
      </div>

      <div className="form-group" style={{ animationDelay: '0.3s' }}>
        <label className="form-label">
          Budget Range
          <span style={{ marginLeft: 'auto', fontWeight: 600, color: 'var(--primary)', background: 'rgba(139, 92, 246, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
            ₹ {Number(categoryData.budgetRange || 5000).toLocaleString('en-IN')}
          </span>
        </label>
        <input type="range" name="budgetRange" min="5000" max="500000" step="5000" 
          value={categoryData.budgetRange || 5000} onChange={handleCategoryChange} className="form-input" />
      </div>

      <div className="form-group" style={{ animationDelay: '0.4s' }}>
        <label className="form-label">Genre/Style</label>
        <input type="text" name="genreStyle" value={categoryData.genreStyle || ''} 
          onChange={handleCategoryChange} className="form-input" placeholder="e.g. Classical, EDM, Bollywood" />
      </div>

      <div className="form-group" style={{ animationDelay: '0.5s', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '14px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <label className="form-label" style={{ marginBottom: 0, color: 'white' }}>Is equipment provided by the performer?</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', position: 'relative' }}>
          <input type="checkbox" name="equipmentProvided" 
            checked={categoryData.equipmentProvided || false} 
            onChange={(e) => updateData({ categoryData: { ...categoryData, equipmentProvided: e.target.checked } })}
            style={{ 
              width: '40px', height: '20px', appearance: 'none', background: categoryData.equipmentProvided ? 'var(--primary)' : 'rgba(255,255,255,0.1)', 
              borderRadius: '20px', position: 'relative', cursor: 'pointer', transition: 'all 0.3s ease', border: '1px solid var(--glass-border)' 
            }}
          />
          <span style={{ 
            position: 'absolute', left: categoryData.equipmentProvided ? '22px' : '4px', top: '4px', width: '12px', height: '12px', 
            background: 'white', borderRadius: '50%', pointerEvents: 'none', transition: 'all 0.3s ease', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' 
          }}></span>
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{categoryData.equipmentProvided ? 'Yes' : 'No'}</span>
        </div>
      </div>
    </>
  );

  // Content for Crew
  const renderCrewFields = () => (
    <>
      <div className="form-group" style={{ animationDelay: '0.1s' }}>
        <label className="form-label">Crew Type *</label>
        <div className="chips-container">
          {['Photography', 'Videography', 'Catering', 'Decoration', 'Security', 'Sound/Lights'].map(type => (
            <div 
              key={type} 
              className={`chip ${(categoryData.crewType || []).includes(type) ? 'selected' : ''}`}
              onClick={() => handleMultiSelect('crewType', type)}
            >
              {type}
            </div>
          ))}
        </div>
        {errors.crewType && <span className="form-error">{errors.crewType}</span>}
      </div>

      <div className="form-group" style={{ animationDelay: '0.2s' }}>
        <label className="form-label">Team Size Needed *</label>
        <input type="number" name="teamSizeNeeded" value={categoryData.teamSizeNeeded || ''} 
          onChange={handleCategoryChange} className="form-input" min="1" placeholder="e.g. 10" />
        {errors.teamSizeNeeded && <span className="form-error">{errors.teamSizeNeeded}</span>}
      </div>

      <div className="form-group" style={{ animationDelay: '0.3s' }}>
        <label className="form-label">Duration</label>
        <select name="duration" value={categoryData.duration || ''} onChange={handleCategoryChange} className="form-select">
          <option value="">Select duration</option>
          <option value="Few hours">Few hours</option>
          <option value="Full day">Full day</option>
          <option value="Multiple days">Multiple days</option>
        </select>
      </div>

      <div className="form-group" style={{ animationDelay: '0.4s' }}>
        <label className="form-label">
          Budget Range
          <span style={{ marginLeft: 'auto', fontWeight: 600, color: 'var(--primary)', background: 'rgba(139, 92, 246, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
            ₹ {Number(categoryData.budgetRange || 5000).toLocaleString('en-IN')}
          </span>
        </label>
        <input type="range" name="budgetRange" min="5000" max="300000" step="5000" 
          value={categoryData.budgetRange || 5000} onChange={handleCategoryChange} className="form-input" />
      </div>

      <div className="form-group" style={{ animationDelay: '0.5s' }}>
        <label className="form-label">Experience Required</label>
        <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '12px' }}>
          {['Fresher', 'Intermediate', 'Professional'].map(exp => (
            <label key={exp} style={{ 
              flex: 1, textAlign: 'center', padding: '0.75rem', cursor: 'pointer', borderRadius: '8px', 
              background: categoryData.experienceRequired === exp ? 'rgba(139, 92, 246, 0.15)' : 'transparent', 
              border: categoryData.experienceRequired === exp ? '1px solid var(--primary)' : '1px solid transparent', 
              transition: 'all 0.3s ease', fontSize: '0.9rem', fontWeight: 500, color: categoryData.experienceRequired === exp ? 'white' : 'var(--text-secondary)'
            }}>
              <input type="radio" name="experienceRequired" value={exp} 
                checked={categoryData.experienceRequired === exp} 
                onChange={handleCategoryChange} style={{ display: 'none' }} />
              {exp}
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="slide-in-right">
      <h3 style={{ marginBottom: '1.75rem', fontWeight: 600, fontSize: '1.25rem', color: 'var(--primary)' }}>
        {hiringFor === 'planner' && 'Event Planner Requirements'}
        {hiringFor === 'performer' && 'Performer Requirements'}
        {hiringFor === 'crew' && 'Crew Requirements'}
      </h3>

      <div style={{ animation: 'fadeIn 0.5s ease both' }}>
        {hiringFor === 'planner' && renderPlannerFields()}
        {hiringFor === 'performer' && renderPerformerFields()}
        {hiringFor === 'crew' && renderCrewFields()}
      </div>

      <div className="actions">
        <button className="btn btn-secondary" onClick={prevStep}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m7 7-7-7 7-7"/></svg>
          Back
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Next Step
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  );
}
