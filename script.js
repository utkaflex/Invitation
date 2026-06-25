const FORM_ENDPOINT = "https://formsubmit.co/varvara.osoka@gmail.com";

function bindRsvpLinks() {
  const modal = document.getElementById("rsvp-modal");
  const openers = document.querySelectorAll(".js-rsvp-link");
  const closers = modal?.querySelectorAll("[data-close-modal]") ?? [];
  const form = document.getElementById("rsvp-form");
  const formContent = modal?.querySelector(".modal__content--form");
  const successContent = modal?.querySelector(".modal__content--success");
  const nameField = form?.querySelector('input[name="ФИО"]');

  if (!modal || !form || !formContent || !successContent || !nameField) {
    return;
  }

  form.setAttribute("action", FORM_ENDPOINT);

  function openModal(event) {
    event.preventDefault();
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    window.setTimeout(() => nameField.focus(), 30);
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function showFormState() {
    form.reset();
    formContent.hidden = false;
    successContent.hidden = true;
  }

  function showSuccessState() {
    formContent.hidden = true;
    successContent.hidden = false;
  }

  openers.forEach((link) => {
    link.addEventListener("click", openModal);
    link.setAttribute("href", "#rsvp-modal");
  });

  closers.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  form.addEventListener("submit", () => {
    showSuccessState();
    window.setTimeout(closeModal, 1400);
  });

  modal.addEventListener("transitionend", () => {
    if (!modal.classList.contains("is-open")) {
      showFormState();
    }
  });
}

function initRevealAnimations() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -6% 0px",
    }
  );

  items.forEach((item) => observer.observe(item));
}

bindRsvpLinks();
initRevealAnimations();
