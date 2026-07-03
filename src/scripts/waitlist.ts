const PHONE_REGEX = /^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
const GENERIC_ERROR = "Xatolik yuz berdi. Qaytadan urinib ko'ring.";
const VALIDATION_ERROR = 'Telefon raqamni to\'liq kiriting';
const SUCCESS_MESSAGE = "✅ Rahmat! Ilova chiqishi bilan sizga xabar beramiz.";

function formatPhone(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('998')) digits = digits.slice(3);
  digits = digits.slice(0, 9);

  let out = '+998';
  if (digits.length > 0) out += ' ' + digits.slice(0, 2);
  if (digits.length > 2) out += ' ' + digits.slice(2, 5);
  if (digits.length > 5) out += ' ' + digits.slice(5, 7);
  if (digits.length > 7) out += ' ' + digits.slice(7, 9);
  return out;
}

function setupForm(form: HTMLFormElement) {
  const input = form.querySelector<HTMLInputElement>('[data-phone-input]');
  const errorEl = form.querySelector<HTMLElement>('[data-error-msg]');
  const submitBtn = form.querySelector<HTMLButtonElement>('[data-submit-btn]');
  const successEl = form.parentElement?.querySelector<HTMLElement>('[data-success-msg]');

  if (!input || !errorEl || !submitBtn) return;

  const showError = (message: string | null) => {
    if (message) {
      errorEl.textContent = message;
      errorEl.hidden = false;
      input.setAttribute('aria-invalid', 'true');
    } else {
      errorEl.hidden = true;
      input.removeAttribute('aria-invalid');
    }
  };

  input.addEventListener('focus', () => {
    if (!input.value) input.value = '+998 ';
  });

  input.addEventListener('input', () => {
    const cursorAtEnd = input.selectionEnd === input.value.length;
    input.value = formatPhone(input.value);
    if (cursorAtEnd) {
      input.setSelectionRange(input.value.length, input.value.length);
    }
    if (!errorEl.hidden) showError(null);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const value = input.value.trim();
    if (!PHONE_REGEX.test(value)) {
      showError(VALIDATION_ERROR);
      input.focus();
      return;
    }

    showError(null);
    submitBtn.disabled = true;

    const normalizedPhone = value.replace(/\s/g, '');
    const utmSource = new URLSearchParams(window.location.search).get('utm_source');
    const payload = { phone: normalizedPhone, source: utmSource ?? 'direct' };

    const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
    const ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

    if (!SUPABASE_URL || !ANON_KEY) {
      console.log('[waitlist] Supabase env vars missing, payload:', payload);
      showSuccess();
      return;
    }

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
          apikey: ANON_KEY,
          Authorization: `Bearer ${ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok || res.status === 409) {
        showSuccess();
      } else {
        showError(GENERIC_ERROR);
        submitBtn.disabled = false;
      }
    } catch {
      showError(GENERIC_ERROR);
      submitBtn.disabled = false;
    }
  });

  function showSuccess() {
    if (successEl) {
      successEl.textContent = SUCCESS_MESSAGE;
      successEl.hidden = false;
    }
    form.hidden = true;
  }
}

export function initWaitlistForms() {
  const forms = document.querySelectorAll<HTMLFormElement>('[data-waitlist-form]');
  forms.forEach(setupForm);
}
