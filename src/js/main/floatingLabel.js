const form_inputs = [].slice.call(document.querySelectorAll('input[type="text"], select, textarea'));

console.log('f', form_inputs);

form_inputs.map(input => {
  input.addEventListener('change', (e) => {
    if (input.value) {
      input.classList.add('floating-label');
    } else {
      input.classList.remove('floating-label');
    }
  })
});