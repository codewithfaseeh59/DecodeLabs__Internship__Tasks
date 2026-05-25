# Project 4 — Form Design & Validation

🔗 **Live Preview:** [Validation Form](https://form-design-validation.vercel.app)

---

## Overview

This project involves building a fully functional and visually styled **contact form** with client-side input validation using vanilla HTML, CSS, and JavaScript. GSAP (GreenSock Animation Platform) has been used to enhance the user experience with smooth animations on load, interaction feedback, and page transitions.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Form structure and semantic markup |
| CSS3 | Styling, layout, and state-based visual feedback |
| JavaScript (ES6+) | Validation logic and DOM manipulation |
| GSAP 3.12.5 | Animations — entrance, transitions, error feedback |

---

## Features

- Input fields for Name, Email, Phone Number, and Message
- Real-time validation feedback on blur and input events
- Distinct error and success states with inline messages
- Animated underline effect on input focus
- GSAP-powered entrance animation on page load
- Shake animation on invalid fields and submit button
- Success screen shown after valid form submission
- Full form reset with re-animated entrance

---

## File Structure

```
project-04/
│
├── index.html       — Markup and form structure
├── style.css        — Styles, themes, and validation states
├── script.js        — Validation logic and GSAP animations
└── README.md        — Project documentation
```

---

## Form Fields & Validation Rules

| Field | Type | Validation Rules |
|---|---|---|
| Full Name | `text` | Required · Minimum 3 characters · Letters and spaces only |
| Email Address | `email` | Required · Must match standard email format (`x@x.x`) |
| Phone Number | `tel` | Required · 7–15 digits · Accepts `+`, spaces, dashes, brackets |
| Message | `textarea` | Required · Minimum 10 characters |

---

## How Validation Works

### On Blur (when user leaves a field)
Full validation runs and either an error or success message is displayed.

### On Input (while user is typing)
If the field currently has an error state, it is cleared immediately so the user gets instant visual relief as they correct their input.

### On Submit
All four fields are validated simultaneously. If any field fails, the form does not submit and the respective errors are shown. A shake animation on the submit button provides additional feedback.

---

## Validation Logic

Each field has a dedicated `validate()` function inside a `rules` object. The function receives the trimmed input value and returns either an error message string (if invalid) or `null` (if valid).

```javascript
const rules = {
  name: {
    validate(val) {
      if (!val) return 'Name is required.';
      if (val.length < 3) return 'Minimum 3 characters required.';
      if (!/^[a-zA-Z\s]+$/.test(val)) return 'Only letters are allowed.';
      return null;
    }
  },
  // email, phone, message follow the same pattern
};
```

This structure keeps validation rules modular and easy to extend.

---

## Regex Reference

| Field | Pattern | Purpose |
|---|---|---|
| Name | `/^[a-zA-Z\s]+$/` | Allows only letters and spaces |
| Email | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | Validates basic email format |
| Phone | `/^\d{7,15}$/` | Validates digit count after stripping formatting characters |

Phone numbers are cleaned before validation:
```javascript
const clean = val.replace(/[\s\-\(\)\+]/g, '');
```
This allows inputs like `+92 300 1234567` or `(021) 111-222-333` to pass correctly.

---

## GSAP Animations

| Animation | Trigger | GSAP Method | Ease Used |
|---|---|---|---|
| Page entrance (staggered) | On load | `gsap.timeline()` | `power3.out` |
| Error shake | On failed validation | `gsap.fromTo()` | `elastic.out(1, 0.3)` |
| Submit button shake | On submit with errors | `gsap.fromTo()` | `elastic.out(1, 0.4)` |
| Form card exit | On valid submit | `gsap.timeline()` | `power3.in` |
| Success card entrance | After form exits | `gsap.fromTo()` | `back.out(1.4)` |
| Success icon spin-in | After success card | `gsap.fromTo()` | `back.out(2)` |
| Reset & re-entrance | On "Send Another" click | `gsap.set()` + `playEntrance()` | `power3.out` |

---

## CSS Techniques Used

- **CSS Custom Properties** for consistent theming across all states
- **`:focus-within`** pseudo-class to apply parent-level styles when a child input is focused
- **`::after` pseudo-element** for the animated underline sweep effect on focus
- **Class-based state management** — `.error` and `.success` classes applied to the `.field-group` wrapper drive all visual state changes via descendant selectors
- **CSS transitions** on `.msg` span for smooth fade-in of validation messages

---

## How to Run

1. Clone or download the project folder
2. Open `index.html` in any modern browser
3. No build tools or dependencies required — runs entirely in the browser

---