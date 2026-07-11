const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

function toggleSideBar() {
	sidebar.classList.toggle('close');
	toggleButton.classList.toggle('rotate');
}
