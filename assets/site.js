'use strict';
const menu = document.querySelector('.menu-button');
const navigation = document.querySelector('#primary-nav');
if (menu && navigation) {
 const close = () => { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); };
 menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('is-open', open); });
 document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { close(); menu.focus(); } });
 navigation.addEventListener('click', event => { if (event.target.closest('a')) close(); });
}
const form = document.querySelector('#contact-form');
if (form) {
 const topic = new URLSearchParams(location.search).get('topic');
 if (topic && Array.from(form.elements.topic.options).some(option => option.value === topic)) form.elements.topic.value = topic;
 form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `BridgePoint enquiry: ${data.get('topic')}`;
  const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company') || 'Not specified'}\nArea: ${data.get('topic')}\n\n${data.get('message')}`;
  document.querySelector('#email-draft').value = `To: bridgepoint@gmail.com\nSubject: ${subject}\n\n${body}`;
  document.querySelector('#email-fallback').hidden = false;
  document.querySelector('#form-status').textContent = 'Your draft is ready. Send it from your email application, or use the draft below.';
  location.href = `mailto:bridgepoint@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
 });
}
