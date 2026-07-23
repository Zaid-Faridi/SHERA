import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Results from "../common/Results";
import Tracker from '../common/Tracker';
import Resources from '../common/Resources';
import Home from '../common/Home';
import Onboarding from '../common/Onboarding';
import EarlyDetection from '../common/EarlyDetection';
import Doctors from '../common/Doctors';
import Community from '../common/Community';
import Contact from '../common/Contact';
import { calculateBMI, assessRisk } from '../../utils/healthUtils';
import MobileNav from '../common/MobileNav';
import Footer from '../common/Footer';

const SHEraApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [authFormData, setAuthFormData] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('shera_user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('shera_user');
    setCurrentUser(null);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    const endpoint = authMode === 'signup' 
      ? 'http://localhost:5001/api/users/register' 
      : 'http://localhost:5001/api/users/login';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authFormData)
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      localStorage.setItem('shera_user', JSON.stringify(data));
      setCurrentUser(data);
      setAuthOpen(false);
      setAuthFormData({ name: '', email: '', password: '' });
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };
  const [userData, setUserData] = useState({
    age: '',
    weight: '',
    height: '',
    cycleRegularity: '',
    symptoms: [],
    lifestyleFactors: []
  });
  const [riskAssessment, setRiskAssessment] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [cycleData, setCycleData] = useState({
    startDate: '',
    endDate: '',
    symptoms: [],
    mood: ''
  });

  const symptomOptions = [
    'Irregular periods',
    'Heavy bleeding',
    'Acne',
    'Weight gain',
    'Hair loss',
    'Excess hair growth',
    'Fatigue',
    'Mood swings',
    'Pelvic pain',
    'Headaches'
  ];

  const lifestyleOptions = [
    'Sedentary lifestyle',
    'High sugar diet',
    'Stressful job',
    'Irregular sleep',
    'Smoking',
    'Alcohol consumption',
    'Poor dietary habits'
  ];

  const generateRecommendations = (riskScore, data) => {
    const recommendations = [];

    if (data.symptoms?.includes('Irregular periods') || data.cycleRegularity === 'irregular') {
      recommendations.push({
        category: 'Cycle Health',
        text: 'Consider tracking your menstrual cycle more closely and consult with a healthcare provider about regulating your cycle.'
      });
    }

    const bmi = calculateBMI();
    if (bmi !== null && bmi >= 25) {
      recommendations.push({
        category: 'Weight Management',
        text: 'Aim for gradual weight loss through a balanced diet and regular exercise. Even 5-10% weight loss can significantly improve symptoms.'
      });
    }

    if (data.lifestyleFactors?.includes('Sedentary lifestyle')) {
      recommendations.push({
        category: 'Exercise',
        text: 'Incorporate at least 30 minutes of moderate exercise most days of the week. Walking, swimming, or yoga can be good starting points.'
      });
    }

    if (data.lifestyleFactors?.includes('High sugar diet') || data.lifestyleFactors?.includes('Poor dietary habits')) {
      recommendations.push({
        category: 'Nutrition',
        text: 'Focus on a balanced diet with plenty of fiber, lean proteins, and healthy fats. Limit processed foods and sugars.'
      });
    }

    if (data.symptoms?.includes('Mood swings') || data.lifestyleFactors?.includes('Stressful job')) {
      recommendations.push({
        category: 'Mental Health',
        text: 'Practice stress-reduction techniques like meditation, deep breathing, or mindfulness. Consider speaking with a mental health professional.'
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        category: 'General Health',
        text: 'Maintain your current healthy lifestyle with regular check-ups and continue monitoring any changes in your symptoms.'
      });
    }

    return recommendations;
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'theme-light' : ''} bg-dark text-soft-white`}>
      {/* Header */}
      <Header 
        setActiveTab={setActiveTab}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        onOpenLogin={() => { setAuthMode('login'); setAuthOpen(true); }}
        onOpenSignup={() => { setAuthMode('signup'); setAuthOpen(true); }}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Mobile Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content: add top padding to avoid overlap with sticky header */}
      <main className="mx-auto bg-dark pt-16">
        {activeTab === 'home' && (
          <Home 
            setActiveTab={setActiveTab}
            onOpenLogin={() => { setAuthMode('login'); setAuthOpen(true); }}
            onOpenSignup={() => { setAuthMode('signup'); setAuthOpen(true); }}
          />
        )}
        {activeTab === 'onboarding' && (
          <Onboarding 
            setActiveTab={setActiveTab} 
            setUserData={setUserData} 
            imageFile={imageFile}
            setImageFile={setImageFile}
            setRiskAssessment={setRiskAssessment}
          />
        )}
        {activeTab === 'early-detection' && (
          <EarlyDetection 
            userData={userData} 
            setActiveTab={setActiveTab} 
            imageFile={imageFile}
            setImageFile={setImageFile}
          />
        )}
        {activeTab === 'results' && <Results riskAssessment={riskAssessment} setActiveTab={setActiveTab} />}
        {activeTab === 'tracker' && (
          <Tracker
            cycleData={cycleData}
            setCycleData={setCycleData}
            symptoms={symptoms}
            setSymptoms={setSymptoms}
            symptomOptions={symptomOptions}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'resources' && <Resources setActiveTab={setActiveTab} />}
        {activeTab === 'doctors' && <Doctors setActiveTab={setActiveTab} />}
        {activeTab === 'community' && <Community setActiveTab={setActiveTab} />}
        {activeTab === 'contact' && <Contact setActiveTab={setActiveTab} />}
      </main>

      {/* Auth Modal */}
      {authOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
          <div className="aura-card w-full max-w-md bg-slate-800 border-teal-500/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h3>
              <button onClick={() => setAuthOpen(false)} className="text-slate-400 hover:text-white transition-colors text-xl font-bold">✕</button>
            </div>
            <div className="flex gap-2 mb-6 p-1 bg-slate-900/50 rounded-xl">
              <button onClick={() => { setAuthMode('login'); setAuthError(''); }} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${authMode==='login' ? 'bg-teal-500 text-white' : 'text-slate-400 hover:text-white'}`}>Log in</button>
              <button onClick={() => { setAuthMode('signup'); setAuthError(''); }} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${authMode==='signup' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'}`}>Sign up</button>
            </div>
            <form className="space-y-4" onSubmit={handleAuthSubmit}>
              {authError && <div className="text-red-500 text-sm bg-red-100/10 p-2 rounded">{authError}</div>}
              {authMode === 'signup' && (
                <div>
                  <input type="text" placeholder="Full name" className="w-full aura-input" value={authFormData.name} onChange={(e) => setAuthFormData({...authFormData, name: e.target.value})} required />
                </div>
              )}
              <div>
                <input type="email" placeholder="Email" className="w-full aura-input" value={authFormData.email} onChange={(e) => setAuthFormData({...authFormData, email: e.target.value})} required />
              </div>
              <div>
                <input type="password" placeholder="Password" className="w-full aura-input" value={authFormData.password} onChange={(e) => setAuthFormData({...authFormData, password: e.target.value})} required />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setAuthOpen(false)} className="px-5 py-2 text-sm font-bold text-slate-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" disabled={authLoading} className="aura-button py-2 px-6">{authLoading ? 'Please wait...' : (authMode==='signup' ? 'Create account' : 'Log in')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default SHEraApp;