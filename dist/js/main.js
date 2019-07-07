/*!
 * project-name v0.0.1
 * A description for your project.
 * (c) 2019 GREG PFAFF
 * MIT License
 * http://link-to-your-git-repo.com
 */

document.addEventListener('click',  (event) => {
  if (!event.target.className.includes('link')) return;
  const href = event.target.getAttribute('href');
  const dataApps = [].slice.call(document.querySelectorAll('[data-app]'));
  const target = dataApps.find(x => {
    return `#${x.getAttribute('data-app')}` === href
  });
  dataApps.map(item => {
    item.style.display = 'none'
    item.classList.add('hidden');
  });
  target.style.display = 'block';
  target.classList.add('active');
  target.classList.remove('hidden');
  const blah = target.offsetHeight
  target.style.marginTop = `${-blah / 2}px`;
  target.style.paddingTop = `${(blah / 2) + 50}px`;
});

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
