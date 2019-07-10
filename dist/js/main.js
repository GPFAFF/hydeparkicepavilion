/*!
 * project-name v0.0.1
 * A description for your project.
 * (c) 2019 GREG PFAFF
 * MIT License
 * http://link-to-your-git-repo.com
 */

const dataApps = [].slice.call(document.querySelectorAll('[data-app]'));

document.addEventListener('click',  (event) => {
  if (!event.target.className.includes('link')) return;
  const href = event.target.getAttribute('href');
  const target = dataApps.find(x => `#${x.getAttribute('data-app')}` === href);
  dataApps.map(item => {
    item.classList.add('hidden');
    item.classList.remove('active');
  });
  target.classList.add('active');
  target.classList.remove('hidden');
  const targetHeight = target.offsetHeight
  target.style.marginTop = `${-targetHeight / 2}px`;
  target.style.paddingTop = `${(targetHeight / 2) + 50}px`;
  target.style.transition = 'opacity 0.3s cubic-bezier(0.61, -0.19, 0.7, -0.11)';
});

dataApps.map(item => item.classList.add('hidden'));
dataApps[0].classList.remove('hidden');
dataApps[0].classList.add('active');


function initMap() {
  var hydePark = {lat: 43.097672, lng: -79.020234};
  var map = new google.maps.Map(
    document.getElementById('map'), { zoom: 14, center: hydePark});
  var marker = new google.maps.Marker({ position: hydePark, map});
}

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
