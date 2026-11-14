// Applies the saved theme before the first paint so the page doesn't flash light.
(function () {
    try {
        var boot = JSON.parse(localStorage.getItem('appearanceBoot') || '{}');
        var root = document.documentElement;
        if (boot.theme) root.dataset.theme = boot.theme;
        if (boot.density) root.dataset.density = boot.density;
        if (boot.accent) root.style.setProperty('--accent-color', boot.accent);
    } catch (e) {
        // First run: defaults from the markup
    }
})();
