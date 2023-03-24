const viewportHeight = window.innerHeight;
var currentIndex = 0;
let prevScrollPos = window.pageYOffset;
let last = 0;
const innerContainer = document.querySelectorAll(".inner-container");

function scrollToSmoothly(pos, time) {
	var currentPos = window.pageYOffset;
	var start = null;
	if (time == null) time = 500;
	(pos = +pos), (time = +time);
	window.requestAnimationFrame(function step(currentTime) {
		start = !start ? currentTime : start;
		var progress = currentTime - start;
		if (currentPos < pos) {
			window.scrollTo(
				0,
				((pos - currentPos) * progress) / time + currentPos
			);
		} else {
			window.scrollTo(
				0,
				currentPos - ((currentPos - pos) * progress) / time
			);
		}
		if (progress < time) {
			window.requestAnimationFrame(step);
		} else {
			window.scrollTo(0, pos);
		}
	});
}
document.addEventListener(
	"touchmove",
	function (event) {
		event.preventDefault();
	},
	{ passive: false }
);
window.onscroll = function (e) {
	var up = prevScrollPos > this.scrollY;
	prevScrollPos = this.scrollY;
	const now = new Date().getTime();
	if (now - last > 1000) {
		last = now;
		if (currentIndex > 0 && up) {
			innerContainer[currentIndex].classList.add("hide");
			setTimeout(() => {
				innerContainer[currentIndex + 1].classList.remove("active");
				innerContainer[currentIndex + 1].classList.remove("hide");
			}, 500);
			currentIndex--;
			innerContainer[currentIndex].classList.add("active");
			scrollToSmoothly(viewportHeight * currentIndex, 500);
		}
		if (currentIndex < 4 && !up) {
			innerContainer[currentIndex].classList.add("hide");
			setTimeout(() => {
				innerContainer[currentIndex - 1].classList.remove("active");
				innerContainer[currentIndex - 1].classList.remove("hide");
			}, 500);
			currentIndex++;
			innerContainer[currentIndex].classList.add("active");
			scrollToSmoothly(viewportHeight * currentIndex, 500);
		}
	}
};
