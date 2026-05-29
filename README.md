# 🐝 Bletaria Amë

Faqe web për bletarinë **Amë** — e ndërtuar me HTML, CSS, JavaScript dhe Firebase.

## 🌐 Live Demo
[bletariaame-63dcc.web.app](https://bletariaame-63dcc.web.app)

## 📋 Përshkrimi
Bletaria Amë është një faqe web për një bletari lokale që ofron produkte natyrale si mjaltë, vojshtinë dhe qumësht blete. Vizitorët mund të shfletojnë produktet, të kontaktojnë bletarinë dhe të bëjnë porosi online.

## ✨ Funksionalitetet
- 🏠 Faqe kryesore me hero section, about, menu, gallery dhe contact
- 🛒 Sistem porosie online
- 🔐 Autentifikim me Email/Password dhe Google Login
- 📩 Formular kontakti
- 📱 Responsive design për mobile dhe desktop
- 🔒 Firebase Security Rules për mbrojtje të të dhënave

## 🛠️ Teknologjitë e përdorura
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** C# ASP.NET Core
- **Database:** Firebase Firestore
- **Authentication:** Firebase Authentication
- **Hosting:** Firebase Hosting
- **Icons:** Font Awesome

## 📁 Struktura e projektit
Bletaria/
├── page1.html          # Faqja kryesore
├── page2.html          # Faqja e porosive
├── login.html          # Faqja e loginit
├── page1.css           # Stili i faqes kryesore
├── page2.css           # Stili i faqes së porosive
├── bee.png             # Logo
├── BletariaBackend/    # C# ASP.NET Core backend
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   └── Program.cs
└── .gitignore
## 🚀 Si ta ekzekutosh lokalisht

### Frontend
```bash
# Hap page1.html në browser ose përdor Live Server në VS Code
```

### Backend
```bash
cd BletariaBackend
dotnet run
```

## 🔐 Siguria
- Firebase Security Rules kufizojnë leximin dhe fshirjen e të dhënave
- Authentication kërkohet për të bërë porosi
- Kredencialet e Firebase nuk janë të përfshira në repository

## 👩‍💻 Zhvilluar nga
Hava Jusufi
