# 🌱 Krushi

**Reflecting the Hidden Spectrum. Securing the Harvest.**

Krushi is an offline-first, voice-driven agritech application designed to bring precision agriculture to smallholder farmers. By computationally transforming a standard $50 smartphone camera into a $10,000 hyperspectral laboratory sensor, this platform detects invisible crop diseases days before they destroy the yield.

---

## 📖 The Problem

Rural farmers often operate in network dead-zones with low-end hardware and limited tech literacy. Traditional farming relies on reactive, visually-driven decisions. By the time crop damage is visible to the naked eye on standard smartphone cameras, up to 30% of the yield is already lost. True early detection requires hyperspectral imaging, which is bulky, expensive, and completely out of reach for smallholder farmers.

## 🚀 The Solution

Krushi bridges this gap through a proprietary computational hyperspectral imaging approach. 

* **Accessible Hardware:** Reconstructs spectral bands using only standard RGB images from basic smartphones.
* **Offline-First:** Captures data and stores it locally, automatically syncing to the cloud when the farmer reaches a network zone.
* **Voice-Native:** Operates via a convenient Marathi voice interface to overcome literacy barriers.
* **Proactive Farming:** Delivers hyper-local, stage-wise agronomy alerts to save harvests before diseases spread.

---

## 🛠️ Architecture & Tech Stack

The platform utilizes a B2B2C architecture, providing freemium utility to farmers while aggregating anonymized spectral health data for an Enterprise API.

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Mobile App (Frontend)** | React Native (Expo) | Cross-platform framework with NativeWind (Tailwind) for a premium, responsive UI. |
| **Backend API** | FastAPI (Python) | High-performance asynchronous API handling image routing and cloud processing. |
| **Database** | Firebase Firestore | NoSQL document storage for managing offline queues and farmer profiles. |
| **AI Engine (Mocked MVP)**| Python / Simulated Models | Simulates the CNN-Transformer hybrid network for RGB-to-HSI conversion. |

---

## ⚙️ Getting Started

Follow these steps to run the MVP locally for development and demonstration.

### Prerequisites

* Node.js (v18+)
* Python (3.10+)
* Expo CLI
* Firebase Service Account Credentials

### 1. Backend Setup (FastAPI)

Navigate to the backend directory and start the server:

`cd backend_api`
`python -m venv venv`
`source venv/bin/activate`  *(On Windows use `venv\Scripts\activate`)*
`pip install -r requirements.txt`

Place your `firebase_credentials.json` in the root of the backend directory.

Run the development server:
`uvicorn main:app --reload --host 0.0.0.0 --port 8000`

### 2. Frontend Setup (React Native / Expo)

Open a new terminal, navigate to the mobile app directory, and start the Expo server:

`cd mobile_app`
`npm install`
`npx expo start`

Use the Expo Go app on your physical device or an emulator to scan the generated QR code.

---

## 🗄️ B2B2C Data Flow

Krushi is built on a zero-cost to the farmer, infinite value to the supply chain model.

1. **Onboarding:** Partnering with Farmer Producer Organizations (FPOs) and local Agri-Input Retailers to onboard farmers.
2. **Processing:** The FastAPI backend securely processes crop images and generates actionable agronomy alerts.
3. **Monetization:** Anonymized, hyper-local spectral health data is pushed to the Enterprise API for premium dashboard subscriptions targeted at Crop Insurance Agencies, Agri-Lending Banks, and Government Planners.

---

## 👨‍💻 Project Lead

**Anjali Hemant Shewale**
*Computer Science and Engineering, Vidyalankar Institute of Technology (VIT Mumbai)*

Designed for precision agriculture innovation, startup development, and rapid MVP deployment.
