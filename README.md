# SHEra: AI-Powered PCOS/PCOD Healthcare Platform 🌸

<div align="center">
  <p><strong>Early Detection • Multi-Modal AI Fusion • Automatic Image Validation • Smart Tracking • Supportive Community • Medical Guidance</strong></p>
</div>

SHEra is a comprehensive, next-generation healthcare platform explicitly designed to assist women in the early detection, tracking, and ongoing management of **Polycystic Ovary Syndrome (PCOS)** and **Polycystic Ovarian Disease (PCOD)**.

Built with a premium, modern, and calming UI, SHEra bridges the gap between daily health tracking and advanced medical diagnostics.

---

## 🌟 Core Features & Modules

### 1. 🤖 Multi-Modal AI Diagnostic Hub
SHEra features a cutting-edge, dual-model Artificial Intelligence engine designed to give an accurate, preliminary medical screening without requiring immediate doctor intervention.
*   **Clinical Analysis (Tabular Random Forest):** Evaluates a comprehensive 41-feature clinical matrix including physical symptoms (acne, hair loss, hirsutism, weight gain), cycle regularity, hormonal balances (FSH, LH, AMH), blood pressure, glucose, and body metrics (BMI, Waist:Hip Ratio).
*   **Lab Report Integration:** Users can optionally input exact clinical lab metrics (LH, FSH, AMH, TSH, RBS, Follicle Counts) to enhance the clinical analysis precision up to 98%+. Unprovided features automatically fallback to intelligent population medians.
*   **Ultrasound Analysis (Computer Vision CNN):** Users can securely upload a pelvic ultrasound image. A deep Convolutional Neural Network visually inspects the scan for ovarian follicles and morphological abnormalities (such as the "string of pearls" sign).
*   **Explainable AI (Grad-CAM):** To build trust, the AI provides a visual heatmap overlay, highlighting exactly which regions of the ultrasound (like specific follicles) triggered a high-risk detection.
*   **Weighted AI Fusion Scoring:** The platform fuses data using a weighted algorithm (`Clinical Data 60%` + `Visual Scan 40%`) to output a unified risk score.
*   **Severity-Tiered Classification:** Outcomes are classified seamlessly into stages (`PCOS Likely`, `PCOS/PCOD Possible`, `Low Risk - Monitor`, `Normal`) with clamped confidence probabilities to ensure clinical validity.

### 2. 🛡️ Ultrasound Image Validation Guardrail
An integrated safety guardrail inspects uploaded files prior to AI execution to detect and reject non-ultrasound images (e.g., selfies, landscape photos, documents).
*   **Grayscale Dominance:** Rejects colorful photos, ensuring images are monochrome.
*   **Background Ratio & Intensity Check:** Evaluates pixel histograms and darkness ratios to confirm authentic medical imaging characteristics, returning real-time feedback to the user on invalid uploads.

### 3. 📝 Premium Clinical Onboarding
A 5-step interactive profile builder that creates a complete health snapshot:
*   **Demographics:** Age, Height, Weight (with automated BMI calculation).
*   **Medical History:** Menstrual regularity, pregnancy history, and existing conditions.
*   **Lifestyle:** Sugar intake, dietary habits, and exercise frequency.
*   **Symptom Mapping:** Granular symptom tagging for precise analysis.

### 4. 📄 Exportable Clinical PDF Reports
Assessments aren't just transient. The system natively generates beautiful, branded, and print-ready PDF reports summarizing the risk score, patient demographics, actionable recommendations, and model confidence to share with doctors.

### 5. 📊 Interactive Health Tracker & History
*   **Diagnostic History:** All evaluations are securely saved to your account to track risk trajectory and improvements over time.
*   **Daily Log:** Log menstrual cycle dates with intelligent predictions, tag daily moods using an emoji selector, and log symptom flare-ups.

### 6. 💬 Supportive Social Community
A supportive forum built directly into the platform to share personal experiences, tips, and ask questions anonymously, complete with categorization tags (e.g., `#Diet`, `#MentalHealth`) and upvoting capabilities.

### 7. 🩺 Find a Specialist Directory
A geospatial directory of verified gynecologists and endocrinologists that suggests nearby doctors based on your location.

---

## 🏗️ Technical Architecture

SHEra utilizes a **Microservices-inspired Dual-Backend Architecture** to ensure high performance and strict isolation between machine learning inference and core application business logic.

```
                      +----------------------------------+
                      |       React Client (Vite)        |
                      |      http://localhost:5173       |
                      +----------------+-----------------+
                                       |
                   +-------------------+-------------------+
                   |                                       |
                   v (Port 5001)                           v (Port 5000)
    +--------------+---------------+       +---------------+--------------+
    |    Node.js / Express API     |       |   Python / Flask AI Engine   |
    |      Application Server      |       |       Inference Engine       |
    +--------------+---------------+       +---------------+--------------+
                   |                                       |
                   v                                       v
    +--------------+---------------+       +---------------+--------------+
    |   MongoDB Database (Mongoose)|       | • Tabular RF Model (41 feats)|
    |   • Users & Authentication   |       | • Visual CNN Model (128x128) |
    |   • Health Logs & Moods      |       | • Image Validation Guardrail |
    |   • Community Posts & Doctor |       | • Weighted 60/40 Fusion      |
    +------------------------------+       +------------------------------+
```

### 🧠 1. The AI Inference Engine (Python / Flask)
*   **Directory:** `pcos-pcod-ai-project/`
*   **Port:** `5000`
*   **Stack:** Python 3.9+, Flask, Flask-CORS, TensorFlow/Keras, OpenCV, Scikit-Learn, Pandas.
*   **Models:**
    *   `models/tabular_model.pkl`: A Random Forest Classifier trained on 41 clinical parameters.
    *   `models/image_model.h5`: A CNN trained to classify ultrasound scans (`infected` vs `noninfected`).

### 💾 2. The Application Server (Node.js / Express)
*   **Directory:** `backend/`
*   **Port:** `5001`
*   **Stack:** Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt.

### 🎨 3. The Frontend Client (React / Vite)
*   **Directory:** `frontend/`
*   **Port:** `5173`
*   **Stack:** React 18, Vite, Tailwind CSS, jsPDF.
*   **Design System:** Glassmorphism UI, gradient meshes, micro-animations, and dynamic data visualization.

---

## 🚀 Installation & Local Setup

### Prerequisites
*   **Node.js** (v18 or higher)
*   **Python** (v3.9 or higher)
*   **MongoDB** (Running locally on `mongodb://localhost:27017` or via MongoDB Atlas)

### Step 1: Start the AI Backend
```bash
cd pcos-pcod-ai-project
pip install -r requirements.txt
python3 app.py
```
*App starts on `http://localhost:5000`*

### Step 2: Start the Node.js API
```bash
cd backend
npm install
npm start
```
*App starts on `http://localhost:5001`*

### Step 3: Start the Frontend Client
```bash
cd frontend
npm install
npm run dev
```
*Access web interface at `http://localhost:5173`*

---

## 🔒 Security & Privacy Notice

SHEra prioritizes health data security:
*   Passwords and sessions are protected via **bcrypt** hashing and **JSON Web Tokens (JWT)**.
*   Ultrasound scans uploaded for diagnostic evaluation are processed entirely in memory or temporary storage and **immediately deleted** from disk upon completion. They are never permanently stored or logged.

---

*Built to empower women with transparent, multi-modal AI healthcare intelligence.* 🌸
