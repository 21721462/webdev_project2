var leftButton;
var rightButton;

(function() {
	var slides = document.getElementsByClassName('slideitem');
	var currentIndex = 0;
	
	/**
	 * Sets the active slide to the current index
	 */
	function setActiveSlide() {
		// First clear display
		for (var i = 0; i < slides.length; i++) {
			slides[i].style.display = 'none';
		}
		
		// Set the index slide as active
		slides[currentIndex].style.display = 'block';
	}
	
	/**
	 * Callback function for when the left button is pressed
	 */
	leftButton = function() {
		currentIndex--;
		if (currentIndex == -1) {
			currentIndex = slides.length - 1;
		}
		setActiveSlide();
	}
	
	/**
	 * Callback function for when the right button is pressed
	 */
	rightButton = function() {
		currentIndex++;
		if (currentIndex == slides.length) {
			currentIndex = 0;
		}
		setActiveSlide();
	}
	
	setActiveSlide();
})();