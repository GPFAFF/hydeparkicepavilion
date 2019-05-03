/*!
 * project-name v0.0.1
 * A description for your project.
 * (c) 2019 GREG PFAFF
 * MIT License
 * http://link-to-your-git-repo.com
 */

document.addEventListener('click',  (event) => {
  event.preventDefault();
  if (!event.target.className.includes('link')) return;
  const href = event.target.getAttribute('href');
  console.log('called');
  singleton(href, {
    duration: 1000,
    offset: 0,
    callback: undefined,
    easing: easeInOutQuad,
    a11y: false
  })
});

const hamburgerButton = document.querySelector('.hamburger');
const closeButton = document.querySelector('.close');
const page = document.querySelector('main');
const mobileNav = document.querySelector('.mobile-nav');

hamburgerButton.addEventListener('click', (function () {
	hamburgerButton.classList.add('hidden');

	mobileNav.classList.add('opened');
	mobileNav.classList.remove('hidden');
	closeButton.classList.remove('hidden');

	page.classList.add('opened');
}));

closeButton.addEventListener('click', (function () {
	hamburgerButton.classList.remove('hidden');

	mobileNav.classList.remove('opened');
	mobileNav.classList.add('hidden');

	page.classList.remove('opened');
}));

//closing navigation if click outside it
page.addEventListener('click', (function (e) {

	var evTarget = e.target;

	if ((evTarget !== mobileNav) && (mobileNav.classList.contains('opened')) && (evTarget !== hamburgerButton) && (evTarget.parentNode !== hamburgerButton)) {
		console.log(hamburgerButton.firstChild);

		hamburgerButton.classList.remove('hidden');

		mobileNav.classList.remove('opened');
		mobileNav.classList.add('hidden');
		closeButton.classList.add('hidden');

		page.classList.remove('opened');
	}
}));
