// REVEAL
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // evita repetir animación
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

// ANIMACION DE TEXTO
const elemento = document.getElementById("tipo-dinamico");

const palabras = [
  "Desarrollo de Software",
  "Desarrollo Web",
  "Diseño Gráfico"
];

let palabraIndex = 0;
let letraIndex = 0;
let borrando = false;

function animarTexto() {
  const palabraActual = palabras[palabraIndex];

  if (!borrando) {
    // Escribir
    elemento.textContent = palabraActual.slice(0, letraIndex + 1);
    letraIndex++;

    if (letraIndex === palabraActual.length) {
      borrando = true;
      setTimeout(animarTexto, 1200);
      return;
    }
  } else {
    // Borrar
    elemento.textContent = palabraActual.slice(0, letraIndex - 1);
    letraIndex--;

    if (letraIndex === 0) {
      borrando = false;
      palabraIndex = (palabraIndex + 1) % palabras.length;
    }
  }

  setTimeout(animarTexto, borrando ? 60 : 80);
}

animarTexto();

// SCROLL FORCE
document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));

    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY;

    smoothScrollTo(top, 1000); // 1000ms = 1 segundo
  });
});

function smoothScrollTo(to, duration) {
  const start = window.scrollY;
  const difference = to - start;
  const startTime = performance.now();

  function animation(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    window.scrollTo(0, start + difference * easeInOutQuad(progress));

    if (elapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}

function easeInOutQuad(t) {
  return t < 0.5
    ? 2 * t * t
    : -1 + (4 - 2 * t) * t;
}

// Detecta cuando el iframe termina de recibir la respuesta de la API
document.getElementById("hiddenFrame").onload = function () {

    Swal.fire({
        title: "¡Mensaje enviado!",
        text: "Nos pondremos en contacto contigo pronto.",
        icon: "success",
        confirmButtonColor: "#00ff9d",
        confirmButtonText: "Entendido"
    });

    document.getElementById("miFormulario").reset();

    const btn = document.querySelector("[data-form-btn]");
    btn.disabled = true;
};
