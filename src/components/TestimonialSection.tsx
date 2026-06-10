import React, { useState } from 'react';
import { REVIEWS } from '../data';
import { Review } from '../types';
import { Star, Quote, PlusCircle, Smile } from 'lucide-react';

export default function TestimonialSection() {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [role, setRole] = useState('Verified Buyer');
  const [comment, setComment] = useState('');

  const avatarColors = [
    'bg-rose-100 text-rose-600',
    'bg-amber-100 text-amber-600',
    'bg-pink-100 text-pink-600',
    'bg-teal-100 text-teal-600',
    'bg-violet-100 text-violet-600',
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) {
      alert("💐 Please write your Name and wonderful Comment before submitting!");
      return;
    }

    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      avatarColor: randomColor,
      role
    };

    setReviews([newReview, ...reviews]);
    setAuthor('');
    setComment('');
    setRole('Verified Buyer');
    setShowForm(false);
  };

  return (
    <section id="testimonials" className="py-16 bg-pastel-cream border-b border-pink-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="text-center md:text-left">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-pink-brand font-display block mb-1">Glow & Apparel Testimonial Wall</span>
            <h2 className="font-display text-4xl font-extrabold text-gray-800">Stories From Our Community</h2>
            <p className="text-gray-500 text-xs sm:text-sm max-w-xl">
              Discover honest impressions and luxury ratings from four generations of families wearing our threads and loving our active botanicals.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 px-6 py-3 bg-gradient-to-r from-pink-brand to-peach-brand text-white text-xs font-bold rounded-full hover:scale-103 shadow-md active:scale-97 cursor-pointer transition glow-pink"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Write Guest Review</span>
          </button>
        </div>

        {/* Dynamic submission drawer / box */}
        {showForm && (
          <form 
            onSubmit={handleSubmitReview}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 max-w-2xl mx-auto mb-10 text-left shadow-lg animate-float-slow"
          >
            <h3 className="font-display font-extrabold text-base text-gray-800 mb-4">
              Share Your Graceful Interaction With Vinshu
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 font-bold block mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="E.g. Shanaya Malhotra"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-neutral-50/50 border border-pink-100 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-pink-brand text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 font-bold block mb-1">Your Focus / Badge Title</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-neutral-50/50 border border-pink-100 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-pink-brand text-gray-700 cursor-pointer"
                >
                  <option value="Verified Buyer">Verified Buyer</option>
                  <option value="Skincare Lover">Skincare Enthusiast</option>
                  <option value="Family Style Guide">Family Style Guide</option>
                  <option value="Elders Collection Fan">Elder Collection Admirer</option>
                </select>
              </div>
            </div>

            {/* Stars Picker */}
            <div className="mt-4">
              <label className="text-xs text-gray-400 font-bold block mb-1">Rating Stars</label>
              <div className="flex gap-1.5 items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                  </button>
                ))}
                <span className="text-xs font-bold text-gray-600 ml-2">{rating} out of 5</span>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs text-gray-400 font-bold block mb-1">Your Real Experience Commentary</label>
              <textarea
                rows={3}
                placeholder="How did the fabrics feel on your children/elders? Did the serums increase skin radiance?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-neutral-50/50 border border-pink-100 rounded-xl p-3 text-xs focus:outline-none focus:border-pink-brand text-gray-700"
                required
              />
            </div>

            <div className="flex gap-2 justify-end mt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-pink-brand to-peach-brand text-white text-xs font-bold rounded-full cursor-pointer shadow-xs"
              >
                Post Review
              </button>
            </div>
          </form>
        )}

        {/* Reviews Wall Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-white p-6 rounded-3xl border border-pink-150/40 shadow-xs relative flex flex-col justify-between hover:-translate-y-1 transition-transform"
            >
              {/* Quote bubble absolute */}
              <div className="absolute top-6 right-6 text-pink-200">
                <Quote className="w-8 h-8 opacity-45 rotate-180" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${rev.avatarColor}`}>
                    {rev.author.charAt(0)}
                  </div>
                  <div className="text-left">
                    <h4 className="font-display font-bold text-sm text-gray-800">{rev.author}</h4>
                    <span className="text-[10px] text-pink-500 font-bold bg-pink-50/80 px-2 py-0.5 rounded-full">{rev.role}</span>
                  </div>
                </div>

                {/* Rating stars */}
                <div className="flex text-amber-400 gap-0.5 mb-3.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-gray-200'}`} />
                  ))}
                </div>

                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-left italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="text-[10px] font-mono text-gray-400 text-left pt-2 border-t border-gray-100 flex justify-between">
                <span>Verified Client Opinion</span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
