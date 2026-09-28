
/* COUNTDOWN */

const weddingCountdownDate = new Date("October 18, 2026 17:30:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();
    const difference = weddingCountdownDate - now;

    if (difference <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);









/* =========================
   TIMELINE ANIMATION
========================= */

const timelineElements = document.querySelectorAll(
    ".timeline-location, .timeline-event, .timeline-line"
);


const timelineObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },
    {
        threshold: 0.25
    }
);


timelineElements.forEach((element) => {

    timelineObserver.observe(element);

});

/* ========================= BACKGROUND MUSIC ========================= */
const weddingMusic = document.getElementById("weddingMusic"); const musicButton = document.getElementById("musicButton");
let musicPlaying = false;

/* START MUSIC AFTER FIRST TOUCH */
function startMusic() {
if (musicPlaying) return;

weddingMusic.play()
    .then(() => {
        musicPlaying = true;
        musicButton.textContent = "♫";
    })
    .catch(() => {
        // Browser blocked playback
    });
}
/* FIRST INTERACTION ANYWHERE */
document.addEventListener("click", startMusic, { once: true });

/* MUSIC BUTTON */
musicButton.addEventListener("click", function (event) {
event.stopPropagation();

if (musicPlaying) {

    weddingMusic.pause();

    musicPlaying = false;


} 
else {

    weddingMusic.play()
        .then(() => {

            musicPlaying = true;

        });

}
});







// PHOTO GALLERY
const photoGallery = document.querySelector(".photo-gallery"); const photos = document.querySelectorAll(".photo");
function updateActivePhoto() { const galleryRect = photoGallery.getBoundingClientRect(); const galleryCenter = galleryRect.left + galleryRect.width / 2;
let closestPhoto = null;
let closestDistance = Infinity;

photos.forEach((photo) => {
    const photoRect = photo.getBoundingClientRect();
    const photoCenter = photoRect.left + photoRect.width / 2;

    const distance = Math.abs(galleryCenter - photoCenter);

    if (distance < closestDistance) {
        closestDistance = distance;
        closestPhoto = photo;
    }
});

photos.forEach((photo) => {
    photo.classList.remove("active");
});

if (closestPhoto) {
    closestPhoto.classList.add("active");
}
}
photoGallery.addEventListener("scroll", updateActivePhoto);
window.addEventListener("resize", updateActivePhoto);
updateActivePhoto();
