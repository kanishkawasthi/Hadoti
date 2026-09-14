# Modern Personal Portfolio - Kanishk Awasthi

A high-performance, responsive single-page personal portfolio website for **Kanishk Awasthi** (B.Tech CSE Student, Web Developer, and Aspiring Entrepreneur). Built using pure HTML5, CSS3, and Vanilla JavaScript with zero external framework overhead.

---

## 🌟 Key Features

- **Hero & Animated Canvas Backdrop**: Interactive particle background with auto-pause on scroll/tab hide for max battery & CPU efficiency.
- **Dynamic Typewriter Tagline**: Cycles through *"B.Tech CSE Student"*, *"Web Developer"*, *"Problem Solver"*, and *"Aspiring Entrepreneur"*.
- **Data-Driven Architecture (`js/data.js`)**: All personal info, skills, projects, timeline, certifications, and achievements are organized in one configuration file for effortless updates.
- **Dark & Light Mode Toggle**: Smooth CSS variable transitions with persistent state saved in `localStorage`.
- **3D Card Tilt & Magnetic Buttons**: Micro-interactions with mouse parallax on desktop devices.
- **Glassmorphism Aesthetic**: Modern frosted-glass cards with glowing cyan/electric blue accents.
- **Scroll-Reveal Animations**: Lightweight IntersectionObserver triggers for smooth element entry.
- **Contact Form & Mailto Integration**: Client-side validation with a pre-filled `mailto:` message and direct email fallback link.
- **Mobile First & Responsive**: Optimized drawer navigation and responsive layout grids across all screen sizes.

---

## 📁 File Structure

```text
d:/.vscode/portfolio/
├── index.html            # Main semantic HTML5 single-page structure & SEO tags
├── css/
│   ├── style.css         # Core CSS variables, typography, layouts, themes, cards
│   └── animations.css    # Keyframes, scroll-reveal classes, 3D tilt, magnetic effects
├── js/
│   ├── data.js           # Central configuration object (Edit all your details here!)
│   ├── particles.js      # Hero canvas particle system (visibility & scroll aware)
│   └── main.js           # Preloader, scrollspy, theme toggle, form logic, animations
└── assets/
    ├── favicon.svg       # Developer vector logo SVG
    └── resume.pdf        # Placeholder resume PDF (Replace with your actual resume!)
```

---

## 🛠️ Customization Guide

### 1. Update Personal Data, Skills & Projects
Open [`js/data.js`](file:///d:/.vscode/portfolio/js/data.js) to modify:
- **Bio & Taglines**: Change typing text or personal intro.
- **Skills**: Adjust proficiency percentages, add new languages or tools.
- **Projects**: Edit features, add real GitHub repository links or Live Demo URLs.
- **Education & Certifications**: Add new accomplishments or update CGPA.

### 2. Replace Resume PDF
Replace the placeholder file inside `assets/resume.pdf` with your actual resume file named `resume.pdf`.

### 3. Contact Form
Submitting the contact form validates the fields and opens the visitor's default email app with a pre-filled message to `kanishkavasthi@gmail.com`. A direct email link is also available below the form.

---

## 🚀 How to Run & Deploy

### Option A: Running Locally
1. Simply double-click `index.html` to open it in any web browser.
2. Or use the npm development server:
   ```bash
   npm run dev
   ```
   Then open `http://localhost:3000`.
3. Alternatively, use Python's built-in HTTP server:
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

### Option B: Deploying to GitHub Pages (Recommended)
1. Push your project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of portfolio"
   git branch -M main
   git remote add origin https://github.com/kanishkawasthi/portfolio.git
   git push -u origin main
   ```
2. Go to your GitHub repository **Settings** > **Pages**.
3. Under **Build and deployment**, select `Deploy from a branch`, choose `main` branch and `/ (root)` folder, then click **Save**.
4. Your site will be live at `https://kanishkawasthi.github.io/portfolio/` within minutes!

### Option C: Deploying to Vercel
1. Install Vercel CLI or link via [Vercel Dashboard](https://vercel.com).
2. Run `vercel` in your terminal and select default options.
3. Your portfolio will deploy instantly with a free SSL certificate.

### Option D: Deploying to Netlify
1. Log in to [Netlify](https://netlify.com).
2. Drag and drop the `portfolio` directory directly into Netlify Sites, or connect your GitHub repository for automated continuous deployment.

---

## 📄 License
Created for **Kanishk Awasthi** &copy; 2025. All rights reserved.
