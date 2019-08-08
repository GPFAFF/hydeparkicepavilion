/*!
 * project-name v0.0.1
 * A description for your project.
 * (c) 2019 GREG PFAFF
 * MIT License
 * http://link-to-your-git-repo.com
 */

// Robert Penner's easeInOutQuad

// find the rest of his easing functions here: http://robertpenner.com/easing/
// find them exported for ES6 consumption here: https://github.com/jaxgeller/ez.js

const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2
  if (t < 1) return c / 2 * t * t + b
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

const jumper = () => {
  // private variable cache
  // no variables are created during a jump, preventing memory leaks

  let element         // element to scroll to                   (node)

  let start           // where scroll starts                    (px)
  let stop            // where scroll stops                     (px)

  let offset          // adjustment from the stop position      (px)
  let easing          // easing function                        (function)
  let a11y            // accessibility support flag             (boolean)

  let distance        // distance of scroll                     (px)
  let duration        // scroll duration                        (ms)

  let timeStart       // time scroll started                    (ms)
  let timeElapsed     // time spent scrolling thus far          (ms)

  let next            // next scroll position                   (px)

  let callback        // to call when done scrolling            (function)

  // scroll position helper

  function location() {
    return window.scrollY || window.pageYOffset
  }

  // element offset helper

  function top(element) {
    return element.getBoundingClientRect().top + start
  }

  // rAF loop helper

  function loop(timeCurrent) {
    // store time scroll started, if not started already
    if (!timeStart) {
      timeStart = timeCurrent
    }

    // determine time spent scrolling so far
    timeElapsed = timeCurrent - timeStart

    // calculate next scroll position
    next = easing(timeElapsed, start, distance, duration)

    // scroll to it
    window.scrollTo(0, next)

    // check progress
    timeElapsed < duration
      ? window.requestAnimationFrame(loop)       // continue scroll loop
      : done()                                   // scrolling is done
  }

  // scroll finished helper

  function done() {
    // account for rAF time rounding inaccuracies
    window.scrollTo(0, start + distance)

    // if scrolling to an element, and accessibility is enabled
    if (element && a11y) {
      // add tabindex indicating programmatic focus
      element.setAttribute('tabindex', '-1')

      // focus the element
      element.focus()
    }

    // if it exists, fire the callback
    if (typeof callback === 'function') {
      callback()
    }

    // reset time for next jump
    timeStart = false
  }

  // API

  function jump(target, options = {}) {
    // resolve options, or use defaults
    duration = options.duration || 1000
    offset = options.offset || 0
    callback = options.callback                       // "undefined" is a suitable default, and won't be called
    easing = options.easing || easeInOutQuad
    a11y = options.a11y || false

    // cache starting position
    start = location()

    // resolve target
    switch (typeof target) {
      // scroll from current position
      case 'number':
        element = undefined           // no element to scroll to
        a11y = false                  // make sure accessibility is off
        stop = start + target
        break

      // scroll to element (node)
      // bounding rect is relative to the viewport
      case 'object':
        element = target
        stop = top(element)
        break

      // scroll to element (selector)
      // bounding rect is relative to the viewport
      case 'string':
        element = document.querySelector(target)
        stop = top(element)
        break
    }

    // resolve scroll distance, accounting for offset
    distance = stop - start + offset

    // resolve duration
    switch (typeof options.duration) {
      // number in ms
      case 'number':
        duration = options.duration
        break

      // function passed the distance of the scroll
      case 'function':
        duration = options.duration(distance)
        break
    }

    // start the loop
    window.requestAnimationFrame(loop)
  }

  // expose only the jump method
  return jump
}

// export singleton

const singleton = jumper()

/**
 * Element.matches() polyfill (simple version)
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 */
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
const form_inputs = [].slice.call(document.querySelectorAll('input[type="text"], select, textarea'));

form_inputs.map(input => {
  input.addEventListener('change', (e) => {
    if (input.value) {
      input.classList.add('floating-label');
    } else {
      input.classList.remove('floating-label');
    }
  })
});
const footerCopy = document.querySelector('.copy');
const year = new Date().getFullYear();
footerCopy.innerText = `© ${year} Hyde Park Ice Pavilion`

const chevron = document.querySelector('.chevron');

chevron.addEventListener('click', (event) => {
  event.preventDefault();
  if (!event.target.className.includes('chevron')) return;
  const info = document.querySelector('.rink-info');
  singleton(info, {
    duration: 1000,
    offset: 0,
    callback: undefined,
    easing: easeInOutQuad,
    a11y: true
  })
})
document.addEventListener("DOMContentLoaded", (function() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy, img.lazy.card"));
  let active = false;

  const lazyLoad = function() {
    if (active === false) {
      active = true;

      setTimeout((function() {
        lazyImages.forEach((function(lazyImage) {
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
            lazyImage.src = lazyImage.dataset.src;            
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");

            lazyImages = lazyImages.filter((function(image) {
              return image !== lazyImage;
            }));

            if (lazyImages.length === 0) {
              document.removeEventListener("scroll", lazyLoad);
              window.removeEventListener("resize", lazyLoad);
              window.removeEventListener("orientationchange", lazyLoad);
            }
          } else {
            lazyImage.src = 'img/placeholder.jpg'
            lazyImage.classList.add('lazy');
          }
        }));

        active = false;
      }), 200);
    }
  };
  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
}));

function initMap() {
  var hydePark = {lat: 43.097672, lng: -79.020234};
  var map = new google.maps.Map(
    document.getElementById('map'), { zoom: 14, center: hydePark});
  new google.maps.Marker({ position: hydePark, map});
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
		hamburgerButton.classList.remove('hidden');
		mobileNav.classList.remove('opened');
		mobileNav.classList.add('hidden');
		closeButton.classList.add('hidden');
		page.classList.remove('opened');
	}
}));

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

// dataApps.map(item => item.classList.add('hidden'));
// dataApps[0].classList.remove('hidden');
// dataApps[0].classList.add('active');