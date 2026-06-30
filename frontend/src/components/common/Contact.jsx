import React from 'react';

const Contact = ({ setActiveTab }) => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="aura-card max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-teal-400 text-teal-400 mb-4">Contact Us</h2>
        <p className="text-soft-white mb-6">Have questions or feedback? Reach out and we’ll get back to you.</p>

        <form className="space-y-4">
          <input type="text" placeholder="Full name" className="aura-input w-full" />
          <input type="email" placeholder="Email" className="aura-input w-full" />
          <textarea placeholder="Your message" className="aura-input w-full h-28" />
          <div className="flex justify-end gap-2">
            <button type="button" className="aura-button" onClick={() => setActiveTab('home')}>Cancel</button>
            <button type="submit" className="aura-button aura-button">Send</button>
          </div>
        </form>

        <div className="mt-6 text-sm text-gray-400">
          <p>Email: support@pcosguardian.example</p>
          <p className="mt-1">Community: Join discussions under the Community tab.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;