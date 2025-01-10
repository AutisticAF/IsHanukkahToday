import { updateBreakpointOverlay } from "./breakpoints";

window.onresize = updateBreakpointOverlay;
window.onload = () => {
	updateBreakpointOverlay();	
	const root = document.documentElement;

	for(var i=1; i<=8; i++) {
		document.documentElement.style.setProperty('--flame-' + i + '-delay', Math.random().toString());
	}

	document.documentElement.style.setProperty('--flame-shamash-delay', Math.random().toString());
	
};