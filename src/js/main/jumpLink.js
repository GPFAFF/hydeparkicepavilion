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
