const formSocials = document.querySelector('.social-form');
const formOrder = document.querySelector('.order-form');

async function sendMail(e, form) {
  e.preventDefault();
  const formData = new FormData(form);
  alert('Отправлено');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const res = await fetch('mail.php', {
    method: 'POST',
    body: formData,
  });
  // eslint-disable-next-line prefer-const, no-restricted-syntax
  for (let input of form.elements) {
    input.value = '';
  }
  // eslint-disable-next-line no-restricted-globals
  location.reload();
}

formSocials.addEventListener('submit', (e) => sendMail(e, formSocials));
formOrder.addEventListener('submit', (e) => sendMail(e, formOrder));
