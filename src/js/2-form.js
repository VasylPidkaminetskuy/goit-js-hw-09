const refs = {
  form: document.querySelector('.feedback-form'),
};
console.log(refs.form);
const formData = {
  email: '',
  message: '',
};

document.addEventListener('DOMContentLoaded', () => {
  const lsData = getFromLS('feedback');

  refs.form.elements.email.value = lsData.email || '';
  refs.form.elements.message.value = lsData.message || '';

  formData.email = lsData.email || '';
  formData.message = lsData.message || '';

  refs.form.addEventListener('input', e => {
    const email = e.currentTarget.elements.email.value;
    const message = e.currentTarget.elements.message.value;

    formData.email = email;
    formData.message = message;

    saveToLS('feedback', formData);
  });

  refs.form.addEventListener('submit', e => {
    e.preventDefault();
    const email = refs.form.elements.email.value.trim();
    const message = refs.form.elements.message.value.trim();

    if (!email || !message) {
      alert('Fill please all fields');
      return;
    }

    console.log(formData);

    localStorage.removeItem('feedback');
    formData.email = '';
    formData.message = '';
    refs.form.reset();
  });
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function getFromLS(key, defaultValue = { email: '', message: '' }) {
  const jsonData = localStorage.getItem(key);
  if (!jsonData) return defaultValue;

  try {
    const data = JSON.parse(jsonData);
    return (data && typeof data === 'object') ? data : defaultValue;
  } catch {
    return defaultValue;
  }
}
