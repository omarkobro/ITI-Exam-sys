// ===== Fake Page Loader =====

(function () {
  function hideLoader(delay = 1000) {
    setTimeout(() => {
      const loader = document.getElementById("page-loader");
      if (!loader) return;

      loader.classList.add("hidden");

      // optional: remove from DOM after animation
      setTimeout(() => loader.remove(), 600);
    }, delay);
  }

  window.addEventListener("load", () => hideLoader());
})();
