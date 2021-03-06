let startingTime = "5:00";
let currentTimer = startingTime;
let minutesRemaining = currentTimer.split(":")[0];
let secondsRemaining = minutesRemaining * 60;
let displayTimer;
let isRunning = false;
chrome.runtime.onMessage.addListener(sendTimerInfo);

function sendTimerInfo(request, sender, sendResponse){
    if (request.text === "Need the time"){
        sendResponse(currentTimer);
    }
    if (request.text === "start the timer"){
        countDown();
        sendResponse(secondsRemaining);
    }
    if (request.text === "are you running?"){
        sendResponse({isRunning, currentTimer});
    }
    if (request.text === "pause the timer"){
        isRunning = !isRunning;
        clearInterval(displayTimer);
        sendResponse("Timer has paused");
    }
    if (request.text === "restart the timer"){
        isRunning = !isRunning;
        clearInterval(displayTimer);
        reloadVariables(sendResponse);
    }
    if (request.text === "increase the timer") {
        let startingMinutes = Number(startingTime.split(":")[0]);
        startingMinutes += 1;
        startingTime = startingMinutes.toString() + ":00";
        reloadVariables(sendResponse);

    }
    if (request.text === "decrease the timer") {
        let startingMinutes = Number(startingTime.split(":")[0]);
        startingMinutes -= 1;
        startingTime = startingMinutes.toString() + ":00";
        reloadVariables(sendResponse);
    }
}

function reloadVariables(sendResponse) {
    currentTimer = startingTime;
    minutesRemaining = currentTimer.split(":")[0];
    secondsRemaining = minutesRemaining * 60;
    sendResponse(currentTimer);
}

function countDown() {
    isRunning = !isRunning;
    displayTimer = setInterval(tick, 1000);   
}

const tick = () => {
    let myAlarm = new Audio('Fishtank_Bubbles-SoundBibleco-amanda-1550139304.mp3')
    let min = Math.floor(secondsRemaining / 60); 
    let sec = secondsRemaining - (min * 60);
    if (sec < 10) {
        sec = "0" + sec;
    }
    let timer = min.toString() + ":" + sec;
    currentTimer = timer;
    console.log(timer)
    if (secondsRemaining === 0){
        isRunning = !isRunning;
        myAlarm.play();
        clearInterval(displayTimer);
        setTimeout(alert("Timer is up!"), 200);
    }
    secondsRemaining--;
}