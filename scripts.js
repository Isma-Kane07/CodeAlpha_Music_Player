$(document).ready(function () {
    let audio = new Audio();
    let currentTrack = 0;

    const playlist = [
        {
            src: "Khaled.mp3",
            title: "C'EST LA VIE",
            artist: "Cheb Khaled",
            duration: "3:57",
            cover: "cheb.jpeg"
        },
        {
            src: "PSY - GANGNAM STYLE.mp3",
            title: "GANGNAM STYLE",
            artist: "PSY",
            duration: "4:12",
            cover: "gangnam-style.jpg"
        },
        {
            src: "POP SMOKE - DIOR.mp3",
            title: "DIOR",
            artist: "Pop Smoke",
            duration: "2:53",
            cover: "pop-smoke-dior-collaboration.jpg"
        },
        {
            src: "GIMS.mp3",
            title: "SPIDER",
            artist: "Maitre Gims FT Dystinct",
            duration: "3:08",
            cover: "gims.jpg"
        },
        {
            src: "Chris Brown, Tyga.mp3",
            title: "AYO",
            artist: "Chris Brown FT Tyga",
            duration: "3:47",
            cover: "tyga.jpg"
        }
    ];

    function loadTrack(index) {
        let track = playlist[index];
        audio.src = track.src;
        $("#trackTitle").text(track.title);
        $("#trackArtist").text(track.artist);
        $("#albumCover").attr("src", track.cover);
        audio.onloadedmetadata = function () {
            $("#duration").text(formatTime(audio.duration));
            $("#progressRange").attr("max", audio.duration);
        };
    }

    function playTrack() {
        audio.play();
        $("#playPause").html('<i class="fas fa-pause"></i>');
    }

    function pauseTrack() {
        audio.pause();
        $("#playPause").html('<i class="fas fa-play"></i>');
    }

    function formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
    }

    audio.addEventListener("timeupdate", function () {
        $("#progressRange").val(audio.currentTime);
        $("#currentTime").text(formatTime(audio.currentTime));
    });

    $("#playPause").click(function () {
        if (audio.paused) {
            playTrack();
        } else {
            pauseTrack();
        }
    });

    $("#next").click(function () {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
        playTrack();
    });

    $("#prev").click(function () {
        currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrack);
        playTrack();
    });

    $("#progressRange").on("input", function () {
        audio.currentTime = $(this).val();
    });

    $(".list-group-item").click(function () {
        let src = $(this).data("src");
        let title = $(this).data("title");
        let artist = $(this).data("artist");
        let duration = $(this).data("duration");
        let cover = $(this).find(".cover-img").attr("src");

        audio.src = src;
        $("#trackTitle").text(title);
        $("#trackArtist").text(artist);
        $("#albumCover").attr("src", cover);
        $("#duration").text(duration);

        playTrack();
    });

    $("#playlistToggle").click(function () {
        $("#playlistContainer").toggleClass("hidden");
    });

    loadTrack(currentTrack);
});
