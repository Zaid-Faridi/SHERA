# SHEra: AI-Powered PCOS/PCOD Healthcare Platform 🌸

<div align="center">
  <p><strong>Early Detection • Smart Tracking • Supportive Community • Medical Guidance</strong></p>
</div>

SHEra is a comprehensive, next-generation healthcare platform explicitly designed to assist women in the early detection, tracking, and ongoing management of **Polycystic Ovary Syndrome (PCOS)** and **Polycystic Ovarian Disease (PCOD)**.

Built with a premium, modern, and calming UI—drawing inspiration from industry leaders like Apple Health, Flo, and Headspace—SHEra bridges the gap between daily health tracking and advanced medical diagnostics.

---

## 🌟 Core Features & Modules

### 1. 🤖 AI-Powered Diagnostic Hub
SHEra features a cutting-edge, multi-modal Artificial Intelligence engine designed to give an accurate, preliminary medical screening without needing immediate doctor intervention.
*   **Clinical Analysis (Tabular Data):** Evaluates physical symptoms (acne, hair loss, weight gain), cycle regularity, Age, and BMI to determine underlying risk factors.
*   **Ultrasound Analysis (Computer Vision):** Users can securely drag-and-drop a pelvic ultrasound image. Our CNN model visually inspects the scan for follicles and enlarged ovaries.
*   **Combined AI Scoring:** The platform uses a weighted algorithm (`Clinical 60%` + `Visual 40%`) to output a highly accurate risk confidence percentage and an actionable diagnosis (PCOS, PCOD, or Normal).

### 2. 📝 Premium Clinical Onboarding
A 5-step interactive profile builder that creates a complete health snapshot:
*   **Demographics:** Age, Height, Weight (Auto BMI calculation)
*   **Medical History:** Existing conditions and diagnoses.
*   **Lifestyle:** Diet, exercise, and sleep patterns.
*   **Symptoms:** Granular symptom tagging (irregular periods, skin changes, fatigue).

### 3. 📊 Interactive Health Tracker
A beautifully designed, daily health diary:
*   Log menstrual cycle start and end dates.
*   Tag daily moods using a responsive, emoji-based selector.
*   Log daily symptoms to track flare-ups over time.
*   *UI Highlights:* Glassmorphism styling, animated hover states, and seamless tab transitions.

### 4. 💬 Supportive Social Community
A Reddit-style forum built directly into the platform:
*   Share personal experiences, tips, and ask questions anonymously.
*   Categorized tags (e.g., #Diet, #MentalHealth, #TTC).
*   Like and comment system to foster a supportive digital environment.

### 5. 🩺 Find a Specialist
*   A geospatial directory of verified gynecologists and endocrinologists.
*   Suggests nearby doctors based on the user's current location using the Haversine distance formula.

---

## 🏗️ Technical Architecture

SHEra utilizes a **Microservices-inspired Dual-Backend Architecture** to ensure high performance. Heavy machine learning processing is strictly separated from standard web traffic.

### 🧠 1. The Inference Engine (Python / Flask)
*   **Directory:** `pcos-pcod-ai-project/`
*   **Port:** `5000`
*   **Stack:** Python, Flask, TensorFlow/Keras, Scikit-Learn, Pandas.
*   **Models:**
    *   `tabular_model.pkl`: A Scikit-Learn model trained on comprehensive PCOS datasets.
    *   `image_model.h5`: A Deep Learning Convolutional Neural Network (CNN) trained specifically to classify pelvic ultrasound imagery.
*   **Key Endpoint:** `POST /api/predict/combined` -> Processes `multipart/form-data` containing JSON clinical data and an image file simultaneously.

### 💾 2. The Application Server (Node.js / Express)
*   **Directory:** `backend/`
*   **Port:** `5001`
*   **Stack:** Node.js, Express.js, MongoDB (Mongoose), JWT Auth.
*   **Schemas:**
    *   `User`: Secure authentication (bcrypt) and profile linking.
    *   `HealthData`: Arrays of logged symptoms, moods, and cycle lengths.
    *   `Community`: Handles posts, upvotes, and nested comments.
    *   `Doctor`: Practitioner directory with geolocation capabilities.

### 🎨 3. The Frontend Client (React / Vite)
*   **Directory:** `frontend/`
*   **Port:** `5173`
*   **Stack:** React.js, Vite, Tailwind CSS, Lucide React (Icons).
*   **Design System:** Heavy use of backdrop-filters (blur), soft pink/purple gradient meshes, interactive micro-animations, and dynamic data visualization (Circular Progress rings for risk scores).

---

## 🚀 Installation & Local Setup

### Prerequisites
*   **Node.js** (v18 or higher)
*   **Python** (v3.9 or higher)
*   **MongoDB** (Running locally on `mongodb://localhost:27017` or via MongoDB Atlas)

### Step 1: Start the AI Backend
```bash
cd pcos-pcod-ai-project
# Optional: Create a virtual environment (python -m venv venv)
pip install -r requirements.txt
python3 app.py
```
*The AI server will spin up on `http://localhost:5000`*

### Step 2: Start the Node.js API
```bash
cd backend
npm install
npm start
```
*The Application server will spin up on `http://localhost:5001`*

### Step 3: Start the Frontend Client
```bash
cd frontend
npm install
npm run dev
```
*The web app will be accessible at `http://localhost:5173`*

---

## 📁 Directory Structure Overview

```text
SHERA/
├── backend/                   # Node.js Application Server
│   ├── models/                # MongoDB Mongoose Schemas
│   ├── routes/                # Express API Routes (/users, /health, /community)
│   └── server.js              # Entry point (Port 5001)
├── frontend/                  # React Client Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/        # Pages: Onboarding, Tracker, Results, Community
│   │   │   └── main/          # PcosGuardian (Main State Manager & Router)
│   │   ├── App.jsx            # Application Wrapper
│   │   └── index.css          # Tailwind Directives & Custom CSS
│   └── vite.config.js         # Vite configuration
└── pcos-pcod-ai-project/      # Python AI Inference Engine
    ├── models/                # .h5 and .pkl trained ML models
    ├── uploads/               # Temporary storage for ultrasound analysis
    └── app.py                 # Flask server (Port 5000)
```

---

## 🔒 Security & Privacy Notice
SHEra deals with sensitive health information. 
*   All user passwords and authentication tokens are encrypted using **bcrypt** and **JWT**.
*   Ultrasound images uploaded for early detection are processed securely in memory/temporary storage and are **immediately deleted** from the server once the analysis is complete. They are never saved to the database.

---
*Built to empower women with AI-driven healthcare intelligence.*
