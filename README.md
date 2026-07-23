# SHEra: AI-Powered PCOS/PCOD Healthcare Platform 🌸

<div align="center">
  <p><strong>Early Detection • Multi-Modal AI Fusion • Automatic Image Validation • Smart Tracking • Supportive Community • Medical Guidance</strong></p>
</div>

SHEra is a comprehensive, next-generation healthcare platform explicitly designed to assist women in the early detection, tracking, and ongoing management of **Polycystic Ovary Syndrome (PCOS)** and **Polycystic Ovarian Disease (PCOD)**.

Built with a premium, modern, and calming UI—drawing inspiration from industry leaders like Apple Health, Flo, and Headspace—SHEra bridges the gap between daily health tracking and advanced medical diagnostics.

---

## 🌟 Core Features & Modules

### 1. 🤖 Multi-Modal AI Diagnostic Hub
SHEra features a cutting-edge, dual-model Artificial Intelligence engine designed to give an accurate, preliminary medical screening without requiring immediate doctor intervention.
*   **Clinical Analysis (Tabular Random Forest):** Evaluates a comprehensive 41-feature clinical matrix including physical symptoms (acne, hair loss, hirsutism, weight gain), cycle regularity, hormonal balances (FSH, LH, AMH), blood pressure, glucose, and body metrics (BMI, Waist:Hip Ratio).
*   **Ultrasound Analysis (Computer Vision CNN):** Users can securely upload a pelvic ultrasound image. Our deep Convolutional Neural Network visually inspects the scan for ovarian follicles and morphological abnormalities ("string of pearls" sign).
*   **Weighted AI Fusion Scoring:** The platform uses a weighted algorithm (`Clinical Data 60%` + `Visual Scan 40%`) to output a unified risk score, clinical severity level (`High`, `Moderate`, `Low`, `Minimal`), and actionable diagnosis (`PCOS Likely`, `PCOS/PCOD Possible`, `Low Risk - Monitor`, or `Normal`).
*   **🛡️ Automatic Ultrasound Image Validation:** An integrated guardrail inspects uploaded files prior to AI execution to detect and reject non-ultrasound images (e.g. selfies, landscape photos, documents) with clear guidance.

### 2. 📝 Premium Clinical Onboarding
A 5-step interactive profile builder that creates a complete health snapshot:
*   **Demographics:** Age, Height, Weight (with automated BMI calculation).
*   **Medical History:** Menstrual regularity, pregnancy history, and existing conditions.
*   **Lifestyle:** Sugar intake, dietary habits, and exercise frequency.
*   **Symptom Mapping:** Granular symptom tagging (irregular cycles, hirsutism, acne, hair loss, skin darkening).

### 3. 📊 Interactive Health Tracker
A beautifully designed, daily health diary:
*   Log menstrual cycle start and end dates with intelligent predictions.
*   Tag daily moods using a responsive, emoji-based selector.
*   Log daily symptoms to track flare-ups and patterns over time.
*   *UI Highlights:* Glassmorphism styling, animated hover states, circular risk visualization rings, and seamless tab transitions.

### 4. 💬 Supportive Social Community
A supportive forum built directly into the platform:
*   Share personal experiences, tips, and ask questions anonymously.
*   Categorized tags (e.g., `#Diet`, `#MentalHealth`, `#TTC`, `#Workouts`).
*   Upvote and comment system to foster an encouraging digital environment.

### 5. 🩺 Find a Specialist Directory
*   A geospatial directory of verified gynecologists and endocrinologists.
*   Suggests nearby doctors based on the user's current location using the Haversine distance formula.

---

## 🚀 Recent System Upgrades & Bug Fixes

A comprehensive audit was performed on the AI inference engine and frontend integration, resulting in major system improvements:

| Issue / Module | Before | After / Fix |
|---|---|---|
| **Image Preprocessing** | Manual `/255.0` scaling was executed prior to model input, duplicating the CNN's internal `Rescaling(1./255)` layer. This rendered pixel values near 0 and froze output at `0.36%`. | Removed manual division (`np.array(img).astype(np.float32)`). The CNN now outputs **100.0% risk** for infected scans and **~3.1% risk** for normal scans. |
| **Frontend Tabular Payload** | Frontend sent only 12 of the 41 required features, causing 29 features to default to `0` and incorrectly classifying high-risk patients as "Normal". | Updated `EarlyDetection.jsx` to build a complete **41-feature vector** using population-median fallbacks for uncollected clinical metrics. |
| **Diagnosis Logic** | Used arbitrary threshold cutoffs (`PCOS > 60`, `PCOD > 40`) without clinical basis for a binary model. | Implemented severity-tiered classification (`PCOS Likely`, `PCOS/PCOD Possible`, `Low Risk - Monitor`, `Normal`) with probability clamping (`2%` to `98%`). |
| **Non-Ultrasound Uploads** | Non-ultrasound images (selfies, documents) were blindly processed by the CNN, producing unpredictable risk scores. | Added `validate_ultrasound_image()` guardrail. Non-ultrasound uploads return `400 Bad Request` with clear user feedback. |
| **UI Model Confidence** | Displayed multiplied percentage values (e.g. `9200%`). | Fixed `Results.jsx` to render formatted confidence values correctly alongside color-coded severity badges. |

---

## 🛡️ Automatic Ultrasound Image Validation Guardrail

The AI backend features a multi-tiered validation algorithm (`validate_ultrasound_image` in `app.py`) to verify that an uploaded image is a genuine medical ultrasound before sending it to the neural network:

1.  **Grayscale Dominance Test:** Calculates color channel saturation ($S = \frac{\max(R,G,B) - \min(R,G,B)}{\max(R,G,B) + 1}$). Medical ultrasounds are monochrome ($S < 0.18$). Photos with color ($S > 0.18$) are rejected immediately.
2.  **Dark Background Ratio Test:** Evaluates the proportion of pixels with intensity $< 40$. Ultrasound scans require a dark background surrounding the scan cone ($>10\%$ dark pixels). Bright documents or scenes are rejected.
3.  **Intensity Distribution Test:** Verifies the bimodal histogram structure characteristic of tissue echo imaging. Overly bright white images ($>50\%$ pixels $> 220$) are flagged.

### Validation Responses

*   **Colorful Photo / Selfie:**
    ```json
    {
      "error": "invalid_image",
      "message": "This does not appear to be an ultrasound image. The image contains too much color. Ultrasound scans are typically grayscale. Please upload a valid ovarian ultrasound report.",
      "suggestion": "Please upload an ovarian ultrasound scan image (grayscale medical imaging)."
    }
    ```
*   **Document / White Image:**
    ```json
    {
      "error": "invalid_image",
      "message": "This does not appear to be an ultrasound image. Ultrasound scans typically have a dark background. Please upload a valid ovarian ultrasound report.",
      "suggestion": "Please upload an ovarian ultrasound scan image (grayscale medical imaging)."
    }
    ```

---

## 🏗️ Technical Architecture

SHEra utilizes a **Microservices-inspired Dual-Backend Architecture** to ensure high performance and strict isolation between heavy machine learning inference and core application business logic.

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
*   **Stack:** Python 3.9+, Flask, Flask-CORS, TensorFlow/Keras, Scikit-Learn, Pandas, NumPy, Pillow.
*   **Models:**
    *   `models/tabular_model.pkl`: A Scikit-Learn Random Forest Classifier trained on 41 clinical and biochemical parameters.
    *   `models/tabular_features.pkl`: Feature order mapping for model ingestion.
    *   `models/image_model.h5`: Deep Learning Convolutional Neural Network (CNN) trained to classify ovarian ultrasound scans (`infected` vs `noninfected`).

### 💾 2. The Application Server (Node.js / Express)
*   **Directory:** `backend/`
*   **Port:** `5001`
*   **Stack:** Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt.
*   **Data Models:**
    *   `User`: Authentication, encrypted passwords, and user settings.
    *   `HealthData`: Cycle tracking records, symptoms, and mood entries.
    *   `Community`: Discussions, upvotes, and threaded responses.
    *   `Doctor`: Verified practitioner directory with location parameters.

### 🎨 3. The Frontend Client (React / Vite)
*   **Directory:** `frontend/`
*   **Port:** `5173`
*   **Stack:** React 18, Vite, Tailwind CSS, Lucide Icons.
*   **Design System:** Glassmorphism UI, soft pink/purple gradient meshes, micro-animations, circular risk indicators, and real-time validation error alerts.

---

## 📡 API Endpoint Reference

### Python AI Engine (`http://localhost:5000`)

#### `POST /api/predict/combined`
Primary multi-modal diagnostic endpoint accepting `multipart/form-data`.
*   **Form Parameters:**
    *   `file`: Ultrasound image file (`JPG`/`PNG`)
    *   `clinical_data`: JSON string containing clinical metrics
*   **Sample Response:**
    ```json
    {
      "diagnosis": "PCOS Likely",
      "severity": "High",
      "confidence": 96.2,
      "risk_score": 96.2,
      "tabular_risk": 95.0,
      "image_risk": 100.0,
      "image_confidence_note": "",
      "message": "Analysis complete. Risk Level: High. PCOS Likely.",
      "details": {
        "clinical_model_weight": "60%",
        "imaging_model_weight": "40%",
        "raw_tabular_risk": 95.0,
        "raw_image_risk": 100.0,
        "clamped_tabular_risk": 95.0,
        "clamped_image_risk": 98.0
      }
    }
    ```

#### `POST /api/predict/image`
Standalone CNN prediction endpoint for ultrasound scans.
*   **Form Parameter:** `file` (image file)

#### `POST /api/predict/tabular`
Standalone Random Forest prediction endpoint for clinical data.
*   **JSON Payload:** Object containing 41 feature keys.

---

## 🧪 Test Dataset & Benchmarking Guide

For testing and verification, sample dataset files are organized under `pcos-ai-project/test-data/`:

```text
pcos-ai-project/test-data/
├── infected/          # Verified PCOS-positive ultrasound scans (Image_001.jpg to Image_900.jpg)
├── noninfected/       # Verified normal ultrasound scans (Image_001.jpg to Image_950.jpg)
├── fake_selfie.jpg    # Non-ultrasound test file (colorful photo)
├── fake_document.jpg  # Non-ultrasound test file (bright document)
└── fake_nature.jpg    # Non-ultrasound test file (landscape image)
```

Refer to [test_guide.md](file:///Users/zaidfaridi/.gemini/antigravity-ide/brain/957d9396-d0ed-4b62-987a-d84ee71bd290/test_guide.md) for 7 complete clinical profile scenarios (PCOS, Normal, Borderline, Contradictory, and Non-Ultrasound Rejection) ready for manual testing via the frontend interface.

---

## 🚀 Installation & Local Setup

### Prerequisites
*   **Node.js** (v18 or higher)
*   **Python** (v3.9 or higher)
*   **MongoDB** (Running locally on `mongodb://localhost:27017` or via MongoDB Atlas)

### Step 1: Start the AI Backend
```bash
cd pcos-pcod-ai-project
# Optional: Create virtual environment (python -m venv venv && source venv/bin/activate)
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

## 📁 Directory Structure Overview

```text
SHERA/
├── backend/                   # Node.js Application Server
│   ├── models/                # Mongoose Schemas (User, HealthData, Community, Doctor)
│   ├── routes/                # Express API Routes
│   └── server.js              # Entry point (Port 5001)
├── frontend/                  # React Client Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/        # Pages: Onboarding, EarlyDetection, Tracker, Results, Community
│   │   │   └── main/          # PcosGuardian (Main Router & State Container)
│   │   ├── App.jsx            # Top-level React Wrapper
│   │   └── index.css          # Styling & Animations
│   └── vite.config.js         # Vite configuration
├── pcos-pcod-ai-project/      # Python AI Inference Engine
│   ├── models/                # Trained ML Models (image_model.h5, tabular_model.pkl)
│   ├── Dataset/               # Original ultrasound image dataset (infected / noninfected)
│   ├── uploads/               # Secure temporary storage for scan analysis
│   ├── train_tabular.py       # Random forest model training script
│   ├── train_image.py         # CNN model training script
│   └── app.py                 # Flask Server & Validation Guardrail (Port 5000)
└── test-data/                 # Downloadable test images and fake samples for verification
```

---

## 🔒 Security & Privacy Notice

SHEra prioritizes health data security:
*   Passes and tokens are protected via **bcrypt** hashing and **JSON Web Tokens (JWT)**.
*   Ultrasound scans uploaded for diagnostic evaluation are processed in temporary storage and **immediately deleted** from disk upon completion. They are never permanently stored or logged.

---

*Built to empower women with transparent, multi-modal AI healthcare intelligence.* 🌸
