// 1. Brew Calculator
function updateBrew() {
    const coffee = document.getElementById('coffeeInput').value;
    document.getElementById('waterReq').innerText = coffee ? (coffee * 15) : 0;
}

// 2. Bean Display Logic
function showBean() {
    const selected = document.getElementById('beanSelect').value;
    const allBeans = ['fugol_indo', 'fugol_inter', 'ethiopia', 'kenya', 'colombia'];
    
    allBeans.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = (id === selected) ? 'block' : 'none';
        }
    });
}

// 3. Pouring Tabs Logic
function showPour(beanId, pourId, btn) {
    const container = document.getElementById(beanId);
    container.querySelectorAll('.recipe-content').forEach(c => c.classList.remove('active'));
    document.getElementById(beanId + '-' + pourId).classList.add('active');
    container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// 4. Timer Logic
let timerInterval, seconds = 0, isRunning = false;
const timerDisplay = document.getElementById('timer');
const controls = document.getElementById('timerControls');

function startTimer() {
    isRunning = true;
    renderControls();
    timerInterval = setInterval(() => {
        seconds++;
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    renderControls();
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    seconds = 0;
    updateDisplay();
    renderControls();
}

function updateDisplay() {
    let m = String(Math.floor(seconds / 60)).padStart(2, '0');
    let s = String(seconds % 60).padStart(2, '0');
    timerDisplay.innerText = `${m}:${s}`;
}

function renderControls() {
    if (seconds === 0 && !isRunning) {
        controls.innerHTML = `<button id="btnMain" onclick="startTimer()">START BREW</button>`;
    } else if (isRunning) {
        controls.innerHTML = `
            <button class="btn-secondary" onclick="pauseTimer()">PAUSE</button>
            <button class="btn-danger" onclick="resetTimer()">RESET</button>
        `;
    } else {
        controls.innerHTML = `
            <button id="btnMain" onclick="startTimer()">RESUME</button>
            <button class="btn-danger" onclick="resetTimer()">RESET</button>
        `;
    }
}