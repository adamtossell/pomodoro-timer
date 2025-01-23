let timeLeft;
let timerId = null;
let isWorkTime = true;
let isWorkMode = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const modeToggle = document.getElementById('mode-toggle');
const sunIcon = modeToggle.querySelector('.sun-icon');
const moonIcon = modeToggle.querySelector('.moon-icon');
const toggleLabel = modeToggle.parentElement.querySelector('.toggle-label');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    updateTitle(minutes, seconds);
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    updateDisplay(timeLeft);
}

function startTimer() {
    if (timerId !== null) return;
    
    if (!timeLeft) {
        timeLeft = WORK_TIME;
    }

    startButton.textContent = 'Pause';
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);
        
        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            startButton.textContent = 'Start';
            switchMode();
            alert(isWorkTime ? 'Break time is over! Time to work!' : 'Work time is over! Take a break!');
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    startButton.textContent = 'Start';
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    startButton.textContent = 'Start';
    modeText.textContent = 'Work Time';
    updateDisplay(timeLeft);
}

startButton.addEventListener('click', () => {
    if (timerId === null) {
        startTimer();
    } else {
        pauseTimer();
    }
});

resetButton.addEventListener('click', resetTimer);

modeToggle.addEventListener('click', () => {
    sunIcon.classList.toggle('hidden');
    moonIcon.classList.toggle('hidden');
    isWorkMode = !isWorkMode;
    
    // Update timer and mode text
    if (isWorkMode) {
        timeLeft = WORK_TIME;  // 25 minutes in seconds
        modeText.textContent = 'Work Time';
    } else {
        timeLeft = BREAK_TIME;  // 5 minutes in seconds
        modeText.textContent = 'Rest Time';
    }
    
    updateDisplay(timeLeft);
});

function updateTitle(minutes, seconds) {
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.title = `${timeString} - ${isWorkMode ? 'Work' : 'Rest'} Timer`;
}

// Initialize display
timeLeft = WORK_TIME;
updateDisplay(timeLeft); 