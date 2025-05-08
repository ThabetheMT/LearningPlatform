// script.js

// Audio control functions
const audio = document.getElementById('shark-audio');

function playAudio() {
    if (audio) audio.play();
}

function pauseAudio() {
    if (audio) audio.pause();
}

function restartAudio() {
    if (audio) {
        audio.currentTime = 0; // Reset to start
        audio.play(); // Start playing from beginning
    }
}

// Confetti effect for bonus question
function triggerConfetti() {
    const colors = ['#ff0000', '#ffff00', '#1e90ff', '#32cd32', '#87ceeb', '#4682b4'];
    const numConfetti = 100;

    for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const x = (Math.random() - 0.5) * 600 + 'px';
        const y = (Math.random() - 0.5) * 400 + 'px';
        const rotate = Math.random() * 720 + 'deg';
        
        confetti.style.setProperty('--x', x);
        confetti.style.setProperty('--y', y);
        confetti.style.setProperty('--rotate', rotate);
        
        document.body.appendChild(confetti);
    }

    setTimeout(() => {
        const confettiElements = document.querySelectorAll('.confetti');
        confettiElements.forEach(element => element.remove());
    }, 4000);
}

// Save answer to localStorage
function saveAnswer(question, answer) {
    localStorage.setItem(question, answer);
}

// Load answer from localStorage
function loadAnswer(question) {
    return localStorage.getItem(question) || '';
}

// Timer functions
const TOTAL_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds

function startTimer() {
    const startTime = Date.now();
    localStorage.setItem('quizStartTime', startTime);
}

function getRemainingTime() {
    const startTime = localStorage.getItem('quizStartTime');
    if (!startTime) return TOTAL_TIME; // Timer hasn't started yet

    const elapsedTime = Date.now() - parseInt(startTime);
    const remainingTime = TOTAL_TIME - elapsedTime;
    return Math.max(0, remainingTime); // Ensure it doesn't go negative
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    if (!timerElement) return; // Skip if timer element doesn't exist (e.g., on index.html)

    const remainingTime = getRemainingTime();
    timerElement.textContent = `Time Remaining: ${formatTime(remainingTime)}`;

    if (remainingTime <= 0) {
        // Timer has run out, redirect to results
        window.location.href = 'results.html';
    } else {
        // Continue updating the timer every second
        setTimeout(updateTimer, 1000);
    }
}
// Toggle radio button options visibility
function toggleOptions(questionNumber) {
    const options = document.getElementById(`options-${questionNumber}`);
    const icon = document.getElementById(`icon-${questionNumber}`);
    if (options.classList.contains('visible')) {
        options.classList.remove('visible');
        icon.textContent = '👁️'; // Eye icon (closed/hidden)
    } else {
        options.classList.add('visible');
        icon.textContent = '👁️'; // Eye icon (open/visible)
    }
}
// Calculate score on the results page
function calculateScore() {
    let score = 0;

    // Question 1
    const q1 = loadAnswer('q1');
    const feedback1 = document.getElementById("feedback1");
    if (q1 === "b") {
        score += 10;
        if (feedback1) {
            feedback1.textContent = "Correct! 🦈";
            feedback1.style.color = "#32cd32";
        }
    } else {
        if (feedback1) {
            feedback1.textContent = "Incorrect. The answer is 'Cool water close to coast'.";
            feedback1.style.color = "#ff0000";
        }
    }

    // Question 2
    const q2 = loadAnswer('q2');
    const feedback2 = document.getElementById("feedback2");
    if (q2 === "b") {
        score += 10;
        if (feedback2) {
            feedback2.textContent = "Correct! 🦈";
            feedback2.style.color = "#32cd32";
        }
    } else {
        if (feedback2) {
            feedback2.textContent = "Incorrect. The answer is 'Up to 300'.";
            feedback2.style.color = "#ff0000";
        }
    }

    // Question 3
    const q3 = loadAnswer('q3');
    const feedback3 = document.getElementById("feedback3");
    if (q3 === "a") {
        score += 10;
        if (feedback3) {
            feedback3.textContent = "Correct! 🦈";
            feedback3.style.color = "#32cd32";
        }
    } else {
        if (feedback3) {
            feedback3.textContent = "Incorrect. The answer is 'Seals, rays, and small whales'.";
            feedback3.style.color = "#ff0000";
        }
    }

    // Question 4
    const q4 = loadAnswer('q4').trim().toLowerCase();
    const feedback4 = document.getElementById("feedback4");
    if (q4 === "amazing") {
        score += 10;
        if (feedback4) {
            feedback4.textContent = "Correct! 🦈";
            feedback4.style.color = "#32cd32";
        }
    } else {
        if (feedback4) {
            feedback4.textContent = "Incorrect. The answer is 'amazing'.";
            feedback4.style.color = "#ff0000";
        }
    }

    // Question 5
    const q5 = loadAnswer('q5').trim().toLowerCase();
    const feedback5 = document.getElementById("feedback5");
    const keywords = ["biggest", "eat", "fish", "animals"];
    const containsKeyword = keywords.some(keyword => q5.includes(keyword));
    if (containsKeyword) {
        score += 10;
        if (feedback5) {
            feedback5.textContent = "Correct! 🦈";
            feedback5.style.color = "#32cd32";
        }
    } else {
        if (feedback5) {
            feedback5.textContent = "Incorrect. Hint: Think about their size or what they eat.";
            feedback5.style.color = "#ff0000";
        }
    }

    // Question 6
    const q6 = loadAnswer('q6').trim().toLowerCase();
    const feedback6 = document.getElementById("feedback6");
    if (q6 === "earth") {
        score += 10;
        if (feedback6) {
            feedback6.textContent = "Correct! 🦈 Bonus points!";
            feedback6.style.color = "#32cd32";
            triggerConfetti();
        }
    } else {
        if (feedback6) {
            feedback6.textContent = "Incorrect. The answer is 'Earth'.";
            feedback6.style.color = "#ff0000";
        }
    }

    return score;
}

// Restart quiz by clearing localStorage and redirecting to index
function restartQuiz() {
    localStorage.clear();
    window.location.href = 'index.html';
}
// Add this to script.js
function stopTimer() {
    const endTime = Date.now();
    localStorage.setItem('quizEndTime', endTime);
}

function redirectBasedOnScore() {
    const score = calculateScore();
    const totalQuestions = 6;
    const average = (totalQuestions * 10) / 2; // Half the full score, i.e., 30

    if (score > average) {
        window.location.href = 'victory.html';
    } else {
        window.location.href = 'console.html';
    }
}