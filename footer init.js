// ── CREDITS MODAL ──
var creditsModal      = document.getElementById('credits-modal');
var creditsTrigger    = document.getElementById('credits-trigger');
var creditsModalClose = document.getElementById('credits-modal-close');

function openCredits() {
  creditsModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  creditsModalClose.focus();
}
function closeCredits() {
  creditsModal.classList.remove('open');
  document.body.style.overflow = '';
  creditsTrigger.focus();
}
creditsTrigger.addEventListener('click', function(e) { e.preventDefault(); openCredits(); });
creditsModalClose.addEventListener('click', closeCredits);
creditsModal.addEventListener('click', function(e) { if (e.target === creditsModal) closeCredits(); });
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && creditsModal.classList.contains('open')) closeCredits();
});

// ── CONTACT MODAL ──
var contactModal         = document.getElementById('contact-modal');
var contactTrigger       = document.getElementById('contact-trigger');
var mobileContactTrigger = document.getElementById('mobile-contact-trigger');
var contactModalClose    = document.getElementById('contact-modal-close');
var contactForm          = document.getElementById('contact-form');
var contactStatus        = document.getElementById('contact-status');

function openContactModal() {
  contactModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  contactModalClose.focus();
}
function closeContactModal() {
  contactModal.classList.remove('open');
  document.body.style.overflow = '';
  contactTrigger.focus();
}
contactTrigger.addEventListener('click', function(e) { e.preventDefault(); openContactModal(); });
if (mobileContactTrigger) {
  mobileContactTrigger.addEventListener('click', function(e) {
    e.preventDefault();
    var mobileMenu = document.getElementById('mobile-menu');
    var hamburger  = document.querySelector('.nav-hamburger');
    if (mobileMenu) { mobileMenu.classList.remove('open'); mobileMenu.setAttribute('aria-hidden', 'true'); }
    if (hamburger)  { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
    document.body.style.overflow = '';
    openContactModal();
  });
}
contactModalClose.addEventListener('click', closeContactModal);
contactModal.addEventListener('click', function(e) { if (e.target === contactModal) closeContactModal(); });
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && contactModal.classList.contains('open')) closeContactModal();
});

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  var submit = contactForm.querySelector('.contact-submit');
  submit.textContent = 'Sending\u2026';
  submit.disabled = true;
  fetch(contactForm.action, {
    method: 'POST',
    body: new FormData(contactForm),
    headers: { 'Accept': 'application/json' }
  })
  .then(function(res) {
    if (res.ok) {
      contactStatus.textContent = 'Message sent \u2014 thank you.';
      contactStatus.classList.add('visible');
      contactForm.reset();
      submit.textContent = 'Send message';
      submit.disabled = false;
    } else { throw new Error(); }
  })
  .catch(function() {
    contactStatus.textContent = 'Something went wrong. Please try again.';
    contactStatus.classList.add('visible');
    submit.textContent = 'Send message';
    submit.disabled = false;
  });
});
