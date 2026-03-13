import { useState, useEffect, useRef } from 'react';
import './css/Home.css';

const Home = () => {
  const [message, setMessage] = useState('');
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const statsRef = useRef(null);
  const statsAnimated = useRef(false);

  useEffect(() => {
      const baseUrl = import.meta.env.VITE_API_URL;

    fetch(`${baseUrl}/`)
      .then(r => r.json())
      .then(d => setMessage(d.message))
      .catch(e => console.error('Error fetching data:', e));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !statsAnimated.current) {
        statsAnimated.current = true;
        animateCount(setCount1, 0, 98, 1200);
        animateCount(setCount2, 0, 4200, 1400);
        animateCount(setCount3, 0, 120, 1000);
      }
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const animateCount = (setter, from, to, duration) => {
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setter(Math.floor(from + (to - from) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const features = [
    { icon: '◈', title: 'Intelligent Analytics', color: '#1a6fd4', bg: '#eef4ff', desc: 'Transform raw data into clear insights.' },
    { icon: '⬡', title: 'Seamless Integration', color: '#0ea47a', bg: '#edfaf5', desc: 'Connect existing tools in minutes.' },
    { icon: '◎', title: 'Enterprise Security', color: '#d4621a', bg: '#fff5ee', desc: 'Bank-grade encryption by default.' },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-left">
          <div className="hero-badge"><span className="hero-badge-dot" />Now live · Data Intelligence</div>
          <h1 className="hero-h1">Your data,<br /><em>brilliantly</em><br />organized.</h1>
          <p className="hero-sub">My Office gives your team <strong>real-time visibility</strong> into what matters.</p>
          <div className="hero-actions">
            <button className="btn-primary">Get Started Free →</button>
            <button className="btn-secondary">Watch Demo</button>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-visual">
            <div className="visual-header">
              <span className="visual-title">Performance</span>
              <span className="visual-pill">● Live</span>
            </div>
            <div className="chart-bars">
               {/* Simplified mapping for brevity */}
               {[55, 70, 60, 85, 75, 95, 88].map((h, i) => (
                 <div className="bar-wrap" key={i}>
                   <div className="bar" style={{ height: `${h}%`, background: '#1a6fd4' }} />
                 </div>
               ))}
            </div>
          </div>
          <div className="floating-tag tag-top"><span className="tag-text">Revenue up 24%</span></div>
          <div className="floating-tag tag-bot"><span className="tag-text">3x faster reporting</span></div>
        </div>
      </section>

      {message && (
        <div className="message-banner">
          <span className="message-dot" />
          <span>{message}</span>
        </div>
      )}

      <section className="stats-section" ref={statsRef}>
        <div className="stats-grid">
          <div className="stat-cell"><div className="stat-num">{count1}%</div><div className="stat-label">Satisfaction</div></div>
          <div className="stat-cell"><div className="stat-num">{count2}+</div><div className="stat-label">Data Points</div></div>
          <div className="stat-cell"><div className="stat-num">{count3}+</div><div className="stat-label">Clients</div></div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Everything you need to <em>work smarter</em></h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i} style={{'--card-color': f.color, '--card-bg': f.bg, animationDelay: `${0.1 * i}s`}}>
              <div className="feature-icon" style={{background: f.bg, color: f.color}}>{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-left">
          <h2 className="cta-title">Turn data into advantage.</h2>
          <p className="cta-sub">Join thousands of teams relying on My Office.</p>
        </div>
        <button className="btn-white">Start Free Trial →</button>
      </section>
    </div>
  );
};
// Comment: This page is mostly static content with some simple animations and a fetch call to display a message from the backend. The CSS handles the layout and styling, while the React component manages state for the animated stats and the fetched message.
export default Home;