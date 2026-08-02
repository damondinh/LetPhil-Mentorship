import { elements } from '../dom.js';

function toggleSideBar() {
	elements.sidebar?.classList.toggle('close');
	elements.toggleBtn?.classList.toggle('rotate');
}

export function initializeSideBar() {
	if (elements.toggleBtn) {
		elements.toggleBtn.addEventListener('click', toggleSideBar);
	}
}
