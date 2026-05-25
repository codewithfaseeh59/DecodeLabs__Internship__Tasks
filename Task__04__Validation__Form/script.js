const form        = document.getElementById('contactForm');
const formCard    = document.getElementById('formCard');
const successCard = document.getElementById('successCard');
const resetBtn    = document.getElementById('resetBtn');

// ─── ENTRANCE ANIMATION ───────────────────────
function playEntrance() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo(formCard,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.7 }
  )
  .to('.badge',    { opacity: 1, duration: 0.4 }, '-=0.3')
  .to('.title',    { opacity: 1, duration: 0.5 }, '-=0.2')
  .to('.subtitle', { opacity: 1, duration: 0.4 }, '-=0.2')
  .to('.field-group', {
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 0.5
  }, '-=0.2')
  .to('#submitBtn', { opacity: 1, duration: 0.4 }, '-=0.1');
}

playEntrance();


// ─── VALIDATION RULES ────────────────────────
const rules = {
  name: {
    validate(val) {
      if (!val) return 'Name can\'t be empty, bro.';
      if (val.length < 3) return 'At least 3 characters needed.';
      if (!/^[a-zA-Z\s]+$/.test(val)) return 'Only letters allowed.';
      return null;
    }
  },
  email: {
    validate(val) {
      if (!val) return 'Email is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Enter a valid email address.';
      return null;
    }
  },
  phone: {
    validate(val) {
      if (!val) return 'Phone number is required.';
      const clean = val.replace(/[\s\-\(\)\+]/g, '');
      if (!/^\d{7,15}$/.test(clean)) return 'Enter a valid phone number.';
      return null;
    }
  },
  message: {
    validate(val) {
      if (!val) return 'Message can\'t be empty.';
      if (val.length < 10) return 'At least 10 characters please.';
      return null;
    }
  }
};


// ─── SHOW FIELD STATE ─────────────────────────
function setFieldState(id, errorMsg) {
  const fg  = document.getElementById(`fg-${id}`);
  const msg = document.getElementById(`msg-${id}`);

  fg.classList.remove('error', 'success');
  msg.classList.remove('show');

  if (errorMsg) {
    fg.classList.add('error');
    msg.textContent = '✕ ' + errorMsg;
    msg.classList.add('show');

    // shake animation on error
    gsap.fromTo(`#fg-${id}`,
      { x: -8 },
      { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
    );
  } else {
    fg.classList.add('success');
    msg.textContent = '✓ Looks good!';
    msg.classList.add('show');
  }
}


// ─── VALIDATE SINGLE FIELD ────────────────────
function validateField(id) {
  const input = document.getElementById(id);
  const val   = input.value.trim();
  const error = rules[id].validate(val);
  setFieldState(id, error);
  return !error;
}


// ─── REAL-TIME VALIDATION ON BLUR ────────────
['name', 'email', 'phone', 'message'].forEach(id => {
  const input = document.getElementById(id);

  input.addEventListener('blur', () => validateField(id));

  // clear error state while user is typing after an error
  input.addEventListener('input', () => {
    const fg = document.getElementById(`fg-${id}`);
    if (fg.classList.contains('error')) {
      fg.classList.remove('error');
      const msg = document.getElementById(`msg-${id}`);
      msg.classList.remove('show');
    }
  });
});


// ─── SUBMIT ───────────────────────────────────
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const results = [
    validateField('name'),
    validateField('email'),
    validateField('phone'),
    validateField('message')
  ];

  const allValid = results.every(Boolean);

  if (!allValid) {
    // wiggle the button if errors exist
    gsap.fromTo('#submitBtn',
      { x: -6 },
      { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' }
    );
    return;
  }

  // ── All valid → success transition ──
  const tl = gsap.timeline();

  tl.to('#submitBtn', {
    scale: 0.95,
    duration: 0.1,
    ease: 'power1.in'
  })
  .to('#submitBtn', {
    scale: 1,
    duration: 0.2,
    ease: 'back.out'
  })
  .to(formCard, {
    opacity: 0,
    y: -30,
    duration: 0.5,
    ease: 'power3.in',
    onComplete: showSuccess
  });
});


// ─── SHOW SUCCESS CARD ────────────────────────
function showSuccess() {
  formCard.style.visibility = 'hidden';
  successCard.style.display = 'flex';

  gsap.fromTo(successCard,
    { opacity: 0, scale: 0.9, y: 30 },
    { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' }
  );

  gsap.fromTo('.success-icon',
    { scale: 0, rotation: -90 },
    { scale: 1, rotation: 0, duration: 0.6, delay: 0.3, ease: 'back.out(2)' }
  );

  gsap.from('.success-card h2', {
    opacity: 0, y: 20, duration: 0.5, delay: 0.5, ease: 'power3.out'
  });

  gsap.from('.success-card p', {
    opacity: 0, y: 15, duration: 0.5, delay: 0.65, ease: 'power3.out'
  });

  gsap.from('#resetBtn', {
    opacity: 0, y: 10, duration: 0.4, delay: 0.8, ease: 'power3.out'
  });
}


// ─── RESET FORM ───────────────────────────────
resetBtn.addEventListener('click', () => {
  gsap.to(successCard, {
    opacity: 0,
    scale: 0.9,
    duration: 0.4,
    ease: 'power3.in',
    onComplete: () => {
      successCard.style.display = 'none';
      form.reset();

      // clear all field states
      ['name','email','phone','message'].forEach(id => {
        const fg = document.getElementById(`fg-${id}`);
        const msg = document.getElementById(`msg-${id}`);
        fg.classList.remove('error','success');
        msg.classList.remove('show');
        msg.textContent = '';
      });

      formCard.style.visibility = 'visible';

      // reset & re-animate form card
      gsap.set(formCard, { opacity: 0, y: 40 });
      gsap.set('.field-group', { opacity: 0, y: 20 });
      gsap.set('#submitBtn', { opacity: 0 });
      gsap.set(['.badge','.title','.subtitle'], { opacity: 0 });

      playEntrance();
    }
  });
});
