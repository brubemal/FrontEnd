const themeToggleButton = document.getElementById('theme-toggle');
const rootBody = document.body;
const savedTheme = localStorage.getItem('netflix-theme');

function applyTheme(theme) {
  if (theme === 'light') {
    rootBody.classList.add('light-mode');
    themeToggleButton.textContent = '🌙';
  } else {
    rootBody.classList.remove('light-mode');
    themeToggleButton.textContent = '☀️';
  }
}

function toggleTheme() {
  const isLight = rootBody.classList.contains('light-mode');
  const nextTheme = isLight ? 'dark' : 'light';
  applyTheme(nextTheme);
  localStorage.setItem('netflix-theme', nextTheme);
}

if (savedTheme === 'light') {
  applyTheme('light');
}

themeToggleButton.addEventListener('click', toggleTheme);

const profiles = document.querySelectorAll('.profile');
profiles.forEach(profile => {
  profile.addEventListener('click', () => {
    const img = profile.querySelector('img');
    const caption = profile.querySelector('figcaption')?.textContent.trim() || 'Perfil';

    if (img) {
      localStorage.setItem('perfilAtivoNome', caption);
      localStorage.setItem('perfilAtivoImagem', img.src);
      window.location.href = 'catalogo/catalogo.html';
    }
  });
});
