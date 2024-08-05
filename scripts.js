document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const progressBar = document.getElementById('progress');
    const currentTimeDisplay = document.getElementById('current-time');
    const totalTimeDisplay = document.getElementById('total-time');

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateTimeDisplays() {
        if (!isNaN(audio.duration)) {
            currentTimeDisplay.textContent = formatTime(audio.currentTime);
            totalTimeDisplay.textContent = formatTime(audio.duration);
        }
    }

    playButton.addEventListener('click', () => {
        audio.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'inline';
    });

    pauseButton.addEventListener('click', () => {
        audio.pause();
        playButton.style.display = 'inline';
        pauseButton.style.display = 'none';
    });

    audio.addEventListener('loadedmetadata', updateTimeDisplays);
    audio.addEventListener('timeupdate', () => {
        const value = (audio.currentTime / audio.duration) * 100;
        progressBar.value = value;
        updateTimeDisplays();
    });

    progressBar.addEventListener('input', () => {
        const value = progressBar.value;
        audio.currentTime = (value / 100) * audio.duration;
    });

    prevButton.addEventListener('click', () => {
        // Logique pour la chanson précédente
        console.log('Précédent');
    });

    nextButton.addEventListener('click', () => {
        // Logique pour la chanson suivante
        console.log('Suivant');
    });
});
