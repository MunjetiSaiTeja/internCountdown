function startTimer() {
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;
    window.location.href = timer.html?hours=${hours}&minutes=${minutes}&seconds=${seconds};
}
let initialTime;
let remainingTime;
let timerInterval;
let isRunning = false;

function startCountdown() {
    isRunning = true;
    const urlParams = new URLSearchParams(window.location.search);
    const hours = parseInt(urlParams.get('hours')) || 0;
    const minutes = parseInt(urlParams.get('minutes')) || 0;
    const seconds = parseInt(urlParams.get('seconds')) || 0;
    initialTime = hours * 3600 + minutes * 60 + seconds;
    remainingTime = initialTime;
    timerInterval = setInterval(() => {
    remainingTime--;
    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        updateDisplay(remainingTime);
        playSound();
        return;
    }
    updateDisplay(remainingTime);
    }, 1000);
}

function updateDisplay(remainingTime) {
    if (remainingTime <= 0) {
        document.getElementById("time").textContent = "Time's Up";
        playSound();
        document.getElementById("stopResumeBtn").style.display = 'none'; 
        document.getElementById("resumeBtn").style.display = 'none'; 
    } else {
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;
        document.getElementById("time").textContent = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
    }
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    document.getElementById("resumeBtn").style.display = "none";
    window.location.href = "index.html";
}

function toggleTimer() {
    if (!isRunning) {
        startCountdown();
        document.getElementById("stopResumeBtn").textContent = 'Stop';
    } else {
        clearInterval(timerInterval);
        document.getElementById("stopResumeBtn").style.display = "none";
        document.getElementById("resumeBtn").style.display = "block";
    }
    isRunning = !isRunning;
}

function restartTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    document.getElementById("resumeBtn").style.display = "none";
    document.getElementById("stopResumeBtn").style.display ="block";
    const audio = document.getElementById("audio");
    audio.pause(); 
    startCountdown();
}

function resumeTimer() {
    document.getElementById("resumeBtn").style.display = "none";
    startCountdownFromCurrentTime();
    document.getElementById("stopResumeBtn").textContent = 'Stop';
    document.getElementById("stopResumeBtn").style.display = "block";
}

function startCountdownFromCurrentTime() {
    isRunning = true;
    timerInterval = setInterval(() => {
    remainingTime--;
    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        updateDisplay(remainingTime);
        playSound();
        return;
    }
    updateDisplay(remainingTime);
    }, 1000);
}
    
function playSound() {
    const audio = document.getElementById("audio");
    audio.play();
}
startCountdown();
