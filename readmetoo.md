/edu-platform
 ├── /app              → routes (landing, login, etc.)
 │    ├── layout.js       → Landing page
 │    ├── page.js       → Landing page
 │    ├── about / page.js       → À propos
 │    ├── herosection / page.js → section 1: page d'accueil
 │    ├── blogs /page.js     → les fonctionnalités de la plateforme
 │    ├── contact/ page.js     → Contact
 │    ├── /auth
 │    │     ├── login/ page.js → Connexion
 │    │     └── register/ page.js → Inscription
 │    ├── /student
 │    │     ├── dashboard/ page.js → Espace élève
 │    │     ├── courses/ page.js   → Liste des cours
 │    │     ├── cartouches/ page.js → Détail cartouche (PDF/vidéo)
 │    │     └── live-sessions/ page.js   → Demande de séances live
 │    ├── /teacher
 │    │     ├── dashboard/ page.js → Espace prof
 │    │     ├── upload/ page.js    → Ajouter cartouche (pdf/vidéo)
 │    │     └── sessions/ page.js  → Gérer séances live
 │    └── /admin
 │          └── dashboard/page.js → (optionnel) Gestion plateforme
 │
 ├── /components          → composants réutilisables
 │    ├── Navbar/ page.js
 │    ├── Footer/ page.js
 │    ├── CourseCard/ page.js   → cartouche affichée sous forme de carte
 │    ├── Videolink/ page.js  → lecture vidéo YouTube
 │    ├── Pdflink/ page.js    → affichage PDF
 │    ├── LiveRequestForm/page.js
 │
 └── /public              → images, logos, icônes
