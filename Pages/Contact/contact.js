document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-contact-status]');

  if (!form || !status) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const company = (formData.get('company') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const phone = (formData.get('phone') || '').toString().trim();
    const focus = (formData.get('focus') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    if (!name || !email || !focus || !message) {
      status.textContent = 'Please complete the required fields before submitting.';
      return;
    }

    const subject = `MWF inquiry: ${focus}`;
    const lines = [
      `Name: ${name}`,
      `Company: ${company || 'Not provided'}`,
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      `Focus area: ${focus}`,
      '',
      'Project details:',
      message
    ];
    const mailtoHref = `mailto:MWFServices@Marketingwithaflair.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;

    status.textContent = 'Opening your email app with your completed message.';
    window.location.href = mailtoHref;
  });
});
