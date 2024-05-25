function startTimer() {
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;
    window.location.href = timer.html?hours=${hours}&minutes=${minutes}&seconds=${seconds};
}
