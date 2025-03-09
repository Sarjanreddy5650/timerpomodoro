let timer;
let isRunning = false;
let remainingTime = 0;
let modeDuration = {
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900
}; // durations in seconds
let currentMode = 'pomodoro';

const display = document.getElementById('display');
const alarm = document.getElementById('alarm');

// Update display function
function updateDisplay() {
    const hours = String(Math.floor(remainingTime / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((remainingTime % 3600) / 60)).padStart(2, '0');
    const seconds = String(remainingTime % 60).padStart(2, '0');
    display.textContent = `${hours}:${minutes}:${seconds}`;
}

// Start timer function
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (remainingTime > 0) {
                remainingTime--;
                updateDisplay();
            } else {
                clearInterval(timer);
                alarm.play();
                isRunning = false;
            }
        }, 1000);
    }
}

// Pause timer function
function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

// Reset timer function
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    remainingTime = modeDuration[currentMode];
    updateDisplay();
}

// Change mode function
function changeMode(mode) {
    currentMode = mode;
    remainingTime = modeDuration[mode];
    updateDisplay();
}

// Event listeners
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

document.getElementById('shortBreak').addEventListener('click', () => changeMode('shortBreak'));
document.getElementById('longBreak').addEventListener('click', () => changeMode('longBreak'));

// Initialize on page load
resetTimer();
