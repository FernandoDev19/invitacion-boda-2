// Musica
const audio = document.getElementById('audio');
const iconPlay = document.getElementById('play-pause');
const progress = document.getElementById('progress');
const thumb = document.getElementById('thumb');
const progressContainer = document.getElementById('progress-container');

function repetir() {
    audio.currentTime = 0;
}

// Reproducir o pausar
function togglePlay() {
    if (audio.paused) {
        audio.play();
        iconPlay.classList.replace('fa-heart', 'fa-pause');
        iconPlay.classList.remove('pulse');
    } else {
        audio.pause();
        iconPlay.classList.replace('fa-pause', 'fa-heart');
        iconPlay.classList.add('pulse');
    }
}

// Retroceder 10 segundos
function retroceder() {
    audio.currentTime = Math.max(0, audio.currentTime - 10);
}

// Adelantar 10 segundos
function adelantar() {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
}

// Actualizar barra de progreso
audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + '%';
    thumb.style.left = percent + '%';
});

// Clic en la barra para adelantar
progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    audio.currentTime = percent * audio.duration;
});

// Cuenta regresiva
const fechaObjetivo = new Date('2025-06-14T00:00:00').getTime();
const daysNumber = document.getElementById('days-number');
const hoursNumber = document.getElementById('hours-number');
const minutesNumber = document.getElementById('minutes-number');
const secondsNumber = document.getElementById('seconds-number');

// Función para actualizar la cuenta regresiva
function actualizarCuentaRegresiva() {
    const ahora = new Date().getTime();
    const diferencia = fechaObjetivo - ahora;

    // Calcula días, horas, minutos y segundos
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    // Muestra la cuenta regresiva
    daysNumber.textContent = dias;
    hoursNumber.textContent = horas;
    minutesNumber.textContent = minutos;
    secondsNumber.textContent = segundos;

    // Si la cuenta regresiva ha terminado
    if (diferencia < 0) {
        clearInterval(intervalo);
        console.log('¡La cuenta regresiva ha terminado!');
    }
}

// Actualiza la cuenta regresiva cada segundo
const intervalo = setInterval(actualizarCuentaRegresiva, 1000);
