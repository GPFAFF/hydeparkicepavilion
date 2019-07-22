const chevron = document.querySelector('.chevron');

chevron.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('click');
  if (!event.target.className.includes('chevron')) return;
  console.log('chevron')
  const info = document.querySelector('.rink-info');
  singleton(info, {
    duration: 1000,
    offset: 0,
    callback: undefined,
    easing: easeInOutQuad,
    a11y: false
  })
})