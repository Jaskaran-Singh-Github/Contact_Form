document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear previous errors
    clearErrors();

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const consent = document.getElementById('consent');
    const query = form.querySelector('input[name="query"]:checked');

    let isValid = true;

    // Validate each field
    if (!firstName.value.trim()) {
      showError(firstName, 'First name is required');
      isValid = false;
    }

    if (!lastName.value.trim()) {
      showError(lastName, 'Last name is required');
      isValid = false;
    }

    if (!email.value.trim()) {
      showError(email, 'Email is required');
      isValid = false;
    } else if (!validateEmail(email.value)) {
      showError(email, 'Please enter a valid email address');
      isValid = false;
    }

    if (!query) {
      showErrorGroup(form.querySelector('.query-type'), 'Please select a query type');
      isValid = false;
    }

    if (!message.value.trim()) {
      showError(message, 'Message is required');
      isValid = false;
    }

    if (!consent.checked) {
      showErrorGroup(consent, 'You must consent to be contacted');
      isValid = false;
    }

    if (isValid) {
      showSuccess('Your message has been sent successfully!');
      form.reset();
    }
  });

  // Helpers
  function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error-message';
    error.setAttribute('role', 'alert');
    error.style.color = 'red';
    error.style.fontSize = '13px';
    error.textContent = message;
    input.setAttribute('aria-invalid', 'true');
    input.parentNode.appendChild(error);
  }

  function showErrorGroup(element, message) {
    const error = document.createElement('div');
    error.className = 'error-message';
    error.setAttribute('role', 'alert');
    error.style.color = 'red';
    error.style.fontSize = '13px';
    error.style.marginTop = '6px';
    error.textContent = message;
    element.setAttribute('aria-invalid', 'true');
    element.parentNode.appendChild(error);
  }

  function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('[aria-invalid="true"]').forEach(el => el.removeAttribute('aria-invalid'));
  }

  function validateEmail(email) {
    // Simple email pattern
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email.toLowerCase());
  }

  function showSuccess(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = '#28a745';
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    toast.style.zIndex = 1000;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
});



