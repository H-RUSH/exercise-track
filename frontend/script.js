const exercises = [
    { name: "High Knee", src: "../video/high_knee.mp4", duration: 20 },
    { name: "Half Crunch", src: "../video/half_crunch.mp4", duration: 20 },
    { name: "Leg Raise", src: "../video/leg_raise.mp4", duration: 20 },
    { name: "Flutter Kick", src: "../video/flutter_kick.mp4", duration: 20 },
    { name: "Jack Knife", src: "../video/jack_knife.mp4", duration: 20 },
    { name: "Squat Jump", src: "../video/squat_jump.mp4", duration: 20 },
    { name: "Jumping Jack", src: "../video/jumping_jack.mp4", duration: 20 },
    { name: "Fast Feet", src: "../video/fast_feet.mp4", duration: 20 },
    { name: "Mountain Climber", src: "../video/mountain_climber.mp4", duration: 20 },
    { name: "High Knee Clap", src: "../video/high_knee_clap.mp4", duration: 20 },
    { name: "Elbow to Knee Crunch", src: "../video/elbow_to_knee_crunch.mp4", duration: 20 },
    { name: "Knee Lift Crunch", src: "../video/knee_lift_crunch.mp4", duration: 20 },
    { name: "Both Hand Knee Tap", src: "../video/both_hand_knee_tap.mp4", duration: 20 },
    { name: "Both Hand To Tap", src: "../video/both_hand_to_tap.mp4", duration: 20 },
    { name: "Belly Press", src: "../video/belly_press.mp4", duration: 20 },
    { name: "Knee Support", src: "../video/knee_support.mp4", duration: 20 },
    { name: "Frog Press", src: "../video/frog_press.mp4", duration: 20 },
    { name: "Reverse Thrust", src: "../video/reverse_thrust.mp4", duration: 20 }
];

let currentIndex = 0;
let timeLeft;
let countdown;
let isPaused = false;

const timerElement = document.getElementById("timer");
const videoElement = document.getElementById("exercise-video");
const nameElement = document.getElementById("exercise-name");
const pauseBtn = document.getElementById("pause-btn");
const resetCurrentBtn = document.getElementById("reset-current-btn");
const resetAllBtn = document.getElementById("reset-all-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const resetTimeBtn = document.getElementById("reset-time-btn");

function startExercise(index) {
    clearInterval(countdown); 
    const exercise = exercises[index];
    timeLeft = exercise.duration;

    nameElement.textContent = exercise.name;
    videoElement.src = exercise.src;
    videoElement.currentTime = 0;
    videoElement.play();

    countdown = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timerElement.textContent = timeLeft;
    timeLeft--;

    if (timeLeft < 0) {
        clearInterval(countdown);
        nextExercise();
    }
}

function nextExercise() {
    currentIndex++;
    if (currentIndex >= exercises.length) {
        nameElement.textContent = "Workout Complete!";
        videoElement.src = "";
        timerElement.textContent = "";
        return;
    }
    startExercise(currentIndex);
}

function previousExercise() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = 0;
        return;
    }
    startExercise(currentIndex);
}

pauseBtn.addEventListener("click", () => {
    if (isPaused) {
        countdown = setInterval(updateTimer, 1000);
        videoElement.play();
        pauseBtn.textContent = "Pause";
        isPaused = false;
    } else {
        clearInterval(countdown);
        videoElement.pause();
        pauseBtn.textContent = "Resume";
        isPaused = true;
    }
});

resetCurrentBtn.addEventListener("click", () => {
    startExercise(currentIndex);
    pauseBtn.textContent = "Pause";
    isPaused = false;
});

resetAllBtn.addEventListener("click", () => {
    currentIndex = 0;
    startExercise(currentIndex);
    pauseBtn.textContent = "Pause";
    isPaused = false;
});

resetTimeBtn.addEventListener("click", () => {
    clearInterval(countdown);
    timeLeft = exercises[currentIndex].duration;
    timerElement.textContent = timeLeft;
    if (!isPaused) {
        countdown = setInterval(updateTimer, 1000);
    }
});

nextBtn.addEventListener("click", () => {
    nextExercise();
});

prevBtn.addEventListener("click", () => {
    previousExercise();
});

// Start first exercise
startExercise(currentIndex);