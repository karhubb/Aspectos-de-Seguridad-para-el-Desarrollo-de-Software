/**
 * main.js — gob.mx (refactor)
 * Sustituye los manejadores de eventos en línea (onkeydown, onclick)
 * y el uso de la API obsoleta KeyboardEvent.keyCode del HTML original.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSearchForm();
  initMobileNav();
});

/**
 * Buscador: intercepta el submit nativo del <form> en lugar de
 * depender de onkeydown="if (event.keyCode == 13) {...}".
 */
function initSearchForm() {
  const form = document.getElementById('frmBuscador');
  const input = document.getElementById('campoBusqueda');
  if (!form || !input) return;

  form.addEventListener('submit', (event) => {
    const query = input.value.trim();
    if (!query) {
      event.preventDefault();
      input.focus();
      return;
    }
    trackEvent('buscador_buscar_click');
  });

  input.addEventListener('keydown', (event) => {
    // event.key en vez de event.keyCode (deprecado)
    if (event.key === 'Enter') {
      trackEvent('buscador_campo_enter');
    }
  });
}

/**
 * Menú responsive: alterna la visibilidad del menú principal
 * en pantallas pequeñas sin manipular estilos en línea.
 */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menuPrincipal');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

/**
 * Envoltorio simple de analítica (gtag) desacoplado del marcado.
 */
function trackEvent(eventName) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName);
  }
}
