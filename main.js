const questions = [
    // Level 1: Basic (10 Qs)
    { q: "Capital of India?", a: "New Delhi", options: ["Mumbai", "New Delhi", "Goa", "Kochi"], level: 1 },
    { q: "Red Planet?", a: "Mars", options: ["Venus", "Mars", "Jupiter", "Earth"], level: 1 },
    { q: "Rainbow colors?", a: "7", options: ["5", "6", "7", "8"], level: 1 },
    { q: "Ship of Desert?", a: "Camel", options: ["Lion", "Camel", "Horse", "Zebra"], level: 1 },
    { q: "How many days in a leap year?", a: "366", options: ["364", "365", "366", "367"], level: 1 },
    { q: "Largest ocean?", a: "Pacific", options: ["Atlantic", "Indian", "Pacific", "Arctic"], level: 1 },
    { q: "Square root of 81?", a: "9", options: ["7", "8", "9", "10"], level: 1 },
    { q: "What gas do plants absorb?", a: "CO2", options: ["Oxygen", "CO2", "Nitrogen", "Hydrogen"], level: 1 },
    { q: "Fastest animal?", a: "Cheetah", options: ["Cheetah", "Lion", "Tiger", "Horse"], level: 1 },
    { q: "Wetter as it dries?", a: "Towel", options: ["Water", "Sun", "Towel", "Paper"], level: 1 },

    // Level 2: Intermediate (10 Qs)
    { q: "Cities but no houses?", a: "Map", options: ["Globe", "Map", "Book", "Mirror"], level: 2 },
    { q: "Neck but no head?", a: "Bottle", options: ["Shirt", "Bottle", "Guitar", "Spoon"], level: 2 },
    { q: "Keys but no locks?", a: "Keyboard", options: ["Piano", "Keyboard", "Door", "Map"], level: 2 },
    { q: "Used more by others than you?", a: "Name", options: ["Money", "Name", "Voice", "Car"], level: 2 },
    { q: "Holes but holds water?", a: "Sponge", options: ["Net", "Sponge", "Sieve", "Cloud"], level: 2 },
    { q: "Thumb and four fingers, not alive?", a: "Glove", options: ["Hand", "Glove", "Shadow", "Toy"], level: 2 },
    { q: "One eye but cannot see?", a: "Needle", options: ["Storm", "Needle", "Potato", "Bat"], level: 2 },
    { q: "Start/End with T, has T in it?", a: "Teapot", options: ["Teapot", "Ticket", "Target", "Tent"], level: 2 },
    { q: "Month with 28 days?", a: "All", options: ["Feb", "March", "All", "None"], level: 2 },
    { q: "More there is, less you see?", a: "Darkness", options: ["Fog", "Darkness", "Light", "Smoke"], level: 2 },

    // Level 3: Expert (10 Qs)
    { q: "Teeth but cannot bite?", a: "Comb", options: ["Saw", "Comb", "Zipper", "Gear"], level: 3 },
    { q: "Always in front of you?", a: "Future", options: ["Future", "Air", "Past", "Shadow"], level: 3 },
    { q: "World in a corner?", a: "Stamp", options: ["Bird", "Stamp", "Wind", "Plane"], level: 3 },
    { q: "Fragile that name breaks it?", a: "Silence", options: ["Silence", "Glass", "Secret", "Mirror"], level: 3 },
    { q: "One letter Envelope?", a: "Envelope", options: ["Eye", "Envelope", "Eagle", "Engine"], level: 3 },
    { q: "Words but never speaks?", a: "Book", options: ["Radio", "Book", "Map", "Mirror"], level: 3 },
    { q: "Up but never down?", a: "Age", options: ["Price", "Age", "Smoke", "Balloon"], level: 3 },
    { q: "Head/Tail but no body?", a: "Coin", options: ["Snake", "Coin", "Penny", "Arrow"], level: 3 },
    { q: "Feather can't be held?", a: "Breath", options: ["Air", "Breath", "Shadow", "Bubble"], level: 3 },
    { q: "Share it, it's gone?", a: "Secret", options: ["Money", "Secret", "Food", "Song"], level: 3 }
];

let currentLevel = 1, levelScore = 0, totalScore = 0, currentIdx = 0;
let levelQs = [], userAnswersReview = [], timer, timeLeft = 15;

const bgMusic = document.getElementById('bg-music');
const correctSnd = document.getElementById('correct-sound');
const wrongSnd = document.getElementById('wrong-sound');

function startQuiz() {
    bgMusic.volume = 0.2; bgMusic.play().catch(() => {});
    currentLevel = 1; totalScore = 0; userAnswersReview = [];
    loadLevel();
}

function loadLevel() {
    currentIdx = 0; levelScore = 0;
    levelQs = questions.filter(q => q.level === currentLevel).sort(() => Math.random() - 0.5);
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('level-pass-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    if(currentIdx >= 10) { checkStatus(); return; }
    resetTimer();
    let q = levelQs[currentIdx];
    let shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
    
    document.getElementById('progress').innerText = `L${currentLevel} | ${currentIdx+1}/10`;
    document.getElementById('question-text').innerText = q.q;
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    shuffledOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt; btn.className = 'option-btn';
        btn.onclick = (e) => selectAnswer(opt, e.target);
        container.appendChild(btn);
    });
}

function selectAnswer(choice, btn) {
    clearInterval(timer);
    let correct = levelQs[currentIdx].a;
    let isCorrect = (choice === correct);
    
    userAnswersReview.push({ q: levelQs[currentIdx].q, user: choice, correct: correct, status: isCorrect });

    if(isCorrect) { 
        levelScore++; totalScore++; btn.classList.add('correct-flash'); correctSnd.play(); 
    } else { 
        btn.classList.add('wrong-shake'); wrongSnd.play(); 
        Array.from(document.querySelectorAll('.option-btn')).forEach(b => {
            if(b.innerText === correct) b.classList.add('correct-flash');
        });
    }
    
    currentIdx++;
    setTimeout(showQuestion, 1000);
}

function checkStatus() {
    if (levelScore >= 7) { 
        if (currentLevel < 3) {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            document.getElementById('quiz-screen').classList.add('hidden');
            document.getElementById('level-pass-screen').classList.remove('hidden');
            document.getElementById('pass-msg').innerText = `Level ${currentLevel} Done! Score: ${levelScore}/10`;
            document.querySelector('#level-pass-screen button').innerText = `ENTER LEVEL ${currentLevel + 1}`;
        } else { 
            triggerFinalWin();
            showResults("🏆 QUIZ MASTER!", true); 
        }
    } else { showResults("GAME OVER ❌", false); }
}

function triggerFinalWin() {
    var end = Date.now() + (3 * 1000);
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
}

function startNextLevel() { currentLevel++; loadLevel(); }

function showResults(title, isWin) {
    bgMusic.pause();
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('level-pass-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('result-title').innerText = title;
    document.getElementById('final-score').innerText = `TOTAL: ${totalScore}/30`;

    const reviewBox = document.getElementById('review-container');
    reviewBox.innerHTML = "";
    userAnswersReview.forEach((item, i) => {
        reviewBox.innerHTML += `<div class="review-item" style="border-left: 5px solid ${item.status ? '#27ae60' : '#e74c3c'}">
            <p><strong>Q:</strong> ${item.q}</p>
            <p style="color: ${item.status ? '#27ae60' : '#e74c3c'}">Your: ${item.user}</p>
            <p style="color: #27ae60">Correct: ${item.correct}</p>
        </div>`;
    });
}

function resetTimer() {
    clearInterval(timer); timeLeft = 15;
    document.getElementById('timer').innerText = `⏱ ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--; document.getElementById('timer').innerText = `⏱ ${timeLeft}s`;
        if(timeLeft <= 0) selectAnswer("Time Out", {classList: {add: () => {}}});
    }, 1000);
}
