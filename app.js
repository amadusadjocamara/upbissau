const STORAGE_KEY = "orange_bissau_registrations";

const form = document.getElementById("register-form");
const modal = document.getElementById("success-modal");
const modalClose = document.getElementById("modal-close");
const modalMessage = document.getElementById("modal-message");

function normalizePhone(value) {
  return value.replace(/\D/g, "");
}

function isValidGuineaBissauPhone(phone) {
  const digits = normalizePhone(phone);
  return /^[67]\d{8}$/.test(digits) || /^9[567]\d{6}$/.test(digits);
}

function setError(fieldName, message) {
  const input = form.elements[fieldName];
  const errorEl = document.querySelector(`[data-for="${fieldName}"]`);

  if (input && input.classList) {
    input.classList.toggle("invalid", Boolean(message));
  }

  if (errorEl) {
    errorEl.textContent = message;
  }
}

function clearErrors() {
  ["fullName", "orangeNumber", "email", "terms"].forEach((field) =>
    setError(field, "")
  );
}

function validateForm(data) {
  let valid = true;

  if (!data.fullName.trim() || data.fullName.trim().length < 3) {
    setError("fullName", "Informe o seu nome completo.");
    valid = false;
  } else {
    setError("fullName", "");
  }

  if (!isValidGuineaBissauPhone(data.orangeNumber)) {
    setError(
      "orangeNumber",
      "Número inválido. Use um número Orange válido (9 dígitos)."
    );
    valid = false;
  } else {
    setError("orangeNumber", "");
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    setError("email", "E-mail inválido.");
    valid = false;
  } else {
    setError("email", "");
  }

  if (!data.terms) {
    setError("terms", "Aceite os termos para continuar.");
    valid = false;
  } else {
    setError("terms", "");
  }

  return valid;
}

function getRegistrations() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveRegistration(entry) {
  const registrations = getRegistrations();
  const phone = normalizePhone(entry.orangeNumber);

  if (registrations.some((r) => normalizePhone(r.orangeNumber) === phone)) {
    return { success: false, reason: "duplicate" };
  }

  registrations.push({
    ...entry,
    orangeNumber: phone,
    registeredAt: new Date().toISOString(),
    bonusRate: 0.5,
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
  return { success: true };
}

function showModal(message) {
  modalMessage.textContent = message;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function hideModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();

  const data = {
    fullName: form.fullName.value,
    orangeNumber: form.orangeNumber.value,
    email: form.email.value.trim(),
    terms: form.terms.checked,
  };

  if (!validateForm(data)) {
    return;
  }

  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = "A cadastrar...";

  setTimeout(() => {
    const result = saveRegistration(data);

    submitBtn.disabled = false;
    submitBtn.textContent = "Cadastrar e ganhar bónus";

    if (result.reason === "duplicate") {
      setError(
        "orangeNumber",
        "Este número já está cadastrado no programa de bónus."
      );
      return;
    }

    form.reset();
    showModal(
      `Parabéns, ${data.fullName.split(" ")[0]}! O seu cadastro foi registado. ` +
        "Receberá 50% de bónus em cada recarga via Orange Money."
    );
  }, 800);
});

modalClose.addEventListener("click", hideModal);
modal.querySelector(".modal__backdrop").addEventListener("click", hideModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    hideModal();
  }
});
