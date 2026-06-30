import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ────────────────────────────────────────────────────────────
   INLINE SVG ICON SYSTEM (no external dependency needed)
   ──────────────────────────────────────────────────────────── */
const Icon = ({ name, size = 18, color = 'currentColor', style = {} }) => {
  const paths = {
    search: <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></>,
    x: <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>,
    chevronDown: <path d="m6 9 6 6 6-6"/>,
    chevronUp: <path d="m18 15-6-6-6 6"/>,
    chevronRight: <path d="m9 18 6-6-6-6"/>,
    bookmark: <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
    share: <><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    sparkles: <><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></>,
    brain: <><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></>,
    leaf: <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>,
    activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
    moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></>,
    volume: <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    bot: <><rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></>,
    stethoscope: <><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    arrowRight: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    check: <polyline points="20 6 9 11 4 16"/>,
    info: <><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></>,
    warning: <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></>,
    apple: <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/>,
    droplets: <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/>,
    flame: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>,
    dna: <><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="m17 6-2.5-2.5"/><path d="m14 8-1-1"/><path d="m7 18 2.5 2.5"/><path d="m3.5 14.5.5.5"/><path d="m20 9 .5.5"/><path d="m6.5 12.5 1 1"/><path d="m16.5 10.5 1 1"/><path d="m10 16 1.5 1.5"/></>,
    pill: <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>,
    baby: <><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/></>,
    scale: <><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></>,
    notepad: <><path d="M8 2v4"/><path d="M12 2v4"/><path d="M16 2v4"/><rect width="16" height="18" x="4" y="4" rx="2"/><path d="M8 10h6"/><path d="M8 14h8"/><path d="M8 18h5"/></>,
    bookOpen: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    feather: <><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></>,
    wind: <><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></>,
    repeat: <><path d="m17 2 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></>,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      {paths[name] || null}
    </svg>
  );
};

/* ────────────────────────────────────────────────────────────
   RESOURCE DATA
   ──────────────────────────────────────────────────────────── */
const RESOURCES = [
  {
    id: 1,
    title: 'Understanding PCOS',
    subtitle: 'A Complete Medical Overview',
    category: 'Symptoms',
    icon: 'dna',
    emoji: '🧬',
    readTime: '8 min read',
    difficulty: 'Beginner',
    gradient: 'linear-gradient(135deg,#FB7185,#EC4899)',
    cardBg: 'linear-gradient(145deg,rgba(251,113,133,0.08),rgba(236,72,153,0.04))',
    accent: '#E11D48',
    lastUpdated: 'June 2025',
    description: 'A clear overview of PCOS/PCOD, common symptoms, and evidence-based lifestyle strategies.',
    content: {
      overview: 'PCOS (Polycystic Ovary Syndrome) is a common hormonal disorder affecting 1 in 10 women of reproductive age. It is characterized by irregular menstrual periods, elevated androgen levels, and polycystic ovaries on ultrasound. The exact cause is still being researched, but genetic and environmental factors both play roles. Early detection and consistent management can significantly improve quality of life.',
      symptoms: ['Irregular or absent periods','Heavy or prolonged bleeding','Acne (face, chest, back)','Unwanted facial/body hair (hirsutism)','Hair thinning or loss on scalp','Weight gain or difficulty losing weight','Darkened skin patches','Skin tags','Mood swings & depression','Pelvic pain','Fatigue','Sleep disturbances'],
      causes: ['Insulin resistance (affects ~70% of women with PCOS)','Elevated androgen (male hormone) levels','Low-grade inflammation','Hereditary/genetic factors','Lifestyle factors (poor diet, inactivity)'],
      diagnosis: ['Medical history review','Physical examination','Blood tests: testosterone, LH, FSH, insulin, glucose, thyroid','Pelvic ultrasound to check ovaries','Rotterdam criteria: 2 of 3 must be present (irregular periods, elevated androgens, polycystic ovaries)'],
      treatment: ['Lifestyle modifications — often the first-line approach','Hormonal birth control to regulate periods','Metformin to improve insulin sensitivity','Anti-androgen medications','Clomiphene or letrozole for ovulation induction','Surgical option (laparoscopic ovarian drilling) in rare cases'],
      faq: [
        { q: 'What exactly causes PCOS?', a: 'The exact cause is unknown, but insulin resistance, excess androgens, and low-grade inflammation all contribute. Genetics also play a significant role.' },
        { q: 'Can PCOS be cured?', a: 'There is no cure, but symptoms can be effectively managed through lifestyle changes, medication, and ongoing monitoring.' },
        { q: 'Can I get pregnant with PCOS?', a: 'Yes! Many women with PCOS conceive naturally or with assistance. Ovulation induction medications are very effective.' },
        { q: 'Does PCOS go away after menopause?', a: 'Some symptoms like irregular periods resolve, but metabolic risks (diabetes, heart disease) remain, requiring continued management.' },
        { q: 'Can teenagers have PCOS?', a: 'Yes, PCOS can develop during puberty. Diagnosis in teens requires special care as irregular periods are normal in early adolescence.' },
      ]
    }
  },
  {
    id: 2,
    title: 'Nutrition Basics for PCOS',
    subtitle: 'Anti-Inflammatory Eating Guide',
    category: 'Nutrition',
    icon: 'leaf',
    emoji: '🥗',
    readTime: '6 min read',
    difficulty: 'Beginner',
    gradient: 'linear-gradient(135deg,#34D399,#059669)',
    cardBg: 'linear-gradient(145deg,rgba(52,211,153,0.08),rgba(5,150,105,0.04))',
    accent: '#059669',
    lastUpdated: 'May 2025',
    description: 'Practical tips for blood sugar balance, fiber intake, and anti-inflammatory foods that support hormonal health.',
    content: {
      overview: 'Nutrition is one of the most powerful tools for managing PCOS. A well-designed eating plan can help reduce insulin resistance, balance hormones, manage weight, and reduce inflammation. The goal is not restriction — it\'s nourishment.',
      symptoms: ['Blood sugar spikes','Insulin resistance','Chronic inflammation','Hormonal imbalance','Weight management challenges'],
      causes: ['High glycemic index foods','Ultra-processed foods','Refined carbohydrates','Excessive sugar intake','Inadequate fiber intake'],
      diagnosis: ['Foods that HELP: whole grains, lean proteins, healthy fats, fiber-rich vegetables','Foods to LIMIT: white bread, sugary drinks, fried foods, processed snacks','Meal timing: 3 balanced meals + 1-2 snacks, avoid skipping breakfast'],
      treatment: ['Mediterranean-style diet is strongly evidence-backed','Low-GI foods help stabilize blood sugar','Adequate protein at every meal (25-30g)','Healthy fats: avocado, nuts, olive oil, salmon','Magnesium-rich foods for insulin sensitivity','Inositol supplements may help (consult doctor)'],
      faq: [
        { q: 'Should I go low-carb?', a: 'Not necessarily. Focus on complex, high-fiber carbs rather than eliminating carbs entirely. Balance is key.' },
        { q: 'Is dairy bad for PCOS?', a: 'Evidence is mixed. Some women benefit from reducing dairy; others don\'t. Track your symptoms after dairy consumption.' },
        { q: 'What is the best diet for PCOS?', a: 'The Mediterranean diet has the strongest evidence base. It emphasizes whole foods, healthy fats, lean proteins, and vegetables.' },
        { q: 'How does sugar affect PCOS?', a: 'Excess sugar worsens insulin resistance, which can raise androgen levels and worsen PCOS symptoms significantly.' },
        { q: 'Can supplements help?', a: 'Inositol, Vitamin D, magnesium, and Omega-3s have shown benefit in research. Always consult your doctor first.' },
      ]
    }
  },
  {
    id: 3,
    title: 'Exercise Guide for PCOS',
    subtitle: 'Movement as Medicine',
    category: 'Exercise',
    icon: 'activity',
    emoji: '🏃',
    readTime: '5 min read',
    difficulty: 'Intermediate',
    gradient: 'linear-gradient(135deg,#60A5FA,#3B82F6)',
    cardBg: 'linear-gradient(145deg,rgba(96,165,250,0.08),rgba(59,130,246,0.04))',
    accent: '#2563EB',
    lastUpdated: 'June 2025',
    description: 'Evidence-based exercise recommendations to improve insulin sensitivity, hormone balance, and mental wellbeing.',
    content: {
      overview: 'Regular physical activity is one of the most evidence-based interventions for PCOS management. Exercise improves insulin sensitivity, supports healthy weight, reduces androgen levels, boosts mood, and decreases cardiovascular risk — all critical for PCOS management.',
      symptoms: ['Insulin resistance improves with exercise','Androgen levels reduce with regular activity','Mental health benefits are significant','Weight management is more effective with exercise'],
      causes: ['Sedentary lifestyle worsens PCOS','Inactivity increases insulin resistance','Lack of exercise worsens inflammation'],
      diagnosis: ['Cardio 150 min/week moderate intensity','Strength training 2-3x per week','Yoga 2-3x per week for stress and flexibility','HIIT 1-2x per week (if tolerated)','Walking is an excellent starting point'],
      treatment: ['Start slow, build gradually','Walking: 30 min daily is powerful','Strength training: builds muscle, improves insulin use','Yoga: reduces cortisol, improves hormonal balance','Swimming: joint-friendly, full-body workout','Cycling: excellent cardio with low impact'],
      faq: [
        { q: 'Can exercise worsen PCOS?', a: 'Over-exercising can raise cortisol and worsen hormones. Moderate, consistent exercise is best — avoid extreme regimens.' },
        { q: 'How much exercise is enough?', a: 'Aim for 150 minutes moderate cardio + 2-3 sessions of strength training weekly. Consistency matters more than intensity.' },
        { q: 'Is yoga good for PCOS?', a: 'Yes! Yoga reduces cortisol, improves insulin sensitivity, and supports mental health — all beneficial for PCOS management.' },
        { q: 'What if I\'m too tired to exercise?', a: 'Start with 10-minute walks. The fatigue often improves once you become more active. Prioritize sleep and nutrition too.' },
        { q: 'Does exercise help with fertility?', a: 'Yes — exercise improves ovulation frequency and quality in women with PCOS who are trying to conceive.' },
      ]
    }
  },
  {
    id: 4,
    title: 'Mental Wellness & PCOS',
    subtitle: 'Mind-Body Connection',
    category: 'Mental Health',
    icon: 'brain',
    emoji: '🧠',
    readTime: '7 min read',
    difficulty: 'Beginner',
    gradient: 'linear-gradient(135deg,#A78BFA,#7C3AED)',
    cardBg: 'linear-gradient(145deg,rgba(167,139,250,0.08),rgba(124,58,237,0.04))',
    accent: '#7C3AED',
    lastUpdated: 'June 2025',
    description: 'Stress management, mood support, and mental health strategies specifically for women with PCOS.',
    content: {
      overview: 'The mental health impact of PCOS is significant and often underestimated. Women with PCOS have a higher prevalence of depression, anxiety, and body image concerns. The hormonal imbalances directly affect neurotransmitters, and the chronic nature of the condition adds psychological burden. Mental health support is not optional — it\'s essential.',
      symptoms: ['Depression (2-3x higher prevalence)','Anxiety and panic attacks','Body dysmorphia','Low self-esteem from symptoms','Social withdrawal','Sleep disorders','Emotional eating','Mood swings from hormonal fluctuations'],
      causes: ['Hormonal imbalances affect mood-regulating neurotransmitters','Chronic condition burden','Visible symptoms affect self-image','Fertility concerns cause anxiety','Social stigma around "female hormonal issues"'],
      diagnosis: ['Mindfulness meditation (10 min/day)','Deep breathing exercises (4-7-8 technique)','Journaling for emotional processing','Cognitive Behavioral Therapy (CBT)','Support groups for PCOS','Adequate sleep (7-9 hours)','Social connection and open communication'],
      treatment: ['Therapy: CBT has strong evidence for PCOS-related depression','Medication: sometimes necessary, discuss with doctor','Exercise: natural antidepressant effect','Mindfulness apps: Headspace, Calm','Community support: online PCOS groups','Self-compassion practices','Limit social media that worsens body image'],
      faq: [
        { q: 'Does PCOS cause depression?', a: 'PCOS is strongly associated with higher rates of depression and anxiety, likely due to hormonal factors and the burden of managing a chronic condition.' },
        { q: 'Can managing PCOS improve mental health?', a: 'Yes — as physical symptoms improve with treatment, mental health often follows. An integrated approach is most effective.' },
        { q: 'Should I see a therapist?', a: 'If you\'re experiencing persistent low mood, anxiety, or body image struggles, therapy — especially CBT — can be very helpful.' },
        { q: 'Does stress worsen PCOS?', a: 'Yes. Chronic stress raises cortisol, which worsens insulin resistance and androgen levels, creating a cycle that worsens PCOS.' },
        { q: 'Are there PCOS-specific support groups?', a: 'Yes! PCOS Awareness Association, Soul Cysters, and online Reddit communities provide valuable peer support and shared experiences.' },
      ]
    }
  },
  {
    id: 5,
    title: 'Hormone Balance',
    subtitle: 'Understanding Your Endocrine System',
    category: 'Hormones',
    icon: 'zap',
    emoji: '🌸',
    readTime: '9 min read',
    difficulty: 'Advanced',
    gradient: 'linear-gradient(135deg,#F472B6,#DB2777)',
    cardBg: 'linear-gradient(145deg,rgba(244,114,182,0.08),rgba(219,39,119,0.04))',
    accent: '#DB2777',
    lastUpdated: 'May 2025',
    description: 'Deep dive into the hormones involved in PCOS — insulin, androgens, LH, FSH and how to support balance naturally.',
    content: {
      overview: 'PCOS is fundamentally a hormonal disorder. Multiple hormones are out of balance: insulin is elevated, LH is typically higher than FSH, androgens (testosterone, DHEA-S) are elevated, and progesterone may be low. Understanding these hormones helps you understand why certain treatments and lifestyle changes work.',
      symptoms: ['Elevated testosterone causes acne, hirsutism, hair loss','Insulin resistance leads to weight gain, fatigue','High LH:FSH ratio disrupts ovulation','Low progesterone causes irregular periods','Elevated prolactin can cause galactorrhea','Thyroid dysfunction (common co-occurrence)'],
      causes: ['Insulin resistance → hyperinsulinemia → ovarian androgen production','LH excess → theca cell stimulation → androgen excess','Chronic anovulation → progesterone deficiency → estrogen dominance'],
      diagnosis: ['Blood tests to check: FSH, LH, total & free testosterone, DHEA-S, insulin, glucose, thyroid panel','Track: basal body temperature, cervical mucus, LH surge (OPKs)','Symptoms diary for hormonal pattern recognition'],
      treatment: ['Inositol (myo-inositol + D-chiro-inositol) for insulin and LH','Spearmint tea may reduce androgens','Zinc for testosterone regulation','Vitamin D for insulin sensitivity','Adaptogenic herbs (Ashwagandha for cortisol)','Avoid endocrine disruptors (BPA, parabens, phthalates)'],
      faq: [
        { q: 'What hormones are elevated in PCOS?', a: 'Typically: testosterone, LH, insulin, and sometimes DHEA-S and prolactin. FSH is usually normal or low relative to LH.' },
        { q: 'Can I balance hormones naturally?', a: 'Diet, exercise, stress management, and certain supplements can meaningfully support hormonal balance. Medication may still be needed.' },
        { q: 'How long does hormone balancing take?', a: 'Lifestyle changes typically show effects in 3-6 months. Medication can show effects faster, within weeks to months.' },
        { q: 'Does birth control balance hormones?', a: 'Hormonal birth control regulates periods and reduces androgen effects but doesn\'t treat the underlying hormonal dysfunction.' },
        { q: 'What is endocrine disruption?', a: 'Chemicals (in plastics, cosmetics, pesticides) can mimic or block hormones. Minimizing exposure supports hormonal health.' },
      ]
    }
  },
  {
    id: 6,
    title: 'Weight Management',
    subtitle: 'Beyond Calories In, Calories Out',
    category: 'Weight',
    icon: 'scale',
    emoji: '⚖️',
    readTime: '6 min read',
    difficulty: 'Intermediate',
    gradient: 'linear-gradient(135deg,#FB923C,#EA580C)',
    cardBg: 'linear-gradient(145deg,rgba(251,146,60,0.08),rgba(234,88,12,0.04))',
    accent: '#EA580C',
    lastUpdated: 'June 2025',
    description: 'Why weight is different with PCOS, and compassionate, evidence-based strategies that actually work.',
    content: {
      overview: 'Weight management with PCOS is genuinely harder than without it. Insulin resistance makes it easier to store fat and harder to burn it. High androgens affect fat distribution. This is not a willpower issue — it\'s a metabolic challenge. The good news: even 5-10% weight loss (if overweight) significantly improves symptoms.',
      symptoms: ['Difficulty losing weight despite effort','Central obesity (belly fat accumulation)','Slow metabolism','Emotional eating from hormonal mood changes','Cycles of weight gain/loss'],
      causes: ['Insulin resistance → chronic hyperinsulinemia → fat storage','High androgens → central fat distribution','Metabolic rate often lower in PCOS','Hormonal hunger signals (ghrelin/leptin dysregulation)','Emotional eating from mood and cortisol'],
      diagnosis: ['Anti-inflammatory, low-GI eating plan','Regular cardio + strength training','Adequate protein (reduces hunger, preserves muscle)','Sleep prioritization (poor sleep worsens insulin resistance)','Stress management (cortisol drives fat storage)','Medical support: Metformin, GLP-1 agonists if indicated'],
      treatment: ['Focus on health metrics, not scale (energy, periods, mood, labs)','5-10% weight loss → significant symptom improvement','Intuitive eating principles to break diet cycling','Track with apps but avoid obsession','Medical intervention is valid and may be necessary','Avoid extreme restriction — it backfires with hormones'],
      faq: [
        { q: 'Why is it so hard to lose weight with PCOS?', a: 'Insulin resistance, hormonal disruption, and a potentially slower metabolic rate all make weight management more challenging with PCOS.' },
        { q: 'Does losing weight cure PCOS?', a: 'Weight loss can significantly improve symptoms and even restore ovulation, but PCOS is a genetic condition and doesn\'t disappear with weight loss.' },
        { q: 'What is the best diet for weight loss with PCOS?', a: 'Mediterranean or low-GI diets have the best evidence. Avoid extreme low-calorie diets which can worsen hormonal imbalances.' },
        { q: 'Do I need to lose weight to manage PCOS?', a: 'Not necessarily. Many women manage PCOS symptoms effectively at any weight through lifestyle changes, regardless of scale numbers.' },
        { q: 'Can medication help with PCOS weight loss?', a: 'Yes — Metformin and GLP-1 receptor agonists (like semaglutide) can significantly help with weight management in PCOS.' },
      ]
    }
  },
  {
    id: 7,
    title: 'Fertility & Pregnancy',
    subtitle: 'Pathways to Parenthood with PCOS',
    category: 'Pregnancy',
    icon: 'baby',
    emoji: '👶',
    readTime: '8 min read',
    difficulty: 'Intermediate',
    gradient: 'linear-gradient(135deg,#F9A8D4,#EC4899)',
    cardBg: 'linear-gradient(145deg,rgba(249,168,212,0.10),rgba(236,72,153,0.04))',
    accent: '#BE185D',
    lastUpdated: 'May 2025',
    description: 'Understanding PCOS and fertility, treatment options, and how to have a healthy pregnancy with PCOS.',
    content: {
      overview: 'PCOS is the most common cause of anovulatory infertility — but this does not mean you cannot become pregnant. The majority of women with PCOS can conceive with appropriate medical support. Understanding your options and working with a reproductive endocrinologist gives you the best chance of success.',
      symptoms: ['Irregular or absent ovulation','Irregular periods (making timing difficult)','Higher miscarriage risk (being researched)','Gestational diabetes risk if pregnant','Pregnancy complications are manageable with monitoring'],
      causes: ['Anovulation (not releasing eggs regularly) due to LH/FSH imbalance','Hormonal environment affects egg quality','Uterine lining may be suboptimal from irregular cycles'],
      diagnosis: ['Ovulation tracking: BBT, LH strips, ultrasound monitoring','Lifestyle optimization before trying to conceive','Letrozole: first-line ovulation induction (better than Clomid for PCOS)','Clomiphene (Clomid): effective, second-line option','Gonadotropin injections: if oral medications fail','IUI (Intrauterine Insemination)','IVF with careful ovarian stimulation (OHSS risk)'],
      treatment: ['Prenatal vitamins with folate: start 3 months before trying','Weight optimization: even small changes improve ovulation','Metformin may improve ovulation and reduce miscarriage risk','Monitor blood sugar throughout pregnancy','Regular prenatal check-ups with specialist awareness of PCOS risks','Gestational diabetes screening: earlier and more frequent'],
      faq: [
        { q: 'Can I get pregnant naturally with PCOS?', a: 'Many women with PCOS do conceive naturally, especially if cycles are only mildly irregular. Others need ovulation induction assistance.' },
        { q: 'What is the best fertility treatment for PCOS?', a: 'Letrozole is currently considered first-line for ovulation induction in PCOS. It has better outcomes and lower multiple pregnancy risk than Clomid.' },
        { q: 'Does PCOS cause miscarriage?', a: 'Some research suggests a slightly higher miscarriage rate, possibly linked to insulin resistance or LH levels. Metformin may help reduce this risk.' },
        { q: 'Is pregnancy safe with PCOS?', a: 'Yes, with appropriate monitoring. There is a higher risk of gestational diabetes and preeclampsia, managed with careful prenatal care.' },
        { q: 'When should I see a fertility specialist?', a: 'If under 35: after 12 months of trying. If over 35: after 6 months. With PCOS specifically, consider consulting a reproductive endocrinologist earlier.' },
      ]
    }
  },
  {
    id: 8,
    title: 'Sleep & Recovery',
    subtitle: 'The Underrated Hormone Regulator',
    category: 'Lifestyle',
    icon: 'moon',
    emoji: '😴',
    readTime: '5 min read',
    difficulty: 'Beginner',
    gradient: 'linear-gradient(135deg,#818CF8,#4F46E5)',
    cardBg: 'linear-gradient(145deg,rgba(129,140,248,0.08),rgba(79,70,229,0.04))',
    accent: '#4F46E5',
    lastUpdated: 'June 2025',
    description: 'How poor sleep worsens PCOS and practical sleep hygiene strategies for hormonal recovery.',
    content: {
      overview: 'Sleep is a critical but often overlooked component of PCOS management. Poor sleep directly worsens insulin resistance, raises cortisol, disrupts reproductive hormones, increases inflammation, and leads to weight gain. Sleep apnea (a sleeping disorder) is also significantly more common in women with PCOS.',
      symptoms: ['Fatigue even after adequate sleep','Difficulty falling asleep','Waking frequently at night','Sleep apnea symptoms (snoring, gasping)','Daytime sleepiness','Mood worsening from poor sleep'],
      causes: ['Sleep apnea (3x more common in PCOS than general population)','Cortisol dysregulation disrupts sleep architecture','Anxiety and racing thoughts at bedtime','Night sweats from hormonal fluctuations','Shift work or irregular schedules'],
      diagnosis: ['Sleep study if sleep apnea suspected','Sleep diary for 2 weeks','Track: sleep time, quality, daytime function','CBT-I (Cognitive Behavioral Therapy for Insomnia) if chronic'],
      treatment: ['Consistent sleep schedule — same time every day including weekends','Dark, cool room (18-19°C ideal)','Screen-free 60 min before bed','Limit caffeine after 2pm','Magnesium glycinate before bed','CBT-I therapy for chronic insomnia','Treat sleep apnea if present (CPAP if needed)','Relaxation routine: bath, reading, gentle stretching'],
      faq: [
        { q: 'How does sleep affect PCOS?', a: 'Poor sleep raises cortisol, worsens insulin resistance, elevates androgens, and increases inflammation — all of which worsen PCOS.' },
        { q: 'Do women with PCOS have sleep problems?', a: 'Yes — sleep disturbances, insomnia, and sleep apnea are significantly more common in PCOS than in the general population.' },
        { q: 'How much sleep do I need with PCOS?', a: '7-9 hours is the evidence-based recommendation. Quality matters as much as quantity — deep, uninterrupted sleep is most restorative.' },
        { q: 'What is sleep apnea and does PCOS cause it?', a: 'Sleep apnea is interrupted breathing during sleep. Women with PCOS have 3x higher risk, likely from androgen effects on the airway.' },
        { q: 'Can melatonin help with PCOS?', a: 'Melatonin has anti-androgen properties and may improve sleep quality. Low doses (0.5-3mg) are generally considered safe short-term.' },
      ]
    }
  },
  {
    id: 9,
    title: 'Anti-Inflammatory Diet',
    subtitle: 'Eating to Reduce Systemic Inflammation',
    category: 'Nutrition',
    icon: 'flame',
    emoji: '🥬',
    readTime: '7 min read',
    difficulty: 'Intermediate',
    gradient: 'linear-gradient(135deg,#6EE7B7,#10B981)',
    cardBg: 'linear-gradient(145deg,rgba(110,231,183,0.08),rgba(16,185,129,0.04))',
    accent: '#059669',
    lastUpdated: 'June 2025',
    description: 'Targeting chronic low-grade inflammation — the hidden driver of PCOS severity.',
    content: {
      overview: 'Chronic low-grade inflammation is now recognized as a central feature of PCOS, not just a consequence of it. It drives androgen production, worsens insulin resistance, and contributes to metabolic complications. An anti-inflammatory diet is one of the most powerful non-pharmaceutical interventions available.',
      symptoms: ['Elevated inflammatory markers (CRP, IL-6)','Joint pain or stiffness','Skin conditions (eczema, psoriasis)','Gut issues (bloating, IBS)','Brain fog','Chronic fatigue'],
      causes: ['Ultra-processed food consumption','Refined carbohydrates and sugar','Omega-6 to Omega-3 imbalance','Environmental toxin exposure','Poor gut microbiome diversity','Chronic stress','Insufficient sleep'],
      diagnosis: ['Anti-inflammatory foods to prioritize:','Fatty fish (salmon, sardines, mackerel)','Colorful vegetables (berries, leafy greens)','Nuts and seeds (walnuts, flaxseed)','Olive oil (extra virgin)','Turmeric and ginger','Green tea','Legumes (beans, lentils)'],
      treatment: ['Start with the Mediterranean diet framework','Increase Omega-3 intake (fish 2-3x/week or supplement)','Add turmeric to cooking daily','Eliminate one processed food category at a time','Cultivate gut health: fermented foods, fiber','Track inflammatory symptoms alongside diet changes'],
      faq: [
        { q: 'How quickly does an anti-inflammatory diet work?', a: 'Measurable changes in inflammatory markers can appear within 4-8 weeks. Symptom improvements may be noticed within 2-4 weeks.' },
        { q: 'Is gluten inflammatory for PCOS?', a: 'Not universally. If you suspect gluten sensitivity (distinct from celiac disease), an elimination trial under guidance may be worth considering.' },
        { q: 'Are there anti-inflammatory supplements?', a: 'Omega-3 fish oil, curcumin, and vitamin D have strong anti-inflammatory evidence. Quality and dose matter — consult your doctor.' },
        { q: 'Can gut health affect PCOS?', a: 'Emerging research shows gut microbiome diversity influences PCOS severity through inflammation and estrogen metabolism pathways.' },
        { q: 'Is coffee inflammatory?', a: 'Coffee is actually anti-inflammatory due to polyphenols, but excessive caffeine can raise cortisol. 1-2 cups/day is generally fine.' },
      ]
    }
  },
  {
    id: 10,
    title: 'Treatment Options',
    subtitle: 'Medical & Integrative Approaches',
    category: 'Symptoms',
    icon: 'pill',
    emoji: '💊',
    readTime: '10 min read',
    difficulty: 'Advanced',
    gradient: 'linear-gradient(135deg,#FCA5A5,#EF4444)',
    cardBg: 'linear-gradient(145deg,rgba(252,165,165,0.08),rgba(239,68,68,0.04))',
    accent: '#DC2626',
    lastUpdated: 'June 2025',
    description: 'A comprehensive overview of pharmaceutical, lifestyle, and integrative treatment options for PCOS.',
    content: {
      overview: 'PCOS treatment is highly individualized — what works for one person may not work for another. Treatment targets specific symptoms and long-term health risks. An integrative approach combining lifestyle modification with targeted medical therapies is most effective for most women.',
      symptoms: ['Irregular periods: addressed with hormonal therapies','Acne/hirsutism: anti-androgens, topical treatments','Infertility: ovulation induction','Insulin resistance: Metformin, lifestyle','Weight: comprehensive metabolic approach','Mental health: therapy, medication if needed'],
      causes: ['No single treatment addresses all aspects of PCOS','Treatment should be personalized to symptom priorities','Long-term adherence is more important than perfection'],
      diagnosis: ['PHARMACEUTICAL:','Oral contraceptives (regulate periods, reduce androgens)','Metformin (insulin sensitizer)','Letrozole / Clomid (ovulation induction)','Spironolactone (anti-androgen for hair/acne)','Eflornithine cream (facial hair)','GLP-1 agonists (weight, insulin)'],
      treatment: ['INTEGRATIVE:','Myo-inositol + D-chiro-inositol (4:1 ratio studied extensively)','N-acetyl cysteine (NAC) — comparable to Metformin in some studies','Vitamin D supplementation','Omega-3 fatty acids','Berberine (natural insulin sensitizer)','Acupuncture (emerging evidence for ovulation support)'],
      faq: [
        { q: 'Do I need medication for PCOS?', a: 'Not always. Many women manage PCOS effectively with lifestyle changes. Medication is recommended when lifestyle alone is insufficient or symptoms are significantly impacting quality of life.' },
        { q: 'Is Metformin safe?', a: 'Yes, Metformin has a strong safety record over decades of use. It may cause GI side effects initially, which usually resolve. Extended-release formulations are better tolerated.' },
        { q: 'Can I take the birth control pill for PCOS?', a: 'Combined oral contraceptives are commonly prescribed for PCOS to regulate periods and reduce androgen effects. They don\'t treat the underlying cause but manage symptoms.' },
        { q: 'Are natural supplements effective?', a: 'Myo-inositol and NAC have the strongest research bases among supplements. Always discuss supplements with your doctor as they can interact with medications.' },
        { q: 'When should I consider surgery?', a: 'Laparoscopic ovarian drilling is rarely used now, mainly when other ovulation induction methods have failed. Discuss all options with your specialist.' },
      ]
    }
  },
  {
    id: 11,
    title: 'Diagnosis Process',
    subtitle: 'From Suspicion to Confirmed Diagnosis',
    category: 'Symptoms',
    icon: 'stethoscope',
    emoji: '🩺',
    readTime: '6 min read',
    difficulty: 'Beginner',
    gradient: 'linear-gradient(135deg,#93C5FD,#2563EB)',
    cardBg: 'linear-gradient(145deg,rgba(147,197,253,0.08),rgba(37,99,235,0.04))',
    accent: '#1D4ED8',
    lastUpdated: 'June 2025',
    description: 'Step-by-step guide to getting a PCOS diagnosis — what to expect, what tests are done, and how to advocate for yourself.',
    content: {
      overview: 'Getting a PCOS diagnosis can take years — on average, women see 3-4 doctors over 2-3 years before receiving a correct diagnosis. Knowing what to expect and how to advocate for yourself can significantly shorten this journey and get you the care you need.',
      symptoms: ['Irregular periods (fewer than 8/year or longer than 35 days)','Clinical/biochemical signs of excess androgens','Polycystic ovarian morphology on ultrasound'],
      causes: ['Rotterdam Criteria (2004) requires 2 of 3 above criteria','Many women are diagnosed without polycystic ovaries','Diagnosis in adolescents requires persistence of symptoms for 2+ years post-menarche'],
      diagnosis: ['STEP 1: See your GP/OB-GYN with a symptom diary','STEP 2: Request hormone blood panel (FSH, LH, testosterone, DHEA-S, insulin, glucose, thyroid)','STEP 3: Pelvic ultrasound (may not show cysts in all PCOS types)','STEP 4: Rule out other conditions (thyroid, CAH, Cushing\'s, hyperprolactinemia)','STEP 5: Second opinion if not satisfied — and ask specifically about PCOS'],
      treatment: ['Track your symptoms for at least 3 months before your appointment','Bring a written list of ALL symptoms — even ones that seem unrelated','Request specific blood tests — doctors may not order comprehensive panels automatically','Know Rotterdam Criteria so you can discuss them','Consider a reproductive endocrinologist if your GP is unsatisfied or dismissive','Bring a support person if you find medical appointments stressful'],
      faq: [
        { q: 'Why is PCOS so hard to diagnose?', a: 'PCOS presents very differently from person to person — not all women have visible cysts, and symptoms overlap with other conditions like thyroid disorders.' },
        { q: 'What blood tests confirm PCOS?', a: 'There is no single confirmatory blood test. Doctors look for elevated androgens (testosterone, DHEA-S), LH/FSH ratio, and signs of insulin resistance.' },
        { q: 'Can you have PCOS without cysts?', a: 'Yes — this is a common misconception. "Polycystic" refers to follicle appearance, not cysts per se, and not all PCOS presents with this on ultrasound.' },
        { q: 'What if my doctor dismisses my symptoms?', a: 'Seek a second opinion. Reproductive endocrinologists (REIs) have the most expertise in PCOS diagnosis and management.' },
        { q: 'Can a regular blood test show PCOS?', a: 'Not definitively. PCOS requires a combination of symptoms, blood tests, and ultrasound findings. A single test is insufficient for diagnosis.' },
      ]
    }
  },
  {
    id: 12,
    title: 'Lifestyle Changes',
    subtitle: 'Small Shifts, Transformative Results',
    category: 'Lifestyle',
    icon: 'feather',
    emoji: '❤️',
    readTime: '5 min read',
    difficulty: 'Beginner',
    gradient: 'linear-gradient(135deg,#FDE68A,#F59E0B)',
    cardBg: 'linear-gradient(145deg,rgba(253,230,138,0.10),rgba(245,158,11,0.04))',
    accent: '#D97706',
    lastUpdated: 'June 2025',
    description: 'Practical, sustainable lifestyle habits that create lasting improvement in PCOS symptoms and quality of life.',
    content: {
      overview: 'Lifestyle modification is consistently rated as the most important first-line intervention for PCOS. It doesn\'t require perfection — small, consistent changes in diet, activity, sleep, and stress management create cumulative improvements in hormonal balance, metabolic health, and wellbeing. The key is sustainability over intensity.',
      symptoms: ['Every positive lifestyle change creates positive feedback loops','Small improvements in insulin sensitivity have downstream hormonal benefits','Consistency over time is more powerful than short-term perfection'],
      causes: ['An "all or nothing" mindset leads to burnout','Trying to change everything at once creates overwhelm','Unsustainable approaches are common and counterproductive'],
      diagnosis: ['WEEK 1: Add a 20-minute walk daily','WEEK 2: Add one anti-inflammatory meal per day','WEEK 3: Set a consistent sleep schedule','WEEK 4: Add one stress reduction practice','MONTH 2: Build on foundations, add strength training 2x/week','MONTH 3+: Track symptoms and celebrate non-scale victories'],
      treatment: ['Habit stacking: attach new habits to existing ones','Environmental design: make healthy choices easy, unhealthy ones harder','Tracking: use an app to notice patterns','Community: join a PCOS support group for accountability','Self-compassion: setbacks are normal and expected','Medical partnership: regular check-ins with your healthcare team'],
      faq: [
        { q: 'What lifestyle change has the biggest impact?', a: 'Research consistently shows that combined exercise + dietary changes produce the most significant symptom improvements in PCOS.' },
        { q: 'How long before I see results?', a: 'Many women notice energy and mood improvements within 2-4 weeks. Hormonal and metabolic changes typically become measurable within 3-6 months.' },
        { q: 'What if I can\'t afford a gym or specialist foods?', a: 'Walking is free and highly effective. Home-cooked simple meals with affordable protein, legumes, and vegetables are equally beneficial.' },
        { q: 'Is it too late to make lifestyle changes?', a: 'Never. PCOS management through lifestyle can benefit women at any age, at any point in their health journey.' },
        { q: 'How do I stay motivated when progress is slow?', a: 'Focus on how you feel rather than numbers. Keep a symptom journal — you\'ll notice improvements before labs or scales reflect them.' },
      ]
    }
  },
];

const CATEGORIES = ['All', 'Symptoms', 'Nutrition', 'Exercise', 'Mental Health', 'Hormones', 'Lifestyle', 'Pregnancy', 'Weight', 'Fertility'];

const DIFFICULTY_COLORS = {
  Beginner:     { bg: 'rgba(16,185,129,0.12)', color: '#059669', border: 'rgba(16,185,129,0.25)' },
  Intermediate: { bg: 'rgba(245,158,11,0.12)',  color: '#D97706', border: 'rgba(245,158,11,0.25)' },
  Advanced:     { bg: 'rgba(239,68,68,0.12)',   color: '#DC2626', border: 'rgba(239,68,68,0.25)' },
};

/* ────────────────────────────────────────────────────────────
   AI ASSISTANT COMPONENT
   ──────────────────────────────────────────────────────────── */
const AIAssistant = ({ resource }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: `Hi! I'm Lily 🌸 — your AI health assistant. Ask me anything about ${resource.title}!` }
  ]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  const quickQuestions = [
    'What are the main symptoms?',
    'How can I manage this naturally?',
    'When should I see a doctor?',
    'What tests should I get?',
  ];

  const aiResponses = {
    symptom: `Based on ${resource.title}, common symptoms include: ${resource.content.symptoms.slice(0,4).join(', ')}. Every person experiences PCOS differently — tracking your personal symptoms helps tailor your care.`,
    natural: `Natural management for ${resource.title} focuses on: lifestyle modifications, anti-inflammatory diet, regular movement, stress management, and adequate sleep. These have strong evidence and should be your foundation.`,
    doctor: `See a doctor if symptoms significantly impact your quality of life, if you're trying to conceive, or if you have signs of metabolic complications. Don't hesitate to seek a second opinion if dismissed.`,
    test: `Recommended tests include: hormone panel (testosterone, LH, FSH), fasting insulin and glucose, thyroid function, and a pelvic ultrasound. Bring a symptom diary to your appointment!`,
    default: `Great question about ${resource.title}! This is a complex topic. I'd recommend reviewing the full guide above and consulting with a reproductive endocrinologist for personalized guidance. Remember, PCOS management is highly individual! 🌸`,
  };

  const getResponse = (q) => {
    const lower = q.toLowerCase();
    if (lower.match(/symptom|sign/)) return aiResponses.symptom;
    if (lower.match(/natural|lifestyle|manage/)) return aiResponses.natural;
    if (lower.match(/doctor|specialist|see/)) return aiResponses.doctor;
    if (lower.match(/test|lab|blood/)) return aiResponses.test;
    return aiResponses.default;
  };

  const send = (q) => {
    const question = q || input.trim();
    if (!question) return;
    setMessages(m => [...m, { role: 'user', text: question }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages(m => [...m, { role: 'ai', text: getResponse(question) }]);
      setTyping(false);
    }, 1000);
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  return (
    <div style={{
      background: 'linear-gradient(145deg,rgba(167,139,250,0.06),rgba(236,72,153,0.04))',
      border: '1px solid rgba(167,139,250,0.20)',
      borderRadius: 20, overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg,#7C3AED,#EC4899)',
        padding: '16px 20px',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: 12,
          background: 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="bot" size={20} color="white"/>
        </div>
        <div>
          <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>Lily – AI Health Assistant</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem' }}>Powered by SHEra AI • Educational only</div>
        </div>
        <div style={{
          marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: 999,
          fontSize: '0.7rem', color: 'white', fontWeight: 600,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }}/>
          Online
        </div>
      </div>

      {/* Messages */}
      <div style={{ padding: 16, maxHeight: 220, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '80%', padding: '10px 14px', borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: m.role === 'user'
                ? 'linear-gradient(135deg,#E11D48,#BE185D)'
                : 'rgba(255,255,255,0.9)',
              color: m.role === 'user' ? 'white' : '#1A0A2E',
              fontSize: '0.82rem', lineHeight: 1.55, fontWeight: 500,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: 'flex', gap: 6, padding: '10px 14px', background: 'rgba(255,255,255,0.9)', borderRadius: '16px 16px 16px 4px', width: 'fit-content' }}>
            {[0,0.2,0.4].map((d, i) => (
              <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#A78BFA', display: 'inline-block', animation: `neon-pulse 1.2s ${d}s infinite` }}/>
            ))}
          </div>
        )}
        <div ref={endRef}/>
      </div>

      {/* Quick questions */}
      <div style={{ padding: '0 16px 12px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {quickQuestions.map((q, i) => (
          <button key={i} onClick={() => send(q)} style={{
            padding: '5px 12px', borderRadius: 999, border: '1px solid rgba(167,139,250,0.30)',
            background: 'rgba(167,139,250,0.08)', color: '#7C3AED',
            fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.18)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.08)'; }}>
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: '0 16px 16px', display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask about this topic..."
          style={{
            flex: 1, padding: '10px 14px', borderRadius: 12,
            border: '1px solid rgba(167,139,250,0.25)',
            background: 'rgba(255,255,255,0.8)', fontSize: '0.85rem',
            color: '#1A0A2E', outline: 'none',
          }}
        />
        <button onClick={() => send()} style={{
          padding: '10px 16px', borderRadius: 12,
          background: 'linear-gradient(135deg,#7C3AED,#EC4899)',
          border: 'none', color: 'white', cursor: 'pointer',
          display: 'flex', alignItems: 'center',
          boxShadow: '0 4px 12px rgba(124,58,237,0.30)',
          transition: 'all 0.2s ease',
        }}>
          <Icon name="arrowRight" size={16} color="white"/>
        </button>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   ACCORDION COMPONENT
   ──────────────────────────────────────────────────────────── */
const Accordion = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: '1px solid rgba(236,72,153,0.12)', borderRadius: 14,
      overflow: 'hidden', marginBottom: 10,
      transition: 'all 0.3s ease',
      boxShadow: open ? '0 4px 16px rgba(236,72,153,0.10)' : 'none',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', background: open ? 'rgba(236,72,153,0.05)' : 'rgba(255,255,255,0.8)',
          border: 'none', cursor: 'pointer', textAlign: 'left',
          transition: 'background 0.3s ease',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1A0A2E', paddingRight: 16 }}>{question}</span>
        <span style={{ transition: 'transform 0.3s ease', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
          <Icon name="chevronDown" size={16} color="#E11D48"/>
        </span>
      </button>
      {open && (
        <div style={{ padding: '0 20px 16px', background: 'rgba(255,255,255,0.8)' }}>
          <p style={{ fontSize: '0.875rem', color: '#6B2A5F', lineHeight: 1.7, margin: 0 }}>{answer}</p>
        </div>
      )}
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   READING PROGRESS BAR
   ──────────────────────────────────────────────────────────── */
const ReadingProgress = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const el = document.getElementById('modal-scroll-body');
    if (!el) return;
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setPct(Math.min(100, (scrollTop / (scrollHeight - clientHeight)) * 100));
    };
    el.addEventListener('scroll', update);
    return () => el.removeEventListener('scroll', update);
  }, []);
  return (
    <div style={{ height: 3, background: 'rgba(236,72,153,0.12)', borderRadius: 999, overflow: 'hidden' }}>
      <div style={{
        height: '100%', borderRadius: 999, width: `${pct}%`,
        background: 'linear-gradient(90deg,#FB7185,#EC4899,#A855F7)',
        transition: 'width 0.1s linear',
      }}/>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   RESOURCE MODAL
   ──────────────────────────────────────────────────────────── */
const ResourceModal = ({ resource, onClose, setActiveTab }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);

  const bg    = darkMode ? '#1A0A2E' : 'rgba(255,247,250,0.98)';
  const text  = darkMode ? '#F8E8F4' : '#1A0A2E';
  const sub   = darkMode ? '#C4A4C0' : '#6B2A5F';
  const card  = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.85)';
  const bord  = darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(236,72,153,0.12)';

  const diff = DIFFICULTY_COLORS[resource.difficulty] || DIFFICULTY_COLORS.Beginner;

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(10,5,20,0.70)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        animation: 'fadeInUp 0.3s ease',
      }}
    >
      <div style={{
        width: '100%', maxWidth: 1080, height: '88vh',
        background: bg, borderRadius: 32,
        boxShadow: '0 40px 120px rgba(0,0,0,0.35), 0 0 0 1px rgba(236,72,153,0.15)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* ── TOP BAR ── */}
        <div style={{
          padding: '0 28px',
          background: bg,
          borderBottom: `1px solid ${bord}`,
          flexShrink: 0,
        }}>
          <ReadingProgress />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: resource.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 4px 12px ${resource.accent}40`,
              }}>
                <Icon name={resource.icon} size={18} color="white"/>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: text, lineHeight: 1.2 }}>{resource.title}</div>
                <div style={{ fontSize: '0.72rem', color: sub, marginTop: 2 }}>{resource.subtitle}</div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Dark mode */}
              <button onClick={() => setDarkMode(d => !d)} style={{
                width: 36, height: 36, borderRadius: 10, border: `1px solid ${bord}`,
                background: card, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease', color: darkMode ? '#FBBF24' : sub,
              }}>
                <Icon name={darkMode ? 'sun' : 'moon'} size={16} color={darkMode ? '#FBBF24' : sub}/>
              </button>
              {/* Bookmark */}
              <button onClick={() => setBookmarked(b => !b)} style={{
                width: 36, height: 36, borderRadius: 10,
                border: `1px solid ${bookmarked ? 'rgba(225,29,72,0.3)' : bord}`,
                background: bookmarked ? 'rgba(225,29,72,0.08)' : card,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}>
                <Icon name="bookmark" size={16} color={bookmarked ? '#E11D48' : sub}/>
              </button>
              {/* Like */}
              <button onClick={() => setLiked(l => !l)} style={{
                width: 36, height: 36, borderRadius: 10,
                border: `1px solid ${liked ? 'rgba(236,72,153,0.3)' : bord}`,
                background: liked ? 'rgba(236,72,153,0.08)' : card,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}>
                <Icon name="heart" size={16} color={liked ? '#EC4899' : sub}/>
              </button>
              {/* Close */}
              <button onClick={onClose} style={{
                width: 36, height: 36, borderRadius: 10,
                border: `1px solid ${bord}`, background: card,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = card; e.currentTarget.style.borderColor = bord; }}>
                <Icon name="x" size={16} color={sub}/>
              </button>
            </div>
          </div>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div id="modal-scroll-body" style={{ flex: 1, overflowY: 'auto', padding: '0 28px 40px' }}>

          {/* Hero banner */}
          <div style={{
            marginTop: 28, marginBottom: 32,
            background: resource.gradient,
            borderRadius: 24, padding: 'clamp(28px,4vw,48px)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}/>
            <div style={{ position: 'absolute', bottom: -20, left: -20, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }}/>

            <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
              <div style={{ flex: '1 1 300px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                  <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '4px 12px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                    {resource.category}
                  </span>
                  <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '4px 12px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 700 }}>
                    {resource.difficulty}
                  </span>
                  <span style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '4px 12px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Icon name="check" size={12} color="white"/> Evidence Based
                  </span>
                </div>

                <h1 style={{ color: 'white', fontWeight: 900, fontSize: 'clamp(1.5rem,3vw,2.2rem)', letterSpacing: '-0.02em', marginBottom: 12, lineHeight: 1.2 }}>
                  {resource.title}
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', lineHeight: 1.65, marginBottom: 20, maxWidth: 520 }}>
                  {resource.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: '0.8rem', color: 'rgba(255,255,255,0.80)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Icon name="clock" size={14} color="rgba(255,255,255,0.8)"/> {resource.readTime}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Icon name="star" size={14} color="rgba(255,255,255,0.8)"/> {resource.difficulty}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Icon name="info" size={14} color="rgba(255,255,255,0.8)"/> Updated {resource.lastUpdated}
                  </span>
                </div>
              </div>

              <div style={{ fontSize: '6rem', animation: 'floatY 4s ease-in-out infinite', flexShrink: 0 }}>
                {resource.emoji}
              </div>
            </div>
          </div>

          {/* Content grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,340px)', gap: 28, alignItems: 'start' }}
            className="modal-grid">

            {/* LEFT COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

              {/* Overview */}
              <Section title="Overview" icon="bookOpen" accent={resource.accent} dark={darkMode}>
                <p style={{ color: sub, lineHeight: 1.8, fontSize: '0.9rem' }}>{resource.content.overview}</p>
              </Section>

              {/* Symptoms / Key Points */}
              <Section title="Key Points" icon="sparkles" accent={resource.accent} dark={darkMode}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {resource.content.symptoms.map((s, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '8px 14px', borderRadius: 999,
                      background: `${resource.accent}10`,
                      border: `1px solid ${resource.accent}22`,
                      fontSize: '0.8rem', fontWeight: 600, color: resource.accent,
                    }}>
                      <Icon name="check" size={12} color={resource.accent}/>
                      {s}
                    </div>
                  ))}
                </div>
              </Section>

              {/* Causes / Details */}
              <Section title="Contributing Factors" icon="info" accent={resource.accent} dark={darkMode}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {resource.content.causes.map((c, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                      padding: '12px 16px', borderRadius: 12,
                      background: card, border: `1px solid ${bord}`,
                    }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: 8, flexShrink: 0,
                        background: `${resource.accent}14`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon name="chevronRight" size={12} color={resource.accent}/>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: sub, lineHeight: 1.6 }}>{c}</p>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Diagnosis / Assessment */}
              <Section title="Assessment & Guidance" icon="stethoscope" accent={resource.accent} dark={darkMode}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {resource.content.diagnosis.map((d, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                      padding: '12px 16px', borderRadius: 12,
                      background: i % 2 === 0 ? card : `${resource.accent}06`,
                      border: `1px solid ${bord}`,
                    }}>
                      <span style={{
                        minWidth: 24, height: 24, borderRadius: '50%',
                        background: resource.gradient,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.65rem', fontWeight: 800, color: 'white', flexShrink: 0,
                      }}>
                        {i + 1}
                      </span>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: sub, lineHeight: 1.6 }}>{d}</p>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Treatment */}
              <Section title="Management Strategies" icon="activity" accent={resource.accent} dark={darkMode}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: 12 }}>
                  {resource.content.treatment.map((t, i) => (
                    <div key={i} style={{
                      padding: '14px 16px', borderRadius: 14,
                      background: card, border: `1px solid ${bord}`,
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = resource.accent + '40'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 6px 18px ${resource.accent}15`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = bord; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: resource.gradient, marginTop: 6, flexShrink: 0 }}/>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: sub, lineHeight: 1.55, fontWeight: 500 }}>{t}</p>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Warning box */}
              <div style={{
                padding: '18px 20px', borderRadius: 16,
                background: 'rgba(245,158,11,0.06)',
                border: '1px solid rgba(245,158,11,0.25)',
                display: 'flex', gap: 14, alignItems: 'flex-start',
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="warning" size={18} color="#D97706"/>
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#D97706', marginBottom: 6 }}>Medical Disclaimer</div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#B45309', lineHeight: 1.65 }}>
                    This content is for educational purposes only and does not constitute medical advice.
                    Always consult a qualified healthcare professional for diagnosis and treatment decisions.
                  </p>
                </div>
              </div>

              {/* FAQ */}
              <Section title="Frequently Asked Questions" icon="info" accent={resource.accent} dark={darkMode}>
                {resource.content.faq.map((f, i) => (
                  <Accordion key={i} question={f.q} answer={f.a} />
                ))}
              </Section>

              {/* Related navigation */}
              <div style={{
                padding: '24px', borderRadius: 20,
                background: 'linear-gradient(135deg,rgba(236,72,153,0.06),rgba(168,85,247,0.04))',
                border: '1px solid rgba(236,72,153,0.14)',
              }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: text, marginBottom: 16 }}>Explore Related</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  <button onClick={() => setActiveTab('tracker')} className="aura-button-outline" style={{ padding: '8px 18px', fontSize: '0.8rem', borderRadius: 10 }}>
                    Period Tracker →
                  </button>
                  <button onClick={() => setActiveTab('early-detection')} className="aura-button-outline" style={{ padding: '8px 18px', fontSize: '0.8rem', borderRadius: 10 }}>
                    Risk Assessment →
                  </button>
                  <button onClick={() => { setActiveTab('community'); onClose(); }} className="aura-button-outline" style={{ padding: '8px 18px', fontSize: '0.8rem', borderRadius: 10 }}>
                    Community →
                  </button>
                  <button onClick={() => { setActiveTab('resources'); onClose(); }} className="aura-button" style={{ padding: '8px 18px', fontSize: '0.8rem', borderRadius: 10 }}>
                    Find a Doctor
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 20 }}>

              {/* Quick stats */}
              <div style={{ background: card, border: `1px solid ${bord}`, borderRadius: 20, padding: 20 }}>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: text, marginBottom: 16 }}>Quick Stats</div>
                {[
                  { icon: 'clock', label: 'Read Time', value: resource.readTime },
                  { icon: 'star', label: 'Difficulty', value: resource.difficulty },
                  { icon: 'info', label: 'Category', value: resource.category },
                  { icon: 'sparkles', label: 'Last Updated', value: resource.lastUpdated },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 3 ? `1px solid ${bord}` : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: sub }}>
                      <Icon name={s.icon} size={14} color={resource.accent}/> {s.label}
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.8rem', color: resource.accent }}>{s.value}</span>
                  </div>
                ))}
              </div>

              {/* AI Assistant */}
              <AIAssistant resource={resource} />

              {/* CTA cards */}
              <div style={{ background: 'linear-gradient(135deg,#E11D48,#BE185D)', borderRadius: 20, padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <Icon name="stethoscope" size={20} color="white"/>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'white' }}>Consult a Doctor</div>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: 16 }}>
                  Get professional guidance tailored to your symptoms.
                </p>
                <button
                  onClick={() => { setActiveTab('resources'); onClose(); }}
                  style={{
                    width: '100%', padding: '10px', borderRadius: 12,
                    background: 'rgba(255,255,255,0.20)', border: '1px solid rgba(255,255,255,0.30)',
                    color: 'white', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.30)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.20)'}
                >
                  Find Specialists →
                </button>
              </div>

              <div style={{ background: card, border: `1px solid ${bord}`, borderRadius: 20, padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <Icon name="users" size={18} color="#7C3AED"/>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: text }}>Join Community</div>
                </div>
                <p style={{ fontSize: '0.78rem', color: sub, lineHeight: 1.6, marginBottom: 16 }}>
                  Connect with thousands of women on the same journey.
                </p>
                <button
                  onClick={() => { setActiveTab('community'); onClose(); }}
                  className="aura-button-outline"
                  style={{ width: '100%', padding: '10px', borderRadius: 12, fontSize: '0.82rem', justifyContent: 'center' }}
                >
                  Go to Community →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal responsive style */}
      <style>{`
        @media (max-width: 768px) {
          .modal-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

/* ── Section wrapper ── */
const Section = ({ title, icon, accent, dark, children }) => {
  const bg   = dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.85)';
  const text = dark ? '#F8E8F4' : '#1A0A2E';
  const bord = dark ? 'rgba(255,255,255,0.08)' : 'rgba(236,72,153,0.12)';
  return (
    <div style={{ background: bg, border: `1px solid ${bord}`, borderRadius: 20, padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: `${accent}14`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={icon} size={16} color={accent}/>
        </div>
        <h3 style={{ fontWeight: 800, fontSize: '1rem', color: text, margin: 0 }}>{title}</h3>
      </div>
      {children}
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   RESOURCE CARD
   ──────────────────────────────────────────────────────────── */
const ResourceCard = ({ resource, onClick }) => {
  const [hover, setHover] = useState(false);
  const diff = DIFFICULTY_COLORS[resource.difficulty];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover
          ? 'rgba(255,255,255,0.95)'
          : 'rgba(255,255,255,0.80)',
        backdropFilter: 'blur(16px)',
        border: hover ? `1px solid ${resource.accent}40` : '1px solid rgba(236,72,153,0.10)',
        borderRadius: 24,
        padding: 24,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transform: hover ? 'translateY(-8px)' : 'none',
        boxShadow: hover
          ? `0 24px 48px rgba(0,0,0,0.10), 0 0 0 1px ${resource.accent}20`
          : '0 4px 16px rgba(0,0,0,0.05)',
        transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      {/* Background illustration */}
      <div style={{
        position: 'absolute', top: -24, right: -24, width: 120, height: 120,
        borderRadius: '50%', background: resource.cardBg, zIndex: 0,
        transition: 'transform 0.4s ease',
        transform: hover ? 'scale(1.2)' : 'scale(1)',
      }}/>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Icon */}
        <div style={{
          width: 56, height: 56, borderRadius: 18, marginBottom: 18,
          background: resource.gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 8px 20px ${resource.accent}30`,
          transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          transform: hover ? 'scale(1.12) rotate(-4deg)' : 'none',
        }}>
          <Icon name={resource.icon} size={24} color="white"/>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
          <span style={{
            padding: '3px 10px', borderRadius: 999,
            background: `${resource.accent}12`,
            border: `1px solid ${resource.accent}25`,
            fontSize: '0.68rem', fontWeight: 700, color: resource.accent, letterSpacing: '0.04em',
          }}>
            {resource.category}
          </span>
          <span style={{
            padding: '3px 10px', borderRadius: 999,
            background: diff.bg, border: `1px solid ${diff.border}`,
            fontSize: '0.68rem', fontWeight: 700, color: diff.color,
          }}>
            {resource.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontWeight: 800, fontSize: '1rem', color: '#1A0A2E', marginBottom: 8, lineHeight: 1.3, transition: 'color 0.2s ease', ...(hover ? { color: resource.accent } : {}) }}>
          {resource.title}
        </h3>

        {/* Description */}
        <p style={{ fontSize: '0.82rem', color: '#6B2A5F', lineHeight: 1.65, marginBottom: 18 }}>
          {resource.description}
        </p>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: '#9B6B8A', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icon name="clock" size={12} color="#9B6B8A"/> {resource.readTime}
          </span>
          <div style={{
            display: 'flex', alignItems: 'center',
            fontSize: '0.78rem', fontWeight: 700, color: resource.accent,
            gap: hover ? '8px' : '5px',
            transition: 'gap 0.25s ease',
          }}>
            Read Guide <Icon name="arrowRight" size={14} color={resource.accent}/>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   MAIN RESOURCES COMPONENT
   ──────────────────────────────────────────────────────────── */
const Resources = ({ setActiveTab }) => {
  // ── PRESERVED from original ──
  const articles = [
    {
      id: 1,
      title: 'Understanding PCOS: Symptoms, Causes, and Care',
      excerpt: 'A clear overview of PCOS/PCOD, common symptoms, and evidence-based lifestyle strategies.',
      content: 'PCOS (Polycystic Ovary Syndrome) affects hormone levels and can impact menstrual cycles, fertility, and metabolic health. Effective management often includes nutrition adjustments, regular exercise, stress reduction, and medical guidance where appropriate. Early detection and consistent tracking help tailor care to each person.'
    },
    {
      id: 2,
      title: 'Nutrition Basics for PCOS',
      excerpt: 'Practical tips for blood sugar balance, fiber intake, and anti-inflammatory foods.',
      content: 'Balanced meals with protein, fiber, and healthy fats support stable energy and hormone balance. Focus on whole foods, minimize ultra-processed snacks, and personalize meals based on symptom responses.'
    }
  ];

  const [selectedArticle, setSelectedArticle] = useState(null); // original state preserved

  // ── NEW state ──
  const [selectedResource, setSelectedResource] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredResources = RESOURCES.filter(r => {
    const matchesSearch = !searchQuery ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'All' || r.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>

      {/* ── HERO HEADER ── */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(255,241,244,0) 0%, rgba(255,228,230,0.5) 100%)',
        padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,64px) 0',
        maxWidth: 1280, margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 40, animation: 'fadeInUp 0.6s ease both' }}>
          <div className="section-pill" style={{ marginBottom: 16, display: 'inline-flex' }}>
            <Icon name="bookOpen" size={12} color="#E11D48"/> Health Library
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 900,
            color: '#1A0A2E', letterSpacing: '-0.03em', marginBottom: 14,
          }}>
            Resources & <span className="brand-gradient-text">Learning Center</span>
          </h1>
          <p style={{ color: '#9B6B8A', fontSize: 'clamp(0.95rem,1.5vw,1.1rem)', maxWidth: 580, margin: '0 auto', lineHeight: 1.7 }}>
            Evidence-based guides, nutrition, lifestyle recommendations, and expert educational content for PCOS and PCOD.
          </p>
        </div>

        {/* Search bar */}
        <div style={{
          maxWidth: 600, margin: '0 auto 24px',
          position: 'relative', animation: 'fadeInUp 0.6s 0.1s ease both',
        }}>
          <div style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <Icon name="search" size={18} color="#9B6B8A"/>
          </div>
          <input
            type="text"
            placeholder="Search Resources..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '14px 48px', borderRadius: 16,
              border: '1.5px solid rgba(236,72,153,0.18)',
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(12px)',
              fontSize: '0.95rem', color: '#1A0A2E', outline: 'none',
              boxShadow: '0 4px 20px rgba(236,72,153,0.08)',
              transition: 'all 0.25s ease',
            }}
            onFocus={e => { e.target.style.borderColor = '#E11D48'; e.target.style.boxShadow = '0 4px 24px rgba(225,29,72,0.15)'; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(236,72,153,0.18)'; e.target.style.boxShadow = '0 4px 20px rgba(236,72,153,0.08)'; }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{
              position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 6,
            }}>
              <Icon name="x" size={16} color="#9B6B8A"/>
            </button>
          )}
        </div>

        {/* Category chips */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center',
          paddingBottom: 40, animation: 'fadeInUp 0.6s 0.2s ease both',
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '7px 18px', borderRadius: 999, cursor: 'pointer',
                fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.02em',
                transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                background: activeCategory === cat
                  ? 'linear-gradient(135deg,#E11D48,#EC4899)'
                  : 'rgba(255,255,255,0.75)',
                color: activeCategory === cat ? 'white' : '#6B2A5F',
                border: activeCategory === cat ? 'none' : '1px solid rgba(236,72,153,0.15)',
                boxShadow: activeCategory === cat
                  ? '0 4px 14px rgba(225,29,72,0.30)'
                  : '0 2px 6px rgba(0,0,0,0.04)',
                transform: activeCategory === cat ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── RESOURCE GRID ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px,5vw,64px) 80px' }}>
        {filteredResources.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0', color: '#9B6B8A' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>No results found</div>
            <div style={{ fontSize: '0.875rem' }}>Try a different search or category</div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
            gap: 24,
          }}>
            {filteredResources.map((r, i) => (
              <div key={r.id} style={{ animation: `fadeInUp 0.5s ${i * 0.06}s ease both` }}>
                <ResourceCard
                  resource={r}
                  onClick={() => setSelectedResource(r)}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── NAVIGATION (preserved from original) ── */}
        <div style={{
          marginTop: 64, padding: '32px', borderRadius: 24,
          background: 'rgba(255,255,255,0.60)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(236,72,153,0.12)',
          display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1A0A2E', marginBottom: 4 }}>Continue Your Journey</div>
            <div style={{ fontSize: '0.875rem', color: '#9B6B8A' }}>Explore more features of SHEra</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <button onClick={() => setActiveTab('resources')} className="aura-button" style={{ padding: '10px 22px', fontSize: '0.875rem' }}>
              <Icon name="stethoscope" size={15} color="white"/> Find Doctors
            </button>
            <button onClick={() => setActiveTab('community')} className="aura-button-outline" style={{ padding: '9px 20px', fontSize: '0.875rem' }}>
              <Icon name="users" size={15} color="#E11D48"/> Community
            </button>
            <button onClick={() => setActiveTab('home')} className="aura-button-outline" style={{ padding: '9px 20px', fontSize: '0.875rem' }}>
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* ── ORIGINAL POPUP (preserved exactly) ── */}
      {selectedArticle && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
          <div className="aura-card w-full max-w-2xl bg-dark">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-bold text-teal-400">{selectedArticle.title}</h3>
              <button className="aura-button" onClick={() => setSelectedArticle(null)}>Close</button>
            </div>
            <p className="text-soft-white text-base leading-relaxed">{selectedArticle.content}</p>
          </div>
        </div>
      )}

      {/* ── PREMIUM MODAL ── */}
      {selectedResource && (
        <ResourceModal
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  );
};

export default Resources;