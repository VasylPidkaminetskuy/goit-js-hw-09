const refs = {
  form: document.querySelector('.feedback-form'),
};
console.log(refs.form);
const formData = {
  email: '',
  message: '',
};

refs.form.addEventListener('input', e => {
  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;

  formData.email = email;
  formData.message = message;

  saveToLS('feedback', formData);
});

document.addEventListener('DOMContentLoaded', () => {
  const lsData = getFromLS('feedback');
  try {
    refs.form.elements.email.value = lsData.email;
    refs.form.elements.message.value = lsData.message;
  } catch {
    refs.form.elements.email.value = '';
    refs.form.elements.message.value = '';
  }
});

document.addEventListener('submit', e => {
  e.preventDefault();
  const email = refs.form.elements.email.value.trim()
  const message = refs.form.elements.message.value.trim();

  if (!email || !message) {
    alert('Fill please all fields');
    return
  }
  
  console.log(formData)
  

  localStorage.removeItem('feedback')
  formData.email = '';
  formData.message = '';
  refs.form.reset()
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    return data;
  } catch {
    return defaultValue || jsonData;
  }
}