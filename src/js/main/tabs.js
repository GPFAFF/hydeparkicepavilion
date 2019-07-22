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