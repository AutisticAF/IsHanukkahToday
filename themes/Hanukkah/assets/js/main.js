window.onload = function() {
	const root = document.documentElement;

	for(var i=1; i<=8; i++) {
		document.documentElement.style.setProperty('--flame-' + i + '-delay', Math.random());
	}

	document.documentElement.style.setProperty('--flame-shamash-delay', Math.random());
	
};