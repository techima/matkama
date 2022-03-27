function rangeSlide(value) {
    document.getElementById('rangeValueKilometres').innerHTML = value + " km";
}

function rangeSlideHours(value) {
    document.getElementById('rangeValueHours').innerHTML = value + " h";
}

function showContents(id) {
    document.querySelector('.bg-modal').style.display = "flex";
}

document.querySelector('.close').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "none";
});
