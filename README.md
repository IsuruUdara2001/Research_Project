# Research_Project
# ENHANCING TEA PRODUCTION USING AI AND IOT TECHNOLOGIES

## Project Overview

The Sri Lankan tea industry is a major contributor to the national economy, supplying both local and international markets. However, small and medium scale tea producers face significant challenges related to **tea leaf quality assessment, environmental control, machinery maintenance, and production efficiency**. Traditional methods rely on **manual inspections, experience-based judgments, and reactive maintenance**, resulting in **subjective grading, inconsistent outputs, material wastage, unexpected equipment failures, and financial losses**, especially for small-scale farmers and factory operators.

To address these challenges, this project proposes a **comprehensive, AI- and IoT-driven solution** that integrates **smart pre-processing tea leaf quality prediction, environmental monitoring, belt monitoring, and yield prediction**. The system uses **computer vision, machine learning, IoT devices, cloud computing, and mobile applications** to enable **real-time decision-making, proactive quality control, and predictive maintenance**, ultimately improving efficiency, transparency, and sustainability in the Sri Lankan tea supply chain.

---

## Components

### 1. Smart Pre-Processing Tea Quality Prediction System Using Tea Leaf Images

Fresh tea leaf quality assessment is a critical yet highly subjective process in tea production, often relying on manual inspection by experienced workers. Variations in human judgment, lighting conditions, and time constraints can lead to inconsistent grading, material wastage, and unfair pricing for farmers especially in small and medium-scale tea factories. 

The Smart Pre-Processing Tea Quality Prediction System enables real-time quality assessment using images captured via a smartphone camera. The system first verifies whether the uploaded image contains a tea leaf, preventing invalid inputs and ensuring reliable analysis. Once confirmed, advanced computer vision techniques like **CIELAB color space analysis, GLCM-based texture extraction, and morphological feature analysis** are applied to extract critical visual attributes such as **color, texture, shape, and size**. An ensemble machine learning model then classifies the leaves into four quality grades: **Premium, High, Medium, or Low.**

Instant feedback is delivered through a user-friendly mobile application, allowing early quality detection before processing begins. This data-driven approach reduces subjectivity, minimizes raw material wastage, supports fair pricing for farmers, and improves overall processing efficiency, contributing to the digital transformation of Sri Lanka’s tea industry.

---

### 2. Environment-Aware Humidity Optimization for Tea Quality Prediction

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

The Tea Leaf-to-Powder Yield Comparison System is an IoT-enabled, data-driven solution designed to improve efficiency, transparency, and accuracy in tea production within the Sri Lankan tea industry. The project automates the measurement of raw tea leaf input and final tea powder output using digital load cells integrated with microcontrollers such as ESP32 and Arduino. Each production batch is uniquely identified and tracked from collection to processing, enabling real-time comparison of input and output weights. The system calculates key performance metrics including weight loss, percentage loss, and yield efficiency, while generating alerts for abnormal deviations. A centralized cloud database and mobile-based dashboard provide real-time visualization, reporting, and traceability linked to farmer profiles. By combining IoT, data analytics, and predictive machine learning models, the system transforms traditional manual operations into a smart, Industry 4.0–aligned process that reduces errors, minimizes wastage, enhances decision-making, and improves overall productivity and profitability in tea manufacturing.


---
## Dependencies & Tools

This section lists all **system-wide dependencies** and **module-specific dependencies**.  

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

### 1. Smart Pre-Processing Tea Quality Prediction System Using Tea Leaf Images

**Programming Languages:**  

- Python – Backend API development & Machine Learning
- JavaScript / TypeScript – Mobile application development (React Native) 

**Frameworks & IDEs**  

- Flask – RESTful backend API (Python)
- React Native – Cross-platform mobile app development
- Expo Go – Mobile application testing
- Scikit-learn – Machine learning framework

**Python Libraries**  

- NumPy – Numerical computations
- Pandas – Dataset handling and preprocessing
- OpenCV (cv2) – Image processing
- Scikit-image – GLCM texture feature extraction
- Scikit-learn – ML model training and prediction
- Joblib – Model serialization (save/load)
- Matplotlib / Seaborn – Data visualization

 **Machine Learning Models**  
 
- Tea Leaf Verification Model(Binary classification): Tea Leaf / Not a Tea Leaf
- Tea Quality Classification Model(Multi-class classification): Premium, High, Medium, Low

 **Image Processing Techniques**  
 
- CIELAB Color Space Analysis – Objective leaf color evaluation
- GLCM Texture Analysis – Contrast, homogeneity, entropy, correlation
- Morphological Feature Extraction – Shape, size, area

**Databases / Cloud Services**
  
- Firebase Firestore / Realtime Database
  - Prediction result storage
  - Machine learning prediction storage
  - Historical quality analysis

 **Software & Tools Required**  
 
- Postman – API testing
- VS Code – Code editor
- Git & GitHub – Version control
---

### 2. Environment-Aware Humidity Optimization for Tea Quality Prediction

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
- Scikit-learn – Random Forest model training & prediction
- Joblib – Model saving/loading
- Firebase Admin SDK – Cloud integration

#### Arduino / ESP32 Libraries
- Wire – I2C communication
- Adafruit SHT31 Library – Temperature & humidity sensor interface
- Adafruit SSD1306 – OLED display control
- Adafruit GFX Library – OLED graphics rendering

#### Mobile App Libraries
- Fetch API – Backend communication
- Firebase SDK – Cloud data access

#### Databases / Cloud Services
- Firebase Firestore / Realtime Database
  - Sensor data storage
  - Tea leaf quality prediction storage
  - Historical analysis & remote access

#### Hardware / Sensors
- ESP32 Dev Board – Wi-Fi enabled IoT controller
- SHT31-D Temperature & Humidity Sensor Module – Environmental data measurement
- 1.3" OLED Display (White) – Local data visualization
- I2C 4-pin Cable – Sensor and display communication
- Jumper Wires (M–M, F–F, F–M)
- Mini Solderless Breadboard – Prototyping
- Plastic Project Box – Device enclosure
- Micro USB 2.0 Cable – Power and programming
- Adafruit Micro-B Breakout Board – Stable USB power connection

#### Hardware Summary – Sensor Pin Connections (ESP32)
- SHT31-D (SDA) → GPIO 21  
- SHT31-D (SCL) → GPIO 22  
- OLED Display (SDA) → GPIO 21  
- OLED Display (SCL) → GPIO 22  
- VCC → 3.3V  
- GND → GND  

#### Power Connections
- All module VCC → 3.3V (ESP32)
- All module GND → GND (ESP32)
- Common ground required

#### Machine Learning Model
- **Algorithm:** Random Forest
- **Input Parameters:** Temperature, Humidity
- **Output:** Predicted tea leaf quality / grade
- **Purpose:** Predict tea quality based on environmental conditions

#### Software & Tools Required
- Arduino IDE (v1.8.x or 2.x – latest recommended)
- ESP32 Arduino Core
- Python 3.x
- VS Code – Code editor
- Git & GitHub – Version control

#### Development & Testing Tools
- Postman – API testing
- Expo Go – Mobile app testing
- Firebase Console – Cloud monitoring


> *Teammates can fill in pin configs, thresholds, or extra sensors.*

---

### 3. Smart Belt Monitoring and Alert System for Tea Processing Machines

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

### 4. Tea Leaf-to-Powder Yield Prediction System

This section lists all **programming languages, frameworks, libraries, hardware, and tools** required for the **Tea Leaf-to-Powder Yield Prediction System**.

### Programming Languages

- **Python** – Backend API development and machine learning implementation  
- **C / C++** – ESP32 / ESP8266 firmware development  
- **JavaScript** – Mobile application development (React Native)  

### Frameworks / IDE

- **FastAPI (Python)** – RESTful backend APIs for sensor data handling, ML inference, and database integration  
- **Uvicorn** – ASGI server for running FastAPI backend  
- **Arduino IDE** – ESP32 / ESP8266 firmware programming  
- **React Native** – Mobile application development  
- **Expo Go** – Mobile application testing  
- **Scikit-learn** – Machine learning framework  

### Python Libraries

- **NumPy** – Numerical computations and array operations  
- **Pandas** – Dataset handling, cleaning, and preprocessing  
- **Scikit-learn** – ML model training, evaluation, and prediction  
- **Joblib** – Saving and loading trained ML models  
- **Firebase Admin SDK** – Secure backend communication with Firebase services  

### Arduino / ESP8266 Libraries

- **Arduino Core Library** – Essential microcontroller functions, GPIO control, serial communication  
- **HX711 Library** – Interface with HX711 load cell amplifier for weight measurement  
- **Wire Library** – I²C communication for peripheral devices (optional / expansion)  
- **ESP8266WiFi Library** – Wi-Fi connectivity for ESP8266  
- **ESP8266HTTPClient Library** – Send HTTP POST requests with sensor data  
- **ESP8266WebServer Library** – Local web interface for real-time weight display  
- **ArduinoJson Library** – Construct and serialize JSON payloads  
- **WiFiClient Library** – TCP client support for network communication  
- **WiFiClientSecure Library** – HTTPS communication support  

### Databases / Cloud Services

- **Firebase Firestore / Realtime Database**  
  - Sensor data storage  
  - Machine learning prediction storage  

### Hardware Components & Sensors

- **ESP8266 (NodeMCU)** – Main microcontroller with built-in Wi-Fi for sending data to backend  
- **Load Cell** – Measures the weight of tea leaves  
- **HX711 Load Cell Module** – Amplifies and converts load cell signals to digital data  
- **Push Button** – Captures and saves stable weight readings  
- **Wi-Fi Module (ESP8266 built-in)** – Wireless data transmission  
- **Power Supply (USB 5V)** – Powers NodeMCU and connected components  

### Development & Testing Tools

- **Postman** – API testing  
- **VS Code** – Code editor  
- **Git & GitHub** – Version control  
