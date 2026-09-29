import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle, Ruler, HardHat, Box, Layers, Eye, FileText } from 'lucide-react';

const StartProjectModal = ({ isOpen, onClose, initialProjectType = null }) => {
  // If initialProjectType is passed, skip step 1
  const [step, setStep] = useState(initialProjectType ? 2 : 1);
  const [formData, setFormData] = useState({
    projectType: initialProjectType || '',
    budget: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const projectTypes = [
    { id: 'Architectural', icon: <Ruler size={28} /> },
    { id: '3D Renders', icon: <Box size={28} /> },
    { id: '2D Floor Plans', icon: <Layers size={28} /> },
    { id: 'Site Supervision', icon: <Eye size={28} /> },
    { id: 'Build & Construction', icon: <HardHat size={28} /> },
    { id: 'BOQs', icon: <FileText size={28} /> },
  ];

  const budgets = [
    'Under KSh 500,000',
    'KSh 500,000 – KSh 2M',
    'KSh 2M – KSh 5M',
    'KSh 5M – KSh 15M',
    'KSh 15M+',
    'Not sure yet',
  ];

  const timelines = [
    'ASAP (within 1 month)',
    '1 – 3 months',
    '3 – 6 months',
    '6 – 12 months',
    'Just planning ahead',
  ];

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const update = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (err) {
      alert('Backend not running. Start the server and try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setStep(initialProjectType ? 2 : 1);
    setFormData({
      projectType: initialProjectType || '',
      budget: '',
      timeline: '',
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    onClose();
  };

  const canProceed = () => {
    if (step === 1) return !!formData.projectType;
    if (step === 2) return !!formData.budget;
    if (step === 3) return !!formData.timeline;
    return true;
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={resetAndClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={resetAndClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition z-10"
          style={{ position: 'absolute' }}
        >
          <X size={24} />
        </button>

        {submitted ? (
          // ---- SUCCESS SCREEN ----
          <div className="p-12 text-center">
            <CheckCircle className="text-brandNavy mx-auto mb-6" size={72} />
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Thank You!</h2>
            <p className="text-gray-600 mb-2">
              We've received your project brief for <span className="font-semibold text-brandNavy">{formData.projectType}</span>.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Our team will contact you within <strong>24 hours</strong> at {formData.email} or {formData.phone}.
            </p>
            <button
              onClick={resetAndClose}
              className="bg-brandNavy text-white px-8 py-3 rounded-lg font-bold hover:bg-brandNavyDark transition"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* ---- PROGRESS BAR ---- */}
            <div className="px-8 pt-8 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-brandNavy uppercase tracking-wider">
                  Step {step} of 4
                </span>
                <span className="text-xs text-gray-400">
                  {Math.round((step / 4) * 100)}% complete
                </span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brandNavy transition-all duration-500 ease-out"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* ---- STEP CONTENT ---- */}
            <div className="px-8 pb-8">
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">What do you need help with?</h2>
                  <p className="text-gray-500 text-sm mb-6">Choose one to get started.</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {projectTypes.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => update('projectType', p.id)}
                        className={`p-4 rounded-xl border-2 text-center transition ${formData.projectType === p.id
                          ? 'border-brandNavy bg-blue-50 text-brandNavy'
                          : 'border-gray-200 hover:border-brandNavy text-gray-700'
                          }`}
                      >
                        <div className="flex justify-center mb-2">{p.icon}</div>
                        <div className="text-sm font-semibold">{p.id}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">What's your budget range?</h2>
                  <p className="text-gray-500 text-sm mb-6">This helps us suggest the best approach.</p>
                  <div className="space-y-3">
                    {budgets.map((b) => (
                      <button
                        key={b}
                        onClick={() => update('budget', b)}
                        className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition ${formData.budget === b
                          ? 'border-brandNavy bg-blue-50 text-brandNavy'
                          : 'border-gray-200 hover:border-brandNavy text-gray-700'
                          }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">When do you want to start?</h2>
                  <p className="text-gray-500 text-sm mb-6">Timeline helps us plan resources.</p>
                  <div className="space-y-3">
                    {timelines.map((t) => (
                      <button
                        key={t}
                        onClick={() => update('timeline', t)}
                        className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition ${formData.timeline === t
                          ? 'border-brandNavy bg-blue-50 text-brandNavy'
                          : 'border-gray-200 hover:border-brandNavy text-gray-700'
                          }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Almost done — your details</h2>
                  <p className="text-gray-500 text-sm mb-6">We'll get back within 24 hours.</p>
                  <div className="space-y-4">
                    <input
                      required
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => update('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brandNavy"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brandNavy"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brandNavy"
                    />
                    <textarea
                      rows="3"
                      placeholder="Anything else we should know? (optional)"
                      value={formData.message}
                      onChange={(e) => update('message', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brandNavy"
                    />
                  </div>
                </form>
              )}

              {/* ---- NAVIGATION BUTTONS ---- */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                {step > 1 ? (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-500 hover:text-brandNavy font-semibold transition"
                  >
                    <ArrowLeft size={18} /> Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition ${canProceed()
                      ? 'bg-brandNavy text-white hover:bg-brandNavyDark'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    Next <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center gap-2 bg-brandNavy text-white px-6 py-3 rounded-lg font-bold hover:bg-brandNavyDark transition disabled:opacity-60"
                  >
                    {loading ? 'Sending...' : 'Submit Project'} <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StartProjectModal;