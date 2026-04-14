# psychological-mind-game
Psychological Mind Games is an interactive web platform featuring 4 cognitive games - Memory Challenge, Mind Reader, Reaction Test &amp; Personality Quiz. Built with HTML, CSS, JavaScript &amp; Bootstrap, it includes user login, friend comparison, leaderboard, achievements &amp; real-time sound effects for an engaging brain training experience.
🎮 Games Included

| Game | Icon | Description | Cognitive Skill |
|------|------|-------------|-----------------|
| Memory Game | 🧩 | Recall 5-digit number sequences | Short-term Memory |
| Mind Reader | 🔮 | Mathematical psychology trick | Pattern Recognition |
| Reaction Test | ⚡ | Click when box turns green | Reflex Speed |
| Personality Quiz | 📊 | 5-question personality assessment | Self-awareness |

---

## ✨ Features

### 👤 User System
| Feature | Description |
|---------|-------------|
| Login / Registration | Secure user authentication |
| User Profiles | Personalized user dashboard |
| Friend System | Add and compare with friends |
| Global Leaderboard | Worldwide rankings |
| Friends Leaderboard | Compare with friends only |
| Achievement Badges | Unlockable rewards |

### 🎨 Visual Features
| Feature | Description |
|---------|-------------|
| Glassmorphism UI | Frosted glass card effects |
| Neural Network BG | Animated neuron connections |
| Mystic Stars | Twinkling stars for Mind Reader |
| Lightning Bolts | Random lightning for Reaction Test |
| Floating Thought Bubbles | Psychology theme animation |
| Confetti Celebration | Particle explosion on wins |

### 🔊 Audio Features
| Sound | When Played |
|-------|-------------|
| Click Sound | Every button click |
| Start Sound | Game initialization |
| Win Sound | Victory celebration |
| Error Sound | Wrong answer feedback |

### 📱 Technical Features
| Feature | Description |
|---------|-------------|
| Responsive Design | Works on mobile, tablet, desktop |
| LocalStorage | Data persistence without backend |
| Progress Tracking | Dashboard with statistics |
| Game Modes | Single Player & Multiplayer |
| PWA Ready | Can be installed as app |

---

## 🛠️ Technologies Used

```bash
Frontend:
├── HTML5          - Structure & Semantics
├── CSS3           - Styling, Animations, Glassmorphism
├── JavaScript ES6 - Game Logic & Interactivity
├── Bootstrap 5    - Responsive Grid System
└── Font Awesome 6 - Icons & Visual Elements

APIs & Libraries:
├── Canvas API     - Neural Network & Star Animations
├── Web Audio API  - Sound Generation (Fallback)
├── Canvas Confetti- Celebration Effects
├── Chart.js       - Performance Graphs
└── LocalStorage   - User Data Persistence

Game Mechanics:
├── Random Sequence Generation
├── Mathematical Algorithm (Mind Reader)
├── Timer & Reaction Speed Calculation
└── Score Tracking & Quiz Logic
📁 Project Structure
text
psychological-mind-games/
│
├── 📄 index.html          # Landing Page
├── 📄 login.html          # User Authentication
├── 📄 dashboard.html      # User Dashboard
├── 📄 game-select.html    # Game Mode Selection
├── 📄 memory.html         # Memory Game
├── 📄 mindreader.html     # Mind Reader Game
├── 📄 reaction.html       # Reaction Test
├── 📄 quiz.html           # Personality Quiz
├── 📄 leaderboard.html    # Global & Friends Rankings
├── 📄 profile.html        # User Profile
├── 📄 about.html          # Project Information
├── 🎨 style.css           # Custom Styling
├── ⚡ script.js           # Game Logic & User System
│
├── 📁 sounds/             # Audio Files
│   ├── 🔊 click.mp3
│   ├── 🏆 win.mp3
│   └── 🎵 start.mp3
│
└── 📁 images/             # Screenshots (optional)
🚀 Installation & Setup
Prerequisites
Any modern web browser (Chrome, Firefox, Edge, Safari)

No server required - works locally!

Steps to Run
Clone or Download the project

bash
git clone https://github.com/yourusername/psychological-mind-games.git
cd psychological-mind-games
Open the application

Double-click index.html OR

Use Live Server in VS Code (Right-click → Open with Live Server)

Create an account or use demo credentials

text
┌─────────────┬──────────┬─────────────┐
│ Username    │ Password │ Role        │
├─────────────┼──────────┼─────────────┤
│ MindMaster  │ 123456   │ Top Player  │
│ Brainiac    │ 123456   │ Mid Player  │
│ SpeedKing   │ 123456   │ New Player  │
└─────────────┴──────────┴─────────────┘
🎯 How to Play Each Game
1️⃣ Memory Game
text
Step 1: Click "Start Game"
Step 2: Watch the 5-digit sequence (appears for 3 seconds)
Step 3: Sequence disappears (shows "???")
Step 4: Enter the sequence in the prompt
Step 5: Get points and confetti for correct answer!
2️⃣ Mind Reader (Mathematical Trick)
text
Step 1: Think of any number between 1-10
Step 2: Multiply your number by 2
Step 3: Add 5 to the result
Step 4: Multiply the result by 5
Step 5: Enter your final number
Step 6: Watch the magic reveal your original number!

Formula: Original Number = (Final Number - 25) / 10
3️⃣ Reaction Test
text
Step 1: Click "Start Test"
Step 2: Wait for the box to turn GREEN (random delay 1-4 seconds)
Step 3: Click immediately when GREEN appears
Step 4: See your reaction time in milliseconds
Step 5: Try to beat your personal best!

🏆 Excellent: < 200ms
👍 Good: 200-400ms
🐢 Needs Practice: > 400ms
4️⃣ Personality Quiz
text
Step 1: Answer 5 questions about social situations
Step 2: Click YES or NO for each question
Step 3: Get your personality result
Step 4: Share with friends!

Results: Extrovert, Introvert, or Ambivert
📊 User Dashboard Features
Section	Description
Welcome Card	Personalized greeting with rank & level
Statistics Cards	Games played, wins, average score, best game
Performance Chart	Line graph showing progress over time
Recent Games	History of last 10 games played
Friend Comparison	Compare your scores with friends
Achievements	Unlocked badges and progress
