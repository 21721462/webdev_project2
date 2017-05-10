/**
 * Formats the time to 12 hour format
 */
function formatTime(time) {
	var amOrPm = time.getHours() < 12 ? ' AM' : ' PM';
	var minutes = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
	var seconds = (time.getSeconds() < 10 ? '0' : '') + time.getSeconds();
	return 'Current Time: ' + time.getHours() + ':' + minutes + ':' + seconds + amOrPm;
}

/***
 * Displays the date the page was last modified
 */
(function() {
	var lastModified = document.getElementById('modtime');
	lastModified.textContent = 'Last Modification Time: ' + document.lastModified;
})();

/***
 * Displays a dynamic clock in the footer
 */
(function() {
	var currentTime = document.getElementById('time');
	setInterval(function() {
		currentTime.textContent = formatTime(new Date());
	}, 500);
})();