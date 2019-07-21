const hamburgerButton = document.querySelector('.hamburger');
const closeButton = document.querySelector('.close');
const page = document.querySelector('main');
const mobileNav = document.querySelector('.mobile-nav');

hamburgerButton.addEventListener('click', function () {
	hamburgerButton.classList.add('hidden');
	mobileNav.classList.add('opened');
	mobileNav.classList.remove('hidden');
	closeButton.classList.remove('hidden');
	page.classList.add('opened');
});

closeButton.addEventListener('click', function () {
	hamburgerButton.classList.remove('hidden');
	mobileNav.classList.remove('opened');
	mobileNav.classList.add('hidden');
	page.classList.remove('opened');
});

//closing navigation if click outside it
page.addEventListener('click', function (e) {
	var evTarget = e.target;
	if ((evTarget !== mobileNav) && (mobileNav.classList.contains('opened')) && (evTarget !== hamburgerButton) && (evTarget.parentNode !== hamburgerButton)) {
		hamburgerButton.classList.remove('hidden');
		mobileNav.classList.remove('opened');
		mobileNav.classList.add('hidden');
		closeButton.classList.add('hidden');
		page.classList.remove('opened');
	}
});
