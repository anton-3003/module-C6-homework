const btn = document.querySelector('.j-btn-test');

function toggleIcons() {
	const icon1 = document.querySelector('#icon1');
	const icon2 = document.querySelector('#icon2');

	icon1.classList.toggle('hidden');

	if( icon2.classList.contains('hidden') ) {
		icon2.classList.remove('hidden');
	} else {
		icon2.classList.toggle('visible');
	}


}

btn.addEventListener('click', toggleIcons);