# 🔌 SMART SHOPPING IoT — HARDWARE ARCHITECTURE & CIRCUIT GUIDE

**Evaluation Component**: Embedded Systems & IoT Integration (**10 Marks**)  
**Microcontroller**: ESP32-WROOM-32 / ESP32-CAM  
**Target Application**: Real-Time Automated Store Shelf Monitoring & Restock Synchronization

---

## 1. System Schematic & Pin Connections

| Peripheral / Component | Pin on ESP32 | Description / Role |
|---|---|---|
| **HC-SR04 Ultrasonic Sensor (Trigger)** | `GPIO 5` (Output) | Emits ultrasonic burst to detect product height on shelf |
| **HC-SR04 Ultrasonic Sensor (Echo)** | `GPIO 18` (Input) | Receives bounced wave; measures pulse width |
| **DHT22 / DHT11 Sensor** | `GPIO 4` (Input) | Monitors ambient store temperature & humidity |
| **Status / Heartbeat LED** | `GPIO 2` (Built-in) | Pulses every sync transmission (5 sec cycle) |
| **VCC Power Rail** | `VIN (5V) / 3.3V` | Powers sensors & ESP32 controller |
| **GND Ground Rail** | `GND` | Common ground for all sensors |

*(Optional Load Cell HX711 alternative: DT -> GPIO 21, SCK -> GPIO 22 for direct weight-based shelf monitoring).*

---

## 2. Data Flow Architecture

```
┌─────────────────────────────────┐
│     PHYSICAL SMART SHELF        │
│  [Ultrasonic Height Sensor]     │
│  [DHT22 Temperature / Humidity] │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│        ESP32 CONTROLLER         │
│  - Wi-Fi 802.11 b/g/n           │
│  - Distance -> Stock % Formula  │
│  - JSON Serialization           │
└────────────────┬────────────────┘
                 │ HTTP POST JSON (every 5s)
                 ▼
┌─────────────────────────────────┐
│     XAMPP / CLOUD PHP API       │
│  http://<IP>/api/iot_sensor.php │
└────────────────┬────────────────┘
                 │
       ┌─────────┴─────────┐
       ▼                   ▼
┌──────────────┐   ┌───────────────────────────┐
│ MySQL DB     │   │ ShopAI Glassmorphism UI   │
│ sensor_data  │   │ Real-Time Telemetry Panel │
└──────────────┘   │ (Online, 24.6°C, Stock 82%)│
                   └───────────────────────────┘
```

---

## 3. How to Demo for Judges

1. **Physical Hardware Demo (If ESP32 is connected)**:
   - Connect ESP32 to USB or 5V power supply.
   - Enter your Wi-Fi SSID and computer's IP in `esp32_smart_shelf.ino`.
   - Open Arduino IDE Serial Monitor (115200 baud). Observe live HTTP POST 200 OK responses.
   - The ShopAI web dashboard will immediately reflect the live sensor values.

2. **Simulation / Fallback Demo (If hardware is not physically present)**:
   - On the web dashboard, click **"SMART SHOPPING IoT"** tab.
   - Toggle **"SIMULATION MODE"** or click **"Simulate Sensor Pulse"**.
   - Notice the animated real-time pulse:
     - `Status: ● ONLINE`
     - `Temperature: 24.6°C`
     - `Stock Level: 82%`
     - `Product Count: 41`
     - `Last Sync: Active live connection`
   - Test threshold warning: Click the demo button to simulate a stock drop (<20%). The shelf indicator shifts to glowing Amber/Red with an automated restock recommendation!
