const hashes = [].slice.call(document.querySelectorAll('.hash'));

navigateToHash = (hash) => {
  window.location.href = `https://hydeparkicepavilion/${hash}`;
}

document.addEventListener('click',  (event) => {
  if (!event.target.className.includes('hash')) return;
  const hash = event.target.href;
  navigateToHash(hash);
})