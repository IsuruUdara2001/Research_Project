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


