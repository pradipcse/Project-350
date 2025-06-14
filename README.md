<div align="center">
<h1>Shahjalal University of Science and Technology, Sylhet </h1><br>
Department of <br>
<h2>Computer Science & Engineering</h2>

 
![image](https://github.com/al-amin057/micro_project/assets/104164316/b8b92d25-1952-4323-9200-d9c535655aa4)


</div>
<div>
Course Name: <b> Project Work III </b> <br>
Course Code: <b>CSE-350</b> <br>
Group: <b>16</b><br>
Project Title: <b>Campus Resource Hub & Entrepreneurship Network</b>

## Team Members
1. Al-Amin (**2020331057**)
2. Md. Sakib Hassan (**2020331109**)
3. Pradip Pashi (**2020331105**)
</div>


<div align = "center">  <h1> Campus Resource Hub & Entrepreneurship Network: SUST_Shop </h1> </div>

<div align = "justify"> SUST_Shop is a full-stack platform developed as part of Course Code: CSE-350 (Project Work III) under the guidance of <a href = "https://www.sust.edu/departments/cse/faculty/mehedi-cse@sust.edu"> Md. Mehedi Hasan </a>, Lecturer, CSE, SUST. This system is built to empower university students by centralizing access to academic resources and entrepreneurial support. It enables students to share, rent, and sell books, notes, and lab equipment, while also offering a dedicated space for promoting student-led businesses. Integrated with an ML-powered recommendation engine, secure chat features, and a performance dashboard, the platform fosters efficient peer collaboration, enhances resource availability, and encourages innovation. It aims to solve key issues such as fragmented communication, high material costs, and lack of visibility for student entrepreneurs—ultimately creating a scalable solution to support academic and entrepreneurial growth within university communities. </div>

---

### 🌐 Project Overview

This platform empowers students by offering:

- 📚 **Resource Sharing** — Buy, sell, or rent books, notes, and equipment.
- 🛍️ **Entrepreneurship Marketplace** — Promote student-run businesses.
- 🤖 **Smart Recommendations** — ML-powered suggestions based on user interests.
- 💬 **Built-in Chat System** — Direct communication between users.
- 📊 **Analytics Dashboard** — Insights into transactions and user activity.

---

### 🧪 Features in Action
- ✅ User registration & login
- ✅ Browse and post academic resources
- ✅ Add businesses to the marketplace
- ✅ Real-time chat with sellers
- ✅ Personalized recommendations
- ✅ Dashboard with user statistics


---

## 🚀 Tech Stack

| Layer       | Technology                  |
|-------------|------------------------------|
| Frontend    | React.js, Tailwind CSS, DaisyUI |
| Backend     | Django REST Framework        |
| Database    | MySQL                        |
| ML Engine   | Collaborative Filtering (Recommendation System) |
| Deployment  | AWS / Google Cloud (planned) |

---

### 📁 Project Structure

```plaintext
Sust_shop/
├── Frontend/         # React Frontend (Tailwind, DaisyUI)
│   ├── README.md
│   └── Sust_shop/
├── Backend/          # Django Backend
│   ├── env/          # Python Virtual Environment
│   └── shop/         # Django project with REST APIs
└── .git/             # Git version control
```
### 🛠️ Installation & Setup
🔹 Prerequisites
Node.js & npm

Python 3.8+

pip

MySQL

Git

### 🔸 Backend Setup (Django)
```
cd Backend/shop
python -m venv env
source env/bin/activate   # or env\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
### 🔸 Frontend Setup (React)
```bash
cd Frontend/Sust_shop
npm install
npm run dev
```
Make sure the backend server is running on port 8000, and the frontend can connect via API.

### 👨‍💻 Contributors
- Al-Amin (2020331057)
- Pradip Pashi (2020331105)
- Md. Sakib Hassan (2020331109)

Supervisor: <a href = "https://www.sust.edu/departments/cse/faculty/mehedi-cse@sust.edu"> Md. Mehedi Hasan </a>, Lecturer, CSE, SUST

### 📬 Contact
For issues or contributions, open an issue or contact a contributor directly.

### 📜 License
This project is part of the **CSE-350** Project Work III at Shahjalal University of Science and Technology. All rights reserved to the contributors and the course instructors.
