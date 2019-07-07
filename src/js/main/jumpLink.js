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
