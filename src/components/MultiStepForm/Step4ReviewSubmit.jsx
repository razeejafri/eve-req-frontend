import React, { useState } from 'react';
import { Check, Edit2 } from 'lucide-react';

export default function Step4ReviewSubmit({ data, prevStep, setStep }) {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [reqId, setReqId] = useState(null);

  const handleSubmit = async () => {
    if (!agreed) return;
    setLoading(true);
    setError(null);

    try {
      // Structure data to match backend schema format if necessary
      const payload = {
        eventName: data.eventName,
        eventType: data.eventType,
        eventDate: data.eventDateType === 'single' ? { single: data.eventDate } : { range: { start: data.eventDateStart, end: data.eventDateEnd } },
        location: data.location,
        venue: data.venue,
        hiringFor: data.hiringFor,
        categoryData: data.categoryData,
        contactInfo: data.contactInfo,
        description: data.description,
        urgency: data.urgency
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/requirements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        setReqId(result.requirementId);
      } else {
        throw new Error(result.message || 'Failed to submit requirement');
      }
    } catch (err) {
      setError(err.message || 'Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="slide-in-right success-container">
        <div className="success-icon" style={{ background: 'var(--success)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 1.5rem', boxShadow: '0 0 30px rgba(52, 211, 153, 0.4)', animation: 'bounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both' }}>
          <Check size={40} color="white" />
        </div>
        <h2 className="text-gradient" style={{ marginBottom: '1rem', fontSize: '1.75rem', fontWeight: 700 }}>Requirement Posted!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2.5rem' }}>
          Your event requirement has been successfully shared. Professionals will start reviewing it shortly.
        </p>
        <div className="review-card" style={{ display: 'inline-block', textAlign: 'left', padding: '1.5rem 2.5rem', border: '1px dashed var(--glass-stroke)' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem', textAlign: 'center' }}>Requirement ID</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '2px', color: 'var(--primary)', textAlign: 'center' }}>{reqId}</div>
        </div>
        <div style={{ marginTop: '3rem' }}>
          <button className="btn btn-secondary" onClick={() => window.location.reload()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l-7 7 7 7"/></svg>
            Post Another Requirement
          </button>
        </div>
      </div>
    );
  }

  const renderArrayValue = (arr) => arr && arr.length > 0 ? arr.join(', ') : 'None selected';

  return (
    <div className="slide-in-right">
      <h3 style={{ marginBottom: '1.75rem', fontWeight: 600, fontSize: '1.25rem', color: 'var(--primary)' }}>Review & Submit</h3>

      <div className="review-card">
        <h4>
          <span>Event Basics</span>
          <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.4rem', borderRadius: '6px', display: 'flex', alignItems: 'center' }} onClick={() => setStep && setStep(1)}>
            <Edit2 size={14} />
          </button>
        </h4>
        <div className="review-item"><span className="review-label">Event Name:</span> <span className="review-value">{data.eventName}</span></div>
        <div className="review-item"><span className="review-label">Event Type:</span> <span className="review-value">{data.eventType}</span></div>
        <div className="review-item"><span className="review-label">Location:</span> <span className="review-value">{data.location} {data.venue && `(${data.venue})`}</span></div>
        <div className="review-item">
          <span className="review-label">Date:</span> 
          <span className="review-value">
            {data.eventDateType === 'single' ? data.eventDate : `${data.eventDateStart} to ${data.eventDateEnd}`}
          </span>
        </div>
        <div className="review-item"><span className="review-label">Hiring For:</span> <span className="review-value" style={{ textTransform: 'capitalize' }}>{data.hiringFor}</span></div>
      </div>

      <div className="review-card">
        <h4>
          <span>Category Details</span>
          <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.4rem', borderRadius: '6px', display: 'flex', alignItems: 'center' }} onClick={() => setStep && setStep(2)}>
            <Edit2 size={14} />
          </button>
        </h4>
        {data.hiringFor === 'planner' && (
          <>
            <div className="review-item"><span className="review-label">Budget Range:</span> <span className="review-value">₹{Number(data.categoryData.budgetRange).toLocaleString('en-IN')}</span></div>
            <div className="review-item"><span className="review-label">Services:</span> <span className="review-value">{renderArrayValue(data.categoryData.servicesNeeded)}</span></div>
            <div className="review-item"><span className="review-label">Guests:</span> <span className="review-value">{data.categoryData.expectedGuestCount}</span></div>
          </>
        )}
        {data.hiringFor === 'performer' && (
          <>
            <div className="review-item"><span className="review-label">Type:</span> <span className="review-value">{data.categoryData.performanceType}</span></div>
            <div className="review-item"><span className="review-label">Duration:</span> <span className="review-value">{data.categoryData.durationNeeded} Hours</span></div>
            <div className="review-item"><span className="review-label">Budget Range:</span> <span className="review-value">₹{Number(data.categoryData.budgetRange).toLocaleString('en-IN')}</span></div>
            <div className="review-item"><span className="review-label">Genre:</span> <span className="review-value">{data.categoryData.genreStyle || 'Any'}</span></div>
          </>
        )}
        {data.hiringFor === 'crew' && (
          <>
            <div className="review-item"><span className="review-label">Crew Types:</span> <span className="review-value">{renderArrayValue(data.categoryData.crewType)}</span></div>
            <div className="review-item"><span className="review-label">Team Size:</span> <span className="review-value">{data.categoryData.teamSizeNeeded} Members</span></div>
            <div className="review-item"><span className="review-label">Experience:</span> <span className="review-value">{data.categoryData.experienceRequired || 'Not specified'}</span></div>
            <div className="review-item"><span className="review-label">Budget Range:</span> <span className="review-value">₹{Number(data.categoryData.budgetRange).toLocaleString('en-IN')}</span></div>
          </>
        )}
      </div>

      <div className="review-card">
        <h4>
          <span>Contact & Logistics</span>
          <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.4rem', borderRadius: '6px', display: 'flex', alignItems: 'center' }} onClick={() => setStep && setStep(3)}>
            <Edit2 size={14} />
          </button>
        </h4>
        <div className="review-item"><span className="review-label">Name:</span> <span className="review-value">{data.contactInfo.name}</span></div>
        <div className="review-item"><span className="review-label">Phone:</span> <span className="review-value">{data.contactInfo.phone}</span></div>
        <div className="review-item"><span className="review-label">Email:</span> <span className="review-value">{data.contactInfo.email}</span></div>
        <div className="review-item"><span className="review-label">Urgency:</span> <span className="review-value">{data.urgency}</span></div>
      </div>

      {error && <div className="form-error" style={{ textAlign: 'center', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(251, 113, 133, 0.1)', border: '1px solid var(--error)', borderRadius: '12px' }}>{error}</div>}

      <div className="form-group" style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', cursor: 'pointer', fontSize: '0.875rem' }}>
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ marginTop: '0.2rem', minWidth: '1.2rem', height: '1.2rem', accentColor: 'var(--primary)' }} />
          <span style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>I agree to the <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Terms of Service</span> and <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Privacy Policy</span>. I confirm that all provided information is accurate and I am authorized to post this requirement.</span>
        </label>
      </div>

      <div className="actions">
        <button className="btn btn-secondary" onClick={prevStep} disabled={loading}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m7 7-7-7 7-7"/></svg>
          Back
        </button>
        <button className="btn btn-primary" onClick={handleSubmit} disabled={!agreed || loading} style={{ flexGrow: 1 }}>
          {loading ? (
            <>
              <div className="loading-spinner"></div>
              Processing...
            </>
          ) : (
            <>
              Submit Requirement
              <Check size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
