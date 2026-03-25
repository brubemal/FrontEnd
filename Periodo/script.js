const clockEl = document.getElementById('clock');
const messageEl = document.getElementById('message');
const actionBtn = document.getElementById('action-btn');

function getPeriod() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'manha';
    if (hour >= 12 && hour < 18) return 'tarde';
    return 'noite';
}

function applyTheme(period) {
    let background, buttonColor, buttonText;

    if (period === 'manha') {
        background = 'linear-gradient(120deg, #8ec5fc, #e0c3fc)';
        buttonColor = '#ffda79';
        buttonText = 'Clique e aproveite a manhã';
    } else if (period === 'tarde') {
        background = 'linear-gradient(120deg, #f6d365, #fda085)';
        buttonColor = '#ff9f1a';
        buttonText = 'Clique e aproveite a tarde';
    } else {
        background = 'linear-gradient(120deg, #2c3e50, #4ca1af)';
        buttonColor = '#6f42c1';
        buttonText = 'Clique e aproveite a noite';
    }

    document.body.style.background = background;
    actionBtn.style.backgroundColor = buttonColor;
    actionBtn.textContent = buttonText;
}

function updateTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${h}:${m}:${s}`;

    const period = getPeriod();
    const periodText = period === 'manha' ? 'Bom dia! Amanhecer / manhã.' : period === 'tarde' ? 'Boa tarde! Período da tarde.' : 'Boa noite! Período da noite.';
    messageEl.textContent = periodText;
    applyTheme(period);
}

function buttonAction() {
    const period = getPeriod();
    let msg;

    if (period === 'manha') msg = 'Hora de tomar um café e planejar o dia!';
    else if (period === 'tarde') msg = 'Hora de foco e produtividade!';
    else msg = 'Hora de descansar e relaxar!';

    alert(msg);
}

actionBtn.addEventListener('click', buttonAction);

updateTime();
setInterval(updateTime, 1000);