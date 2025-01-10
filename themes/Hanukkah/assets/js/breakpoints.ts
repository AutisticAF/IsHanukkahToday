import { root } from "postcss";

class Breakpoint {
	name: string;
	minSize: string;
	maxSize: string;

	constructor(name: string, minSize: string, maxSize: string = '0') {
		this.name = name;
		this.minSize = minSize;
		this.maxSize = maxSize;
	}

	get mediaQuery(): string {
		const queryString = "";
		console.log(this.maxSize);
		const minString = (this.minSize === '0') ? "": "(min-width: " + this.minSize + ")";
		const maxString = (this.maxSize === '0') ? "": "(max-width: " + this.maxSize + ")";

		const sizeString = [minString, maxString].filter(str => str).join(" and ").trim();

		
		return queryString + sizeString;
	}
}

const getAllCSSBreakpoints = (styleSheets: StyleSheetList = document.styleSheets): Breakpoint[] => {
	var breakpointVars = new Array<Breakpoint>();
	var i = 0;

	breakpointVars[i++] = new Breakpoint('xs', '0');

	Array.from(styleSheets).forEach(styleSheet => {
		if(!styleSheet.ownerNode.href?.startsWith(styleSheet.ownerNode?.baseURI)) {
			return;
		}

		Array.from(styleSheet.cssRules).forEach(rule => {
			if(!rule || !rule['cssText']) {
				return;
			}
			
			Array.from(rule['cssText'].matchAll(/--breakpoint-(?<breakpoint>.+?): (?<size>.+?);/gi).toArray()).forEach(match => {
				const breakpoint = new Breakpoint(match.groups.breakpoint, match.groups.size);
				breakpointVars[i++] = breakpoint;
			});
		});
	});

	Array.from(breakpointVars).forEach((breakpoint, index) => {
		if (index >= breakpointVars.length - 1) {
			return;
		}

		const nextBreakpoint = breakpointVars[index + 1];
		const newBreakpoint = new Breakpoint(breakpoint.name, breakpoint.minSize, nextBreakpoint.minSize);
		breakpointVars.splice(index, 1, newBreakpoint);
	});

	return breakpointVars;
};

const getCurrentBreakpoint = (breakpoints: Breakpoint[] = getAllCSSBreakpoints()) => {
	for (const breakpoint of breakpoints) {
		console.log(breakpoint.name + ": " + breakpoint.mediaQuery);
		if(window.matchMedia(breakpoint.mediaQuery).matches) {
			console.log("Match: " + breakpoint.name);
			return breakpoint;
		}
	}
};

const updateBreakpointOverlay = () => {
	const currentBreakpoint = getCurrentBreakpoint();
	const currentWidth = window.innerWidth;
	const rootFontSize = 16;
	const currentWidthRem = +(currentWidth / rootFontSize).toFixed(1);
	const prevBoundaryElement = document.getElementById("prev-boundary");
	const breakpointElement = document.getElementById("breakpoint");
	const nextBoundaryElement = document.getElementById("next-boundary");
	const currentWidthElement = document.getElementById("current-width");

	console.log(currentWidth.toString() + "px / " + rootFontSize.toString() + "px = " + currentWidthRem + "rem");

	if(prevBoundaryElement) {
		prevBoundaryElement.innerText = currentBreakpoint?.minSize ?? "0";
	}

	if(breakpointElement) {
		breakpointElement.innerText = currentBreakpoint?.name ?? "No Breakpoint";
	}

	if(nextBoundaryElement) {
		const maxSize = currentBreakpoint?.maxSize;
		if (maxSize && maxSize != '0') {
			nextBoundaryElement.innerHTML = currentBreakpoint.maxSize;
		} else {
			nextBoundaryElement.innerHTML = '&infin;';
		}
	} 

	if(currentWidthElement) {
		currentWidthElement.innerText = currentWidthRem.toString() + "rem";
	}
};

export { updateBreakpointOverlay };