
import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="grid" style={{ gap: '1.5rem' }}>
      <header className="landing1">
        <div className="content">
          <h1>Wholesale Gift Baskets</h1>
          <p>
            Delight clients and deepen relationships with beautifully curated gift baskets.
            Our wholesale program makes it simple to say “thank you”, welcome new homeowners,
            or surprise VIPs at scale.
          </p>
          <div className="row" style={{ justifyContent: 'center', gap: '1rem' }}>
            <Link className="btn" to="/register">Get Started</Link>
            <Link className="btn secondary" to="/login">I already have an account</Link>
          </div>
        </div>
      </header>

      <section className="grid grid-2">
        <div className="card">
          <h3>Why baskets?</h3>
          <p>
            They’re personal, memorable, and Instagrammable. From artisan snacks to seasonal
            favorites, every basket is hand-finished to impress.
          </p>
        </div>
        <div className="card">
          <h3>Perfect for business gifting</h3>
          <p>
            Contractors, real estate teams, law firms, and agencies use our baskets to create
            repeat business and referrals.
          </p>
        </div>
      </section>
    </div>
  );
}
