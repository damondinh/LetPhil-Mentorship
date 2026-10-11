import { elements } from '../dom.js';
import { loadContactMessages, saveContactMessage } from '../storage.js';

let contactMessages = [];

function submitMessage() {
	const name = elements.contactName.value.trim();
	const email = elements.contactEmail.value.trim();
	const subject = elements.contactSubject.value.trim();
	const message = elements.contactMessage.value.trim();
	const msg = {
		name: name,
		email: email,
		subject: subject,
		message: message,
	};

	// 1. save to local storage
	contactMessages.push(msg);
	saveContactMessage(contactMessages);

	// 2. display confirmation message
	alert(
		`Thank you, ${name}! Your message has been saved to the local storage.`,
	);

	// 3. clear inputs
	elements.contactName.value = '';
	elements.contactEmail.value = '';
	elements.contactSubject.value = '';
	elements.contactMessage.value = '';
}

export function initializeContactUs() {
	contactMessages = loadContactMessages();

	if (elements.contactUsForm) {
		elements.contactUsForm.addEventListener('submit', (event) => {
			event.preventDefault();
			submitMessage();
		});
	}
}
