// LandingPage.jsx
import './LandingPage.css';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import image from './assets/pngegg2.png';
import { FaUserMd, FaHospital, FaAward, FaHeartbeat } from 'react-icons/fa';
import CountUp from 'react-countup';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-container">
      <header className="landing-header" data-aos="fade-down">
        <img src={image} alt="Medical Logo" className="landing-logo" />
        <h1>DoctorNow</h1>
        <p>Your trusted healthcare appointment platform</p>
      </header>

      <main className="landing-main">
        <section className="landing-features">
          <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
            <h3>Find Specialists</h3>
            <p>Browse through our network of qualified healthcare professionals</p>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
            <h3>Easy Booking</h3>
            <p>Schedule appointments in just a few clicks</p>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
            <h3>Manage Visits</h3>
            <p>Keep track of all your medical appointments in one place</p>
          </div>
        </section>

        <section className="about-section">
          <h2 data-aos="fade-up">Why Choose DoctorNow?</h2>
          <div className="about-grid">
            <div className="about-card" data-aos="zoom-in" data-aos-delay="100">
              <FaUserMd />
              <h3>Expert Doctors</h3>
              <p>Access to a network of qualified and experienced healthcare professionals</p>
            </div>
            <div className="about-card" data-aos="zoom-in" data-aos-delay="200">
              <FaHospital />
              <h3>Top Facilities</h3>
              <p>Partner with leading hospitals and medical centers</p>
            </div>
            <div className="about-card" data-aos="zoom-in" data-aos-delay="300">
              <FaAward />
              <h3>Quality Care</h3>
              <p>Highest standards of healthcare service and patient satisfaction</p>
            </div>
            <div className="about-card" data-aos="zoom-in" data-aos-delay="400">
              <FaHeartbeat />
              <h3>Patient First</h3>
              <p>Focused on providing the best possible patient experience</p>
            </div>
          </div>
        </section>

        <section className="stats-section" ref={statsRef} data-aos="fade-up">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">
                {isStatsVisible && <CountUp end={10000} duration={2.5} separator="," />}
                {!isStatsVisible && '0'}+
              </div>
              <p>Patients Served</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {isStatsVisible && <CountUp end={500} duration={2} />}
                {!isStatsVisible && '0'}+
              </div>
              <p>Qualified Doctors</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {isStatsVisible && <CountUp end={50} duration={1.5} />}
                {!isStatsVisible && '0'}+
              </div>
              <p>Medical Specialties</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {isStatsVisible && <CountUp end={98} duration={2} suffix="%" />}
                {!isStatsVisible && '0%'}
              </div>
              <p>Patient Satisfaction</p>
            </div>
          </div>
        </section>

        <section className="landing-cta" data-aos="fade-up">
          <h2>Ready to take control of your healthcare?</h2>
          <div className="cta-buttons">
            <button
              className="cta-button primary"
              onClick={() => navigate('/register')}
            >
              Get Started
            </button>
            <button
              className="cta-button secondary"
              onClick={() => navigate('/login')}
            >
              I already have an account
            </button>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>© 2025 DoctorNow. All rights reserved.</p>
        <p>Providing quality healthcare solutions for a better tomorrow</p>
      </footer>
    </div>
  );
}
