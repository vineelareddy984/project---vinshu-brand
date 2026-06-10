import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("💐 Kindly fill out all fields to transmit your message!");
      return;
    }
    setIsSent(true);
  };

  const handleReset = () => {
    setIsSent(false);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="py-16 bg-pastel-mint/65 border-b border-pink-100/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Infocard Coordinates Column */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-pink-brand font-display block mb-1">Our Studio Coordinates</span>
              <h2 className="font-display text-3xl font-extrabold text-gray-800">Get In Touch With Vinshu</h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
                Whether you need assistance with custom dress fitment sheets, children hypoallergenic ingredients catalogs, or elder gift packaging, our hospitality staff responds within 4 hours.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-emerald-200/50">
              {/* Point 1: Map location */}
              <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-gray-800">Our physical flagship lounge</h4>
                  <p className="text-gray-500 text-xs leading-relaxed mt-0.5">708 Rose Petal Boulevard, Suite A, Bloom Orchard, CA 90210</p>
                </div>
              </div>

              {/* Point 2: Hours */}
              <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-gray-800">Boutique Operating Hours</h4>
                  <p className="text-gray-500 text-xs leading-relaxed mt-0.5">Monday to Saturday: 09:00 AM – 08:30 PM PST <br/> Sunday: Fully Closed for Family Rest</p>
                </div>
              </div>

              {/* Point 3: Contacts */}
              <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-gray-800">Reach Us Instantly</h4>
                  <p className="text-gray-500 text-xs leading-relaxed mt-0.5">Primary Voice: +1 (800) VIN-SHU-GLOW <br/> Email: hello@vinshuluxurybrand.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* interactive Contact Form Column */}
          <div className="lg:col-span-7">
            {isSent ? (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200 text-center shadow-lg animate-pulse-slow">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-widest font-display">
                  Transmission Dispatched
                </span>
                <h3 className="font-display text-2xl font-extrabold text-gray-850 mt-4">
                  Thank You For Booking Connect With Us!
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm max-w-sm mx-auto mt-2 leading-relaxed">
                  We have cataloged your credentials. A certified luxury concierge clerk is drafting your answer as we speak.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 px-6 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-display text-xs font-bold rounded-full cursor-pointer hover:scale-103 shadow-xs transition"
                >
                  Transmit New Query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitContact} className="bg-white p-6 sm:p-10 rounded-3xl border border-emerald-100/80 shadow-md text-left">
                <h3 className="font-display font-extrabold text-base text-gray-800 mb-6 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span>Transmit Digital Query Slip</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 font-bold block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      placeholder="E.g. Neil Roy"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-neutral-50/50 border border-emerald-100 rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-emerald-300 text-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-bold block mb-1">Your Email</label>
                    <input
                      type="email"
                      placeholder="E.g. concierge@familywealth.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-50/50 border border-emerald-100 rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-emerald-300 text-gray-700"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-xs text-gray-500 font-bold block mb-1">Your Message or Detailed Fitment/Dermal Requirements</label>
                  <textarea
                    rows={4}
                    placeholder="Describe what fabrics style or skincare support your multigenerational family is looking for..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-neutral-50/50 border border-emerald-100 rounded-xl p-3 text-xs focus:outline-none focus:border-emerald-300 text-gray-700"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-3.5 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-display text-xs font-bold rounded-xl shadow-xs hover:scale-[1.01] active:scale-99 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Concern Slip</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
