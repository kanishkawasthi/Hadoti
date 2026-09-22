/**
 * Portfolio Configuration Data for Kanishk Awasthi
 * 
 * Instructions:
 * - Update personal details, social links, resume URL, or project info directly in this object.
 * - The contact form validates its fields and opens the visitor's default mail client via mailto.
 */

const PORTFOLIO_DATA = {
  personal: {
    name: "Kanishk Awasthi",
    role: "B.Tech CSE Student | Web Developer | Aspiring Entrepreneur",
    typingTaglines: [
      "B.Tech CSE Student",
      "Web Developer",
      "Problem Solver",
      "Aspiring Entrepreneur"
    ],
    email: "kanishkavasthi@gmail.com",
    phone: "+91-8209146971",
    linkedin: "https://www.linkedin.com/in/kanishk-avasthi",
    github: "https://github.com/kanishkawasthi",
    location: "Phagwara, Punjab, India",
    bio: "I am a Computer Science & Engineering undergraduate at Lovely Professional University with hands-on experience in full-stack web development (React.js, Node.js, Express.js, MongoDB), algorithm design, and core software structures (C++, Python, Java). Interested in building real-world solutions and exploring entrepreneurial ventures.",
    resumeUrl: "assets/resume.pdf",
    
  },

  stats: [
    { label: "Core Projects", value: "2", suffix: "Full-Stack & DSA", icon: "code" },
    { label: "Current CGPA", value: "7.03", suffix: "at LPU", icon: "academic" },
    { label: "Certifications", value: "4", suffix: "Earned", icon: "certificate" },
    { label: "Location", value: "Punjab", suffix: "India", icon: "location" }
  ],

  skills: {
    languages: [
      { name: "C++", level: 90, badge: "Advanced", icon: "devicon-cplusplus-plain" },
      { name: "Python", level: 88, badge: "Advanced", icon: "devicon-python-plain" },
      { name: "C", level: 82, badge: "Intermediate", icon: "devicon-c-plain" },
      { name: "Java", level: 80, badge: "Intermediate", icon: "devicon-java-plain" },
      { name: "JavaScript", level: 88, badge: "Advanced", icon: "devicon-javascript-plain" }
    ],
    web: [
      { name: "HTML", level: 95, badge: "Expert", icon: "devicon-html5-plain" },
      { name: "CSS", level: 90, badge: "Advanced", icon: "devicon-css3-plain" },
      { name: "JavaScript", level: 88, badge: "Advanced", icon: "devicon-javascript-plain" },
      { name: "React.js", level: 85, badge: "Frontend", icon: "devicon-react-original" },
      { name: "Node.js", level: 82, badge: "Backend", icon: "devicon-nodejs-plain" },
      { name: "Express.js", level: 80, badge: "Framework", icon: "devicon-express-original" }
    ],
    tools: [
      { name: "MongoDB", level: 80, badge: "Database", icon: "devicon-mongodb-plain" },
      { name: "Git", level: 88, badge: "Version Control", icon: "devicon-git-plain" },
      { name: "GitHub", level: 90, badge: "Platform", icon: "devicon-github-original" },
      { name: "Postman", level: 85, badge: "API Testing", icon: "devicon-postman-plain" },
      { name: "Vercel", level: 85, badge: "Deployment", icon: "fas fa-cloud-upload-alt" }
    ],
    softSkills: [
      { name: "Problem-Solving", desc: "Analytical approach to breaking down complex DSA and full-stack software challenges", icon: "fas fa-puzzle-piece" },
      { name: "Team Player", desc: "Collaborative mindset with clear technical and peer communication", icon: "fas fa-users" },
      { name: "Adaptability", desc: "Rapidly mastering new technologies, frameworks, and paradigms", icon: "fas fa-sync-alt" }
    ]
  },

  projects: [
    {
      id: "jeep-club",
      title: "Jeep Club & Off-Road Event Management System",
      year: "2026",
      status: "⭐ Lead Academic Project",
      featured: true,
      description: "Designed and implemented a full-stack club management system using custom Singly Linked List and Queue data structures to handle member records and event waitlists, replacing array-based storage for O(1) insertion/deletion efficiency.",
      tech: ["C++", "JavaScript", "HTML/CSS", "Node.js", "DSA"],
      features: [
        "Full-stack club management system using custom Singly Linked List and Queue data structures for member records & event waitlists (O(1) insertion/deletion vs array storage)",
        "FIFO waitlist mechanism that automatically promotes the next eligible member when a registration is cancelled — fair, real-time seat allocation across concurrent events",
        "Parallel implementations: JavaScript (browser UI with persistent localStorage) and C++ (CLI application) demonstrating consistent DSA logic across platforms",
        "Lightweight Node.js static server for local hosting; modular Member/Event/Registration entities supporting create, update, delete, and search operations",
        "Dashboard with live tracking of member counts, active events, registrations, waitlist status, plus a full audit history log of registration activity"
      ],
      github: "https://github.com/kanishkawasthi",
      liveDemo: "#",
      type: "completed"
    },
    {
      id: "music-player",
      title: "MY Music Player",
      year: "2024",
      status: "Featured Web App",
      featured: false,
      description: "A Music Web page created by using technologies like VS Code as a platform and languages like HTML, CSS, JavaScript. Allows users to play/pause music, select favorite tracks with speed control, download songs, and play all queue in one click.",
      tech: ["HTML", "CSS", "JavaScript"],
      features: [
        "Play, pause, track seeking, and favorite track selection",
        "Dynamic playback speed control (0.5x to 2.0x)",
        "Instant track download capability",
        "One-click 'Play All' queue continuous playback"
      ],
      github: "https://github.com/kanishkawasthi",
      liveDemo: "#",
      type: "completed"
    },
    {
      id: "fullstack-platform",
      title: "Full-Stack Web Application",
      year: "Coming Soon",
      status: "In Development",
      featured: false,
      description: "Upcoming full-stack web application built with React.js, Node.js, Express.js, and MongoDB.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
      features: [
        "RESTful API integration with Postman testing",
        "Responsive React.js user interface",
        "MongoDB database persistence"
      ],
      github: "https://github.com/kanishkawasthi",
      liveDemo: "#",
      type: "placeholder"
    }
  ],

  training: [
    {
      title: "Summer Training — C++ & Data Structures",
      institution: "Lovely Professional University (LPU)",
      period: "Summer 2026",
      icon: "fas fa-code-branch",
      bullets: [
        "Strengthened core C++ programming concepts including OOP, structures, pointers, dynamic memory allocation, and problem-solving through hands-on implementation",
        "Implemented and applied fundamental Data Structures and Algorithms, including Singly Linked Lists and FIFO Queues, with operations such as insertion, deletion, searching, traversal, enqueue, and dequeue",
        "Developed a Jeep Club & Off-Road Event Management System using C++ to demonstrate practical applications of DSA, including member management, event registration, and automated FIFO-based waiting-list management",
        "Analyzed time complexity of major data-structure operations and practiced efficient algorithm design, debugging, testing, and memory management"
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Technology (B.Tech) - Computer Science & Engineering",
      institution: "Lovely Professional University",
      location: "Phagwara, Punjab",
      period: "Aug '26 – Present",
      score: "CGPA: 7.03",
      highlight: "Undergraduate Study",
      description: "Specializing in Data Structures, Algorithms, Software Engineering, and Full-Stack Web Development.",
      icon: "fas fa-user-graduate"
    },
    {
      degree: "Senior Secondary (12th Grade - PCM)",
      institution: "Carrier Point School",
      location: "Sawai Madhopur, Rajasthan",
      period: "July '22 – May '23",
      score: "74.60%",
      highlight: "Senior Secondary",
      description: "Completed Senior Secondary science stream with specialization in Physics, Chemistry, and Mathematics (PCM).",
      icon: "fas fa-school"
    },
    {
      degree: "Secondary School (10th Grade)",
      institution: "Sawai Madhopur, Rajasthan",
      period: "July '20 – May '21",
      score: "90.0%",
      highlight: "Matriculation",
      description: "Achieved outstanding academic distinction with 90.0% aggregate score.",
      icon: "fas fa-award"
    }
  ],

  certifications: [
    {
      title: "Data Structures and Logic Building",
      issuer: "Lovely Professional University (LPU)",
      date: "Aug '26",
      icon: "fas fa-brain",
      skills: ["Data Structures", "Algorithm Logic", "C++"]
    },
    {
      title: "Programming Using C++",
      issuer: "Infosys Springboard",
      date: "Aug '25",
      icon: "fas fa-code",
      skills: ["C++ OOP", "Pointers & Memory", "STL"]
    },
    {
      title: "Cyber Smart",
      issuer: "WNS Cares Foundation",
      date: "Jul '25",
      icon: "fas fa-shield-alt",
      skills: ["Cyber Security", "Digital Safety", "Best Practices"]
    },
    {
      title: "Linux Commands and Shell Scripting",
      issuer: "Skillera",
      date: "Nov '24",
      icon: "fab fa-linux",
      skills: ["Linux CLI", "Shell Scripting", "Terminal Operations"]
    }
  ]
};
