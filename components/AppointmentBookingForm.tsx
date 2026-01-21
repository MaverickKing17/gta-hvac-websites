
import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import { SERVICES, COMPANY_CONFIG } from '../constants';

interface AppointmentBookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentBookingForm: React.FC<AppointmentBookingFormProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    serviceId: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  // Focus management when modal opens
  useEffect(() => {
    if (isOpen) {
      // Focus the close button when the modal opens for screen readers to have an immediate anchor
      closeButtonRef.current?.focus();
    } else {
      setStep(1); // Reset step when closing
    }
  }, [isOpen]);

  // Focus management when step changes
  useEffect(() => {
    if (isOpen) {
      stepHeadingRef.current?.focus();
    }
  }, [step, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (id: string) => {
    setFormData(prev => ({ ...prev, serviceId: id }));
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
      role="presentation"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal Content */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {/* Header */}
        <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 id="modal-title" className="text-2xl font-black text-slate-900 leading-tight">Book an Appointment</h3>
            <p id="modal-description" className="text-sm text-slate-500 font-medium">Fast, reliable service across the GTA</p>
          </div>
          <button 
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-slate-900"
            aria-label="Close booking form"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-grow overflow-y-auto p-8" aria-live="polite">
          {step === 1 && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <h4 
                ref={stepHeadingRef}
                tabIndex={-1} 
                className="text-xs font-black text-blue-600 uppercase tracking-widest mb-6 focus:outline-none"
              >
                Step 1: Select Service
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="group" aria-label="Available Services">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className={`p-6 rounded-3xl border-2 text-left transition-all group ${
                      formData.serviceId === service.id 
                        ? 'border-blue-600 bg-blue-50/50' 
                        : 'border-slate-100 bg-slate-50 hover:border-blue-200 hover:bg-white'
                    }`}
                    aria-pressed={formData.serviceId === service.id}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
                      formData.serviceId === service.id ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 shadow-sm'
                    }`} aria-hidden="true">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <h5 className="font-bold text-slate-900 mb-1">{service.title}</h5>
                    <p className="text-xs text-slate-500 line-clamp-2">{service.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="animate-in slide-in-from-right-4 duration-300 space-y-8">
              <h4 
                ref={stepHeadingRef}
                tabIndex={-1}
                className="text-xs font-black text-blue-600 uppercase tracking-widest mb-6 focus:outline-none"
              >
                Step 2: Details & Schedule
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="book-date" className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                    <Calendar className="w-3 h-3" aria-hidden="true" /> Preferred Date
                  </label>
                  <input 
                    id="book-date"
                    type="date" 
                    name="date"
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="book-time" className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                    <Clock className="w-3 h-3" aria-hidden="true" /> Preferred Time Slot
                  </label>
                  <select 
                    id="book-time"
                    name="time"
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium appearance-none"
                    value={formData.time}
                    onChange={handleInputChange}
                    aria-label="Select preferred time slot"
                  >
                    <option value="">Choose a window</option>
                    <option value="morning">Morning (8 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 8 PM)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6 pt-4 border-t border-slate-100">
                <div className="space-y-2">
                  <label htmlFor="book-name" className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                    <User className="w-3 h-3" aria-hidden="true" /> Full Name
                  </label>
                  <input 
                    id="book-name"
                    type="text" 
                    name="name"
                    required
                    placeholder="Jane Doe"
                    autoComplete="name"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="book-phone" className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                      <Phone className="w-3 h-3" aria-hidden="true" /> Phone Number
                    </label>
                    <input 
                      id="book-phone"
                      type="tel" 
                      name="phone"
                      required
                      placeholder="416-555-0123"
                      autoComplete="tel"
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="book-email" className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                      <Mail className="w-3 h-3" aria-hidden="true" /> Email Address
                    </label>
                    <input 
                      id="book-email"
                      type="email" 
                      name="email"
                      required
                      placeholder="jane@example.com"
                      autoComplete="email"
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="book-notes" className="text-xs font-bold text-slate-500 uppercase">Additional Notes (Optional)</label>
                  <textarea 
                    id="book-notes"
                    name="notes"
                    rows={2}
                    placeholder="Tell us about the issue or special requests..."
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium resize-none"
                    value={formData.notes}
                    onChange={handleInputChange}
                    aria-label="Additional details for the appointment"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-8 py-4 text-slate-500 font-bold hover:text-slate-900 transition-colors"
                  aria-label="Go back to service selection"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-grow py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 disabled:opacity-70 group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                      <span>Scheduling Appointment...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Booking</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="py-12 flex flex-col items-center text-center animate-in zoom-in-95 duration-500" role="status">
              <div 
                ref={stepHeadingRef}
                tabIndex={-1}
                className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 animate-bounce focus:outline-none"
                aria-hidden="true"
              >
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">Confirmed!</h3>
              <p className="text-slate-600 max-w-sm mb-10 leading-relaxed">
                Thank you, {formData.name}. Your appointment for {SERVICES.find(s => s.id === formData.serviceId)?.title} has been scheduled. One of our technicians will call to confirm the details.
              </p>
              <div className="w-full p-6 bg-slate-50 rounded-[32px] border border-slate-100 text-left space-y-3 mb-10" aria-label="Appointment summary">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Date</span>
                  <span className="text-slate-900 font-black">{formData.date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Time Slot</span>
                  <span className="text-slate-900 font-black capitalize">{formData.time}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Reference</span>
                  <span className="text-slate-900 font-black">#OHC-{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all"
                aria-label="Close confirmation and exit"
              >
                Close Window
              </button>
            </div>
          )}
        </div>

        {/* Footer/Progress */}
        {step < 3 && (
          <div className="px-8 py-4 bg-white border-t border-slate-50 flex items-center gap-2" role="progressbar" aria-valuemin={1} aria-valuemax={2} aria-valuenow={step}>
            <div className={`h-1.5 flex-grow rounded-full transition-all duration-500 ${step >= 1 ? 'bg-blue-600' : 'bg-slate-100'}`} aria-label="Step 1 completed"></div>
            <div className={`h-1.5 flex-grow rounded-full transition-all duration-500 ${step >= 2 ? 'bg-blue-600' : 'bg-slate-100'}`} aria-label="Step 2 completed"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentBookingForm;
