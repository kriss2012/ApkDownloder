import { useState, useEffect } from 'react';
import { Shield, MapPin, Smartphone, Church, Terminal, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Background3D from './components/Background3D';
import ApkCard from './components/ApkCard';
import Loader from './components/Loader';
import './index.css';

const APK_DATA = [
  {
    name: "FloodGuard AI",
    description: "A live flood detection system providing real-time monitoring and instant warning alerts to keep communities safe.",
    downloadUrl: "/FloodGuard AI.apk",
    icon: Shield
  },
  {
    name: "Krishna Travels Tracker",
    description: "Live travels location tracing application specifically designed for the Jalgaon to Pachora route.",
    downloadUrl: "/Krishna Travels Tracker.apk",
    icon: MapPin
  },
  {
    name: "Puja",
    description: "An online shopping platform dedicated to rituals and dharmic functions, providing all necessary spiritual items.",
    downloadUrl: "/Puja.apk",
    icon: Church
  },
  {
    name: "The Brothers",
    description: "An engaging game based on the dynamic stories and adventures of six brothers.",
    downloadUrl: "/The Brothers.apk",
    icon: Users
  },
  {
    name: "Tech☠️",
    description: "A captivating game centered around the unique bond and journey of a brother and sister.",
    downloadUrl: "/Tech☠️.apk",
    icon: Terminal
  },
  {
    name: "My Application",
    description: "A sleek music player featuring a premium Spotify-inspired UI for an immersive listening experience.",
    downloadUrl: "/My Application.apk",
    icon: Smartphone
  }
];

const DEVELOPER_INFO = {
  name: "Krishna Chandrakant Patil",
  username: "kriss2012",
  bio: "BCA 3rd Year | Innovator | Developer",
  photo: "https://github.com/kriss2012.png",
  github: "https://github.com/kriss2012",
  links: [
    { label: "Portfolio", url: "https://tgkrish-portfolio.netlify.app/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/krishna-patil-33969536b" }
  ]
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApk, setSelectedApk] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="app-container">
      <Loader isLoading={isLoading} />
      <Background3D />

      <AnimatePresence>
        {!isLoading && (
          <main className="overlay">
            <section className="hero">
              <div className="profile-section">
                <img src={DEVELOPER_INFO.photo} alt={DEVELOPER_INFO.name} className="profile-photo" />
                <div className="profile-info">
                  <h2>{DEVELOPER_INFO.name}</h2>
                  <p className="bio">{DEVELOPER_INFO.bio}</p>
                  <div className="social-links">
                    {DEVELOPER_INFO.links.map((link, i) => (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="social-link">
                        {link.label}
                      </a>
                    ))}
                    <a href={DEVELOPER_INFO.github} target="_blank" rel="noopener noreferrer" className="social-link github">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>

              <h1>Apex Deck</h1>
              <p className="hero-description">
                High-performance digital artifacts and tools.
              </p>
            </section>

            <section className="app-icon-grid">
              {APK_DATA.map((apk, index) => (
                <div
                  key={index}
                  className="app-icon-card glass-card"
                  onClick={() => setSelectedApk(apk)}
                >
                  <div className="icon-container-small">
                    <apk.icon size={32} />
                  </div>
                  <span className="app-name-small">{apk.name}</span>
                </div>
              ))}
            </section>
          </main>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedApk && (
          <div className="modal-overlay">
            <div
              className="modal-backdrop"
              onClick={() => setSelectedApk(null)}
            />
            <div className="modal-content-wrapper">
              <ApkCard
                {...selectedApk}
                onClose={() => setSelectedApk(null)}
                isModal={true}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
