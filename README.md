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
1. Al Amin Hossain (**2020331057**)
2. Pradip Pashi (**2020331105**)
3. Md. Sakib Hassan (**2020331109**)
</div>


<div align = "center">  <h1> Campus Resource Hub & Entrepreneurship Network: SUST_Shop </h1> </div>

<div align = "justify"> SUST_Shop is a full-stack platform developed as part of Course Code: CSE-350 (Project Work III) under the guidance of <a href = "https://www.sust.edu/departments/cse/faculty/mehedi-cse@sust.edu"> Md. Mehedi Hasan </a>, Lecturer, CSE, SUST. This system is built to empower university students by centralizing access to academic resources and entrepreneurial support. It enables students to share, rent, and sell books, notes, and lab equipment, while also offering a dedicated space for promoting student-led businesses. Integrated with an ML-powered recommendation engine, secure chat features, and a performance dashboard, the platform fosters efficient peer collaboration, enhances resource availability, and encourages innovation. It aims to solve key issues such as fragmented communication, high material costs, and lack of visibility for student entrepreneurs—ultimately creating a scalable solution to support academic and entrepreneurial growth within university communities. </div>

---

### 🌐 Project Overview

This platform empowers students by offering:

- 📚 **Resource Sharing** — Buy, sell, or rent books, notes, and equipment.
- 🛍️ **Entrepreneurship Marketplace** — Promote student-run businesses.
 <!-- - 🤖 **Smart Recommendations** — ML-powered suggestions based on user interests. -->
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

- Python 3.8+
- pip
- MySQL
- Git

### 🛢️ Set up MySQL Database
To connect the Django backend to a MySQL database, follow these steps using **MySQL Workbench** and **MySQL 9.3**:

### 🔧 Step-by-Step Guide
1. Download and Install MySQL Workbench and MySQL 9.3:

  - [MySQL Workbench Download](https://dev.mysql.com/downloads/workbench/)
  - [MySQL 9.3 Installer](https://dev.mysql.com/downloads/mysql/)

2. Open MySQL Workbench and connect to your local MySQL server.

3. Create a New Database:

```sql
CREATE DATABASE shop;
USE shop;
```
4. Ensure the following credentials are available:

   - Username: root
   - Password: cse_2020
   - Host: localhost
   - Port: 3308 (make sure this port is active and MySQL server is running on it)

5.Configure Django to use MySQL:

In your Django project settings (settings.py), locate or add the DATABASES configuration block:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'shop',
        'USER': 'root',
        'PASSWORD': 'cse_2020',
        'HOST': 'localhost',
        'PORT': '3308',
    }
}
```
6. Run Migrations to Initialize Tables:

```bash
python manage.py makemigrations
python manage.py migrate
```
✅ MySQL database is now ready and connected to the Django backend.

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
- Al Amin Hossain ([github.com/Visible-Unknown](https://github.com/Visible-Unknown))
- Pradip Pashi ([github.com/pradipcse](https://github.com/pradipcse))
- Md. Sakib Hassan ([github.com/sakib256124](https://github.com/sakib256124))

Supervisor: <a href = "https://www.sust.edu/departments/cse/faculty/mehedi-cse@sust.edu"> Md. Mehedi Hasan </a>, Lecturer, CSE, SUST

### 📬 Contact
For issues or contributions, open an issue or contact a contributor directly.

### 📜 License
This project is part of the **CSE-350** Project Work III at Shahjalal University of Science and Technology. All rights reserved to the contributors and the course instructors.
