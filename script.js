const TELEGRAM_URL = "https://t.me/Tatarena";

function bindRsvpLinks() {
  const modal = document.getElementById("rsvp-modal");
  const openers = document.querySelectorAll(".js-rsvp-link");
  const closers = modal?.querySelectorAll("[data-close-modal]") ?? [];
  const form = document.getElementById("rsvp-form");
  const nameField = form?.querySelector("#fullName");

  if (!modal || !form || !nameField) {
    return;
  }

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
}

function initContactLinks() {
  const telegramLink = document.getElementById("telegram-link");

  if (!telegramLink) {
    return;
  }

  // Replace USERNAME_HERE with the organizer's real Telegram username.
  telegramLink.setAttribute("href", TELEGRAM_URL);
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
initContactLinks();
initRevealAnimations();
