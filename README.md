# ⚡ Energy Usage Predictor

[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.0+-61DBFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0+-38B2AC?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A futuristic **Energy Usage Predictor** ⚡ built with **React + TailwindCSS (Frontend)** and **FastAPI (Backend)**.  
It allows users to enter **state, region, and forecast days** to predict **future energy consumption trends** using ML models.

---

## ✨ Features
- 🌌 **Futuristic UI** with glowing effects and animated backgrounds  
- 📊 **State-wise & region-wise energy prediction**  
- 🚀 **Fast API response** powered by FastAPI  
- 🎨 **Responsive design** with TailwindCSS  
- 🔮 **Interactive input fields & glowing Predict button**  

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, TailwindCSS  
- **Backend:** FastAPI, Uvicorn  
- **ML/Analytics:** Scikit-learn, Pandas, NumPy  

---

## 📂 Project Structure
```

energy-usage-predictor/
│── backend/               # FastAPI app
│   ├── main.py            # FastAPI entrypoint
│   ├── model.pkl          # Trained ML model (if any)
│   └── requirements.txt
│
│── frontend/              # React app
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   └── components/
│   └── index.html
│
│── .gitignore
│── README.md

````

---

## 🚀 Getting Started

### 🔹 Clone the repository
```bash
git clone https://github.com/your-username/energy-usage-predictor.git
cd energy-usage-predictor
````

---

### 🔹 Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will run on 👉 **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

### 🔹 Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on 👉 **[http://127.0.0.1:5173](http://127.0.0.1:5173)**

---

## 📸 Screenshots

| Home Screen                         | Prediction Result                          |
| ----------------------------------- | ------------------------------------------ |
| ![App Screenshot](./assets/SS1.png) | ![Prediction Screenshot](./assets/SS2.png) |

---

## 📡 API Endpoints

* `POST /predict` → Get predictions for energy usage

Request Example:

```json
{
  "state": "Punjab",
  "region": "NR",
  "days": 30
}
```

Response Example:

```json
{
  "forecast": [3450, 3500, 3600, ...]
}
```

---

## 🤝 Contributing

1. Fork the repo 🍴
2. Create a new branch (`feature-xyz`)
3. Commit changes (`git commit -m "Add xyz feature"`)
4. Push to branch (`git push origin feature-xyz`)
5. Open a Pull Request 🚀

---

## 📜 License

This project is licensed under the **MIT License**.
See [LICENSE](LICENSE) for details.

---

