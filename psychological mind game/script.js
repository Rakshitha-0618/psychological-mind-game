// ==================== GLOBAL VARIABLES ====================

// Memory Game Variables
let memorySequence = "";

// Reaction Test Variables
let reactionStartTime = null;
let reactionTimeout = null;

// Quiz Variables
let quizCurrent = 0;
let quizExtrovert = 0;
let quizIntrovert = 0;
const quizQuestions = [
    "Do you enjoy social gatherings and parties?",
    "Do you prefer working in a team rather than alone?",
    "Do you like meeting new people?",
    "Do you feel energized after talking to others?",
    "Do you enjoy being the center of attention?"
];

// Mind Reader Variables
let mindReaderStep = 0;

// Canvas Animation Variables
let animationFrameId = null;

// ==================== FIXED SOUND FUNCTIONS ====================

// Initialize audio elements and ensure they work
let audioInitialized = false;

function initAudio() {
    if (!audioInitialized) {
        let clickSound = document.getElementById("clickSound");
        let winSound = document.getElementById("winSound");
        let startSound = document.getElementById("startSound");
        
        // Load and prepare audio
        if (clickSound) clickSound.load();
        if (winSound) winSound.load();
        if (startSound) startSound.load();
        
        audioInitialized = true;
        console.log("Audio initialized");
    }
}

// Auto-initialize on first user click
document.body.addEventListener('click', function initOnFirstClick() {
    initAudio();
    // Resume any suspended audio contexts
    let clickSound = document.getElementById("clickSound");
    if (clickSound && clickSound.play) {
        clickSound.play().then(() => {
            clickSound.pause();
            clickSound.currentTime = 0;
        }).catch(e => console.log("Audio resume:", e));
    }
    document.body.removeEventListener('click', initOnFirstClick);
}, { once: true });

function playClick() {
    try {
        initAudio();
        let click = document.getElementById("clickSound");
        if (click) {
            click.currentTime = 0;
            let playPromise = click.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => console.log("Click sound error:", e));
            }
        }
    } catch(e) { console.log("Click error:", e); }
}

function playStart() {
    try {
        initAudio();
        let start = document.getElementById("startSound");
        if (start) {
            start.currentTime = 0;
            let playPromise = start.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => console.log("Start sound error:", e));
            }
        }
    } catch(e) { console.log("Start error:", e); }
}

function playWin() {
    try {
        initAudio();
        let win = document.getElementById("winSound");
        if (win) {
            win.currentTime = 0;
            let playPromise = win.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => console.log("Win sound error:", e));
            }
        }
    } catch(e) { console.log("Win error:", e); }
}

// ==================== CELEBRATION EFFECT ====================

function celebrate() {
    if (typeof confetti !== "undefined") {
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#a78bfa', '#6c5ce7', '#f472b6', '#60a5fa', '#22c55e']
        });
        
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#a78bfa', '#6c5ce7']
            });
        }, 150);
    }
    playWin();
}

// ==================== PAGE LOADER ====================

window.addEventListener("load", function() {
    setTimeout(() => {
        document.body.classList.add("loaded");
    }, 500);
    
    setActiveNavLink();
    
    if (document.getElementById("question")) {
        loadQuizQuestion();
    }
    
    // Initialize canvas backgrounds based on page theme
    initBrainCanvases();
    
    // Pre-load audio files
    initAudio();
});

function setActiveNavLink() {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage || (currentPage === "" && href === "index.html")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// ==================== BRAIN CANVAS ANIMATIONS ====================

function initBrainCanvases() {
    const bodyClass = document.body.className;
    
    if (bodyClass.includes('theme-home')) {
        initBrainNeuralNetwork('brainCanvas');
    } else if (bodyClass.includes('theme-memory')) {
        initBrainNeuralNetwork('neuronCanvas');
    } else if (bodyClass.includes('theme-mindreader')) {
        initMysticBrain('mysticCanvas');
    } else if (bodyClass.includes('theme-reaction')) {
        initLightningBrain('lightningCanvas');
    } else if (bodyClass.includes('theme-quiz')) {
        initPsychologyBrain('psychologyCanvas');
    } else if (bodyClass.includes('theme-about')) {
        initKnowledgeBrain('knowledgeCanvas');
    }
}

function initBrainNeuralNetwork(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    // Create neural network nodes
    const nodes = [];
    const nodeCount = 50;
    
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 2,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }
    
    function drawBrainNetwork() {
        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw neural connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    const opacity = 0.2 * (1 - distance / 150);
                    ctx.strokeStyle = `rgba(108, 92, 231, ${opacity})`;
                    ctx.lineWidth = 1.5;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw neuron nodes
        for (let node of nodes) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(108, 92, 231, 0.7)`;
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Update positions
            node.x += node.vx;
            node.y += node.vy;
            
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        }
        
        animationFrameId = requestAnimationFrame(drawBrainNetwork);
    }
    
    drawBrainNetwork();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function initMysticBrain(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    const stars = [];
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            alpha: Math.random() * 0.6 + 0.3,
            speed: Math.random() * 0.02 + 0.005
        });
    }
    
    function drawMysticBrain() {
        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw brain silhouette outline
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(167, 139, 250, 0.3)';
        ctx.lineWidth = 2;
        // Simple brain shape outline
        ctx.ellipse(canvas.width / 2, canvas.height / 2, 150, 180, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        // Draw stars
        for (let star of stars) {
            ctx.beginPath();
            const twinkle = Math.sin(Date.now() * star.speed) * 0.3;
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.9, Math.max(0.2, star.alpha + twinkle))})`;
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        animationFrameId = requestAnimationFrame(drawMysticBrain);
    }
    
    drawMysticBrain();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function initLightningBrain(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    let time = 0;
    
    function drawLightningBrain() {
        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        time++;
        
        // Draw brain lightning bolts
        if (time % 30 === 0 && Math.random() > 0.7) {
            const startX = canvas.width / 2 + (Math.random() - 0.5) * 100;
            const startY = 0;
            let x = startX;
            let y = startY;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.strokeStyle = `rgba(239, 68, 68, ${Math.random() * 0.6 + 0.3})`;
            ctx.lineWidth = 3;
            
            while (y < canvas.height) {
                x += (Math.random() - 0.5) * 40;
                y += 25;
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
        
        // Draw brain silhouette
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
        ctx.lineWidth = 2;
        ctx.ellipse(canvas.width / 2, canvas.height / 2, 140, 170, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        animationFrameId = requestAnimationFrame(drawLightningBrain);
    }
    
    drawLightningBrain();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function initPsychologyBrain(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    let time = 0;
    
    function drawPsychologyBrain() {
        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        time++;
        
        // Draw floating thought bubbles
        for (let i = 0; i < 15; i++) {
            const x = (canvas.width / 2) + Math.sin(time * 0.002 + i) * 100;
            const y = (canvas.height / 2) + Math.cos(time * 0.0015 + i) * 80;
            ctx.beginPath();
            ctx.fillStyle = `rgba(6, 182, 212, 0.1)`;
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = `rgba(6, 182, 212, 0.3)`;
            ctx.arc(x - 5, y - 5, 5, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw brain outline
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.lineWidth = 2;
        ctx.ellipse(canvas.width / 2, canvas.height / 2, 150, 180, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        animationFrameId = requestAnimationFrame(drawPsychologyBrain);
    }
    
    drawPsychologyBrain();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function initKnowledgeBrain(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    function drawKnowledgeBrain() {
        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw floating book-like shapes
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            ctx.beginPath();
            ctx.fillStyle = `rgba(167, 139, 250, 0.05)`;
            ctx.fillRect(x, y, 15, 20);
        }
        
        // Draw brain outline with knowledge rays
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(167, 139, 250, 0.5)';
        ctx.lineWidth = 2;
        ctx.ellipse(canvas.width / 2, canvas.height / 2, 150, 170, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        animationFrameId = requestAnimationFrame(drawKnowledgeBrain);
    }
    
    drawKnowledgeBrain();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ==================== PROGRESS BAR ====================

function updateProgress(value) {
    const progressBar = document.getElementById("progressBar");
    if (progressBar) {
        let percent = Math.min(Math.max(value, 0), 100);
        progressBar.style.width = percent + "%";
        progressBar.innerText = Math.floor(percent) + "%";
    }
}

function animateProgress(target, duration = 500) {
    let startValue = parseFloat(document.getElementById("progressBar")?.style.width || "0");
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = startValue + (target - startValue) * progress;
        updateProgress(value);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// ==================== MEMORY GAME ====================

function startMemoryGame() {
    playClick();
    playStart();
    animateProgress(20);
    
    memorySequence = "";
    for(let i = 0; i < 5; i++) {
        memorySequence += Math.floor(Math.random() * 10);
    }
    
    const display = document.getElementById("sequenceDisplay");
    const resultDiv = document.getElementById("memoryResult");
    
    if (display) {
        display.innerText = memorySequence;
        display.style.fontSize = "3rem";
        display.style.letterSpacing = "0.5rem";
        
        animateProgress(50);
        
        setTimeout(() => {
            display.innerText = "???";
            display.style.fontSize = "2rem";
            display.style.letterSpacing = "normal";
            
            animateProgress(80);
            
            setTimeout(() => {
                animateProgress(100);
                let userInput = prompt("Enter the sequence you saw:");
                
                if (userInput === memorySequence) {
                    celebrate();
                    resultDiv.innerHTML = `
                        <div class="alert alert-success">
                            <i class="fas fa-trophy me-2"></i>
                            <strong>✅ Perfect!</strong> Great memory! Score: 100/100
                        </div>
                    `;
                } else {
                    resultDiv.innerHTML = `
                        <div class="alert alert-danger">
                            <i class="fas fa-times-circle me-2"></i>
                            <strong>❌ Wrong!</strong> Correct sequence was: ${memorySequence}
                        </div>
                    `;
                }
            }, 500);
        }, 3000);
    }
}

// ==================== MIND READER GAME ====================

function startGame() {
    playClick();
    playStart();
    mindReaderStep = 0;
    animateProgress(10);
    step2();
}

function step2() {
    playClick();
    animateProgress(25);
    const gameArea = document.getElementById("gameArea");
    if (gameArea) {
        gameArea.innerHTML = `
            <p class="lead">Step 1: Multiply your number by 2</p>
            <button class="btn btn-custom mt-3" onclick="step3()">
                <i class="fas fa-arrow-right me-2"></i>Next Step
            </button>
        `;
    }
}

function step3() {
    playClick();
    animateProgress(50);
    const gameArea = document.getElementById("gameArea");
    if (gameArea) {
        gameArea.innerHTML = `
            <p class="lead">Step 2: Add 5 to your number</p>
            <button class="btn btn-custom mt-3" onclick="step4()">
                <i class="fas fa-arrow-right me-2"></i>Next Step
            </button>
        `;
    }
}

function step4() {
    playClick();
    animateProgress(75);
    const gameArea = document.getElementById("gameArea");
    if (gameArea) {
        gameArea.innerHTML = `
            <p class="lead">Step 3: Multiply the result by 5</p>
            <button class="btn btn-custom mt-3" onclick="calculateMind()">
                <i class="fas fa-calculator me-2"></i>Calculate Result
            </button>
        `;
    }
}

function calculateMind() {
    playClick();
    animateProgress(90);
    const gameArea = document.getElementById("gameArea");
    if (gameArea) {
        gameArea.innerHTML = `
            <p class="lead">Step 4: Enter your final number:</p>
            <input type="number" id="finalValue" class="form-control w-50 mx-auto mb-3" placeholder="Enter your result">
            <button class="btn btn-custom" onclick="revealNumber()">
                <i class="fas fa-magic me-2"></i>Reveal My Number!
            </button>
        `;
    }
}

function revealNumber() {
    let val = parseInt(document.getElementById("finalValue").value);
    
    if (isNaN(val)) {
        alert("Please enter a valid number!");
        return;
    }
    
    let original = (val - 25) / 10;
    
    if (!Number.isInteger(original) || original < 1 || original > 10) {
        document.getElementById("gameArea").innerHTML = `
            <div class="alert alert-warning">
                <i class="fas fa-exclamation-triangle me-2"></i>
                ⚠️ Please follow the steps correctly with a number between 1-10!
            </div>
            <button class="btn btn-outline-custom mt-3" onclick="location.reload()">
                <i class="fas fa-redo me-2"></i>Try Again
            </button>
        `;
        return;
    }
    
    animateProgress(100);
    celebrate();
    
    document.getElementById("gameArea").innerHTML = `
        <div class="alert alert-success">
            <i class="fas fa-brain fa-3x mb-3"></i>
            <h3 class="mt-2">🤯 I read your mind!</h3>
            <p class="display-3 fw-bold">${original}</p>
            <p>That was your original number!</p>
        </div>
        <button class="btn btn-custom mt-3" onclick="location.reload()">
            <i class="fas fa-play me-2"></i>Play Again
        </button>
    `;
}

// ==================== REACTION TEST ====================

function startTest() {
    playClick();
    playStart();
    animateProgress(30);
    
    const box = document.getElementById("reactionBox");
    const result = document.getElementById("result");
    
    if (!box || !result) return;
    
    result.innerHTML = '<div class="alert alert-info">⏳ Wait for the GREEN color...</div>';
    box.style.background = "#2d2b55";
    box.innerHTML = "<span>⏳ Wait for GREEN...</span>";
    box.style.cursor = "not-allowed";
    reactionStartTime = null;
    
    if (reactionTimeout) clearTimeout(reactionTimeout);
    
    let delay = Math.random() * 3000 + 1000;
    
    reactionTimeout = setTimeout(() => {
        animateProgress(100);
        box.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
        box.innerHTML = "<span>🔥 CLICK NOW! 🔥</span>";
        box.style.cursor = "pointer";
        reactionStartTime = new Date().getTime();
        result.innerHTML = '<div class="alert alert-success">🟢 CLICK NOW! The box is GREEN!</div>';
    }, delay);
}

function stopTest() {
    const box = document.getElementById("reactionBox");
    const result = document.getElementById("result");
    
    if (!reactionStartTime) {
        result.innerHTML = '<div class="alert alert-warning">⚠️ Too early! Wait for the green color!</div>';
        return;
    }
    
    let reactionTime = (new Date().getTime() - reactionStartTime) / 1000;
    let message = "";
    
    if (reactionTime < 0.2) {
        message = "🏆 EXCELLENT! Superhuman reflexes! 🏆";
        celebrate();
    } else if (reactionTime < 0.3) {
        message = "⚡ AMAZING! Lightning fast reflexes! ⚡";
        celebrate();
    } else if (reactionTime < 0.4) {
        message = "👍 Great reflexes! Keep practicing!";
    } else if (reactionTime < 0.6) {
        message = "📈 Good effort! Try to beat your record!";
    } else {
        message = "🐢 Need more practice! Focus and try again!";
    }
    
    result.innerHTML = `
        <div class="alert alert-info">
            <i class="fas fa-stopwatch me-2"></i>
            <strong>Your reaction time: ${reactionTime.toFixed(3)} seconds</strong><br>
            ${message}
        </div>
    `;
    
    box.style.background = "#2d2b55";
    box.innerHTML = "<span>⚡ Click Start to try again</span>";
    box.style.cursor = "pointer";
    reactionStartTime = null;
    
    if (reactionTimeout) clearTimeout(reactionTimeout);
}

// ==================== PERSONALITY QUIZ ====================

function loadQuizQuestion() {
    if (quizCurrent < quizQuestions.length) {
        const questionEl = document.getElementById("question");
        if (questionEl) {
            questionEl.innerHTML = `<i class="fas fa-question-circle me-2"></i>${quizQuestions[quizCurrent]}`;
            let percent = (quizCurrent / quizQuestions.length) * 100;
            updateProgress(percent);
        }
    }
}

function selectAnswer(type) {
    playClick();
    
    if (type === 'extrovert') {
        quizExtrovert++;
    } else {
        quizIntrovert++;
    }
    
    quizCurrent++;
    
    let percent = (quizCurrent / quizQuestions.length) * 100;
    animateProgress(percent);
    
    if (quizCurrent < quizQuestions.length) {
        loadQuizQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    const quizContainer = document.getElementById("quizContainer");
    
    let resultText = "";
    let resultIcon = "";
    let resultColor = "";
    
    if (quizExtrovert > quizIntrovert) {
        resultText = "You are an EXTROVERT!";
        resultIcon = "🎉";
        resultColor = "success";
    } else if (quizIntrovert > quizExtrovert) {
        resultText = "You are an INTROVERT!";
        resultIcon = "🧘";
        resultColor = "info";
    } else {
        resultText = "You are AMBIVERT! (Balanced personality)";
        resultIcon = "⚖️";
        resultColor = "warning";
    }
    
    celebrate();
    
    if (quizContainer) {
        quizContainer.innerHTML = `
            <div class="alert alert-${resultColor}">
                <i class="fas fa-chart-bar fa-2x mb-2"></i>
                <h3>${resultIcon} ${resultText}</h3>
                <hr>
                <p><strong>Extrovert Score:</strong> ${quizExtrovert} | <strong>Introvert Score:</strong> ${quizIntrovert}</p>
                <p>${quizExtrovert > quizIntrovert ? "You thrive on social interaction and gain energy from others!" : "You enjoy deep thinking, solitude, and meaningful conversations!"}</p>
            </div>
            <button class="btn btn-custom mt-3" onclick="resetQuiz()">
                <i class="fas fa-redo me-2"></i>Take Quiz Again
            </button>
        `;
    }
}

function resetQuiz() {
    playClick();
    quizCurrent = 0;
    quizExtrovert = 0;
    quizIntrovert = 0;
    updateProgress(0);
    
    const quizContainer = document.getElementById("quizContainer");
    if (quizContainer) {
        quizContainer.innerHTML = `
            <div id="question" class="lead mb-4"></div>
            <div>
                <button class="btn btn-custom me-3" onclick="selectAnswer('extrovert')">
                    <i class="fas fa-thumbs-up me-2"></i>Yes / Agree
                </button>
                <button class="btn btn-outline-custom" onclick="selectAnswer('introvert')">
                    <i class="fas fa-thumbs-down me-2"></i>No / Disagree
                </button>
            </div>
        `;
    }
    
    const quizResult = document.getElementById("quizResult");
    if (quizResult) {
        quizResult.innerHTML = "";
    }
    
    loadQuizQuestion();
}

// ==================== EXPOSE FUNCTIONS TO GLOBAL ====================

window.playClick = playClick;
window.startMemoryGame = startMemoryGame;
window.startGame = startGame;
window.step2 = step2;
window.step3 = step3;
window.step4 = step4;
window.calculateMind = calculateMind;
window.revealNumber = revealNumber;
window.startTest = startTest;
window.stopTest = stopTest;
window.selectAnswer = selectAnswer;
window.resetQuiz = resetQuiz;
window.updateProgress = updateProgress;
window.animateProgress = animateProgress;