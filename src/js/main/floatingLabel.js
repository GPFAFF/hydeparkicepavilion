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