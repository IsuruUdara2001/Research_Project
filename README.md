# Research_Project
# ENHANCING TEA PRODUCTION USING AI AND IOT TECHNOLOGIES

## Project Overview

The Sri Lankan tea industry is a major contributor to the national economy, supplying both local and international markets. However, small and medium scale tea producers face significant challenges related to **tea leaf quality assessment, environmental control, machinery maintenance, and production efficiency**. Traditional methods rely on **manual inspections, experience-based judgments, and reactive maintenance**, resulting in **subjective grading, inconsistent outputs, material wastage, unexpected equipment failures, and financial losses**, especially for small-scale farmers and factory operators.

To address these challenges, this project proposes a **comprehensive, AI- and IoT-driven solution** that integrates **smart pre-processing tea leaf quality prediction, environmental monitoring, belt monitoring, and yield prediction**. The system uses **computer vision, machine learning, IoT devices, cloud computing, and mobile applications** to enable **real-time decision-making, proactive quality control, and predictive maintenance**, ultimately improving efficiency, transparency, and sustainability in the Sri Lankan tea supply chain.

---

## Components

### 1. Smart Pre-Processing Tea Quality Prediction System Using Tea Leaf Images

This module enables **real-time tea leaf quality assessment before processing**, significantly reducing subjectivity and material wastage. Using a smartphone camera, users capture images of freshly harvested leaves, which are then analyzed for **leaf color, texture, shape, and bud-to-leaf ratio** through advanced computer vision techniques, including:

- **CIELAB color space analysis**  
- **GLCM texture analysis**  
- **Morphological feature extraction**  
- **YOLO-based bud detection**  

An **ensemble machine learning model** classifies the leaves into quality grades: **Premium, High, Medium, or Low**. Instant feedback is provided through a user-friendly mobile application, enabling **early quality detection, fair pricing for farmers, and improved processing efficiency**.

---

### 2. Farmer-Centric Tea Supply Analytics and Predictive Business Intelligence System

Maintaining consistent tea quality in small and medium scale processing facilities is challenging due to fluctuating **environmental conditions**, such as temperature and humidity, which affect **moisture retention, enzymatic reactions, and drying efficiency**. Many factories lack **continuous environmental monitoring**, relying instead on experience-based assumptions, which often leads to **reactive and inconsistent quality assessment**.

This module introduces a **data-driven approach** integrating **IoT-based environmental sensing with machine learning**. Sensors continuously capture temperature and humidity readings, which are displayed locally via an **OLED interface** and transmitted to the **cloud** for storage and analysis. Machine learning models analyze patterns between environmental data and historical quality outcomes to predict potential quality deviations in advance.

By combining **real-time sensing with predictive analytics**, this component enables **proactive quality management, consistent tea grading, and informed decision-making**, providing a scalable and cost-effective solution for small and medium scale tea producers.

---

### 3. Smart Belt Monitoring and Alert System for Tea Processing Machines

Belt-driven machinery such as **rollers, cutters, and dryers** is critical to tea production. However, **wear, misalignment, slippage, and overheating** can cause unexpected downtime, increased costs, and reduced profitability, particularly in small and medium scale factories. Traditional maintenance is largely **manual and reactive**, with no real-time monitoring or early detection of degradation.

The Smart Belt Monitoring and Alert System continuously tracks machinery conditions using **vibration, temperature, and rotational speed sensors** connected to an **ESP32 microcontroller**. Detected anomalies trigger **alerts through three channels**:

- **Factory-level color-coded display boards** for operators  
- **Mobile notifications** for managers and technicians  
- **Cloud-based dashboards** for historical analysis, trend monitoring, and predictive maintenance planning  

This system transforms belt maintenance from a **labor-intensive, reactive task** into a **data-driven, proactive process**, enhancing **operational reliability, reducing downtime, and supporting digital transformation** in Sri Lanka’s tea industry.

---

### 4. Tea Leaf-to-Powder Yield Prediction System

The **Tea Leaf-to-Powder Yield Prediction System** integrates **IoT sensing and machine learning** to provide accurate predictions of **tea powder output and yield percentages**. During tea leaf intake, **weight sensors connected to ESP32 or NodeMCU devices** measure raw leaf quantities automatically. These measurements are sent in real time to a **cloud database (Firebase)**, with each batch recorded along with **timestamps, batch numbers, and farmer information**.

Historical and real-time data feed into **machine learning models** that predict expected tea powder output and yield for each batch. Predictions are validated on the backend to ensure **accuracy and reliability** before visualization.

The results are displayed in a **React Native (Expo) mobile application**, offering:

- **Batch-wise predicted outputs**  
- **Daily, weekly, and monthly statistics**  
- **Delivery history and performance feedback for farmers**  

Stakeholders can **monitor consistency, compare expected vs. actual results, and make informed processing decisions**, enhancing **transparency, efficiency, and trust** across the tea supply chain.

---
## Dependencies & Tools

This section lists all **system-wide dependencies** and **module-specific dependencies**.  
Your module (Belt Monitoring) is fully detailed; other modules have spaces for teammates to add their sensors, libraries, and tools.

---

### System-Wide Dependencies

- **ESP32 microcontroller** – IoT controller for all sensor modules
- **Arduino IDE** – Programming ESP32
- **Python** – Backend and ML processing
- **React Native (Expo)** – Mobile app development
- **Firebase** – Cloud storage & real-time database
- **VS Code** – Development environment
- **Machine Learning Libraries:** NumPy, Pandas, Scikit-learn, TensorFlow/PyTorch, OpenCV, YOLO, Matplotlib, Seaborn
- **Version Control:** Git & GitHub

---

## Module-Specific Dependencies

### 1. Smart Pre-Processing Tea Leaf Quality Prediction Module (Placeholder)

**Narrative:**  
- Real-time tea leaf quality assessment using AI & computer vision  
- Leaf features: color, texture, shape, bud-to-leaf ratio  
- ML model classifies leaves into Premium / High / Medium / Low  

**Hardware / Sensors:**  
- Smartphone camera – Image capture  

**Software / Libraries:**  
- Python, OpenCV, YOLO, TensorFlow/PyTorch, NumPy, Pandas, Scikit-learn  
- Mobile app: React Native / Expo  
- Cloud: Firebase  

> *Teammates can add exact pins, configurations, or extra tools here.*

---

### 2. Environmental Monitoring & Predictive Analytics Module (Placeholder)

**Narrative:**  
- Monitors temperature & humidity during tea processing  
- ML models predict potential quality deviations  

**Hardware / Sensors:**  
- Temperature sensor  
- Humidity sensor  
- OLED display  

**Software / Libraries:**  
- Python, Scikit-learn, Matplotlib/Seaborn  
- Mobile app: React Native / Expo  
- Cloud: Firebase  

> *Teammates can fill in pin configs, thresholds, or extra sensors.*

---

### 3. Belt Monitoring & Alert System (Fully Detailed)

#### Programming Languages
- **C / C++** – ESP32 firmware (Arduino IDE)
- **Python** – Backend API & Machine Learning
- **JavaScript** – Mobile application (React Native)

#### Frameworks / IDE
- Arduino IDE – ESP32 programming
- Flask (Python) – REST API backend
- React Native – Mobile app development
- Expo Go – Mobile app testing
- Scikit-learn – Machine Learning framework

#### Python Libraries
- NumPy – Numerical processing
- Pandas – Dataset handling
- Scikit-learn – ML training & prediction
- Joblib – Model saving/loading
- Firebase Admin SDK – Cloud integration

#### Arduino / ESP32 Libraries
- OneWire (Paul Stoffregen) – v2.3.7 recommended
- DallasTemperature (Miles Burton) – v3.9.0 recommended

#### Mobile App Libraries
- Fetch API – Backend communication

#### Databases / Cloud Services
- Firebase Firestore / Realtime Database
  - Sensor data storage
  - ML prediction storage
  - Historical analysis & remote access

#### Hardware / Sensors
- ESP32 Microcontroller – Wi-Fi enabled IoT controller
- MH Hall-Effect Sensor – RPM measurement
- SW-420 Vibration Sensor – Vibration detection
- DS18B20 Temperature Sensor – Temperature monitoring
- Belt-driven tea processing machine – Target system

#### Hardware Summary – Sensor Pin Connections (ESP32)
- MH Hall-Effect (DO) → GPIO 18 (Interrupt input)
- SW-420 (DO) → GPIO 19 (Digital input; LOW = vibration)
- DS18B20 (DATA/DQ) → GPIO 4 (1-Wire protocol)
- Pull-up Resistor → 4.7 kΩ between DATA and 3.3V

#### Power Connections
- All Sensor VCC → 3.3V (ESP32)
- All Sensor GND → GND (ESP32)
- Common ground required

#### Software & Tools Required
- Arduino IDE (v1.8.x or 2.x – latest recommended)
- ESP32 Arduino Core – v2.0.14 recommended
- Boards Manager URL: https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json

**Drivers (Windows Only)**
- CH340 / CH341 USB chip → Install CH341 driver
- CP210x USB chip → Install Silicon Labs CP210x VCP driver

#### Development & Testing Tools
- Postman – API testing
- VS Code – Code editor
- Git & GitHub – Version control

---

### 4. Tea Leaf-to-Powder Yield Prediction Module (Placeholder)

**Narrative:**  
- Predicts tea powder output and yield percentages using IoT and ML  
- Tracks batch-wise production for transparency  

**Hardware / Sensors:**  
- Load cell weight sensor  
- ESP32  

**Software / Libraries:**  
- Python, Scikit-learn, NumPy, Pandas  
- Mobile app: React Native / Expo  
- Cloud: Firebase  

> *Teammates can add wiring diagrams, calibration details, or additional libraries.*


