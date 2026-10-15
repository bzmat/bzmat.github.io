document.addEventListener("DOMContentLoaded", () => {
  const bootSequence = document.getElementById('boot-sequence');
  const mainContent = document.getElementById('main-content');
  
  // 1. Gestione del boot (eseguito solo se c'è l'elemento boot-sequence)
  if (bootSequence) {
    setTimeout(() => {
      bootSequence.style.display = 'none';
      mainContent.style.display = 'block';
    }, 1500); // Nasconde il boot dopo 1.5 secondi
  } else {
    // Se non c'è boot (es. in about.html), mostra subito il contenuto
    mainContent.style.display = 'block';
  }

  // 2. Navigazione con le frecce della tastiera
  const navItems = Array.from(document.querySelectorAll('.nav-item'));
  let currentIndex = 0;

  // Imposta la classe 'focus-target' sul primo elemento di default
  if (navItems.length > 0) {
    navItems.forEach(item => item.classList.remove('focus-target'));
    navItems[0].classList.add('focus-target');
  }

  document.addEventListener('keydown', (e) => {
    if (navItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      navItems[currentIndex].classList.remove('focus-target');
      currentIndex = (currentIndex + 1) % navItems.length;
      navItems[currentIndex].classList.add('focus-target');
      navItems[currentIndex].scrollIntoView({ block: 'nearest' });
    } 
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navItems[currentIndex].classList.remove('focus-target');
      currentIndex = (currentIndex - 1 + navItems.length) % navItems.length;
      navItems[currentIndex].classList.add('focus-target');
      navItems[currentIndex].scrollIntoView({ block: 'nearest' });
    }
    else if (e.key === 'Enter') {
      e.preventDefault();
      // Simula il click sul link attualmente selezionato
      navItems[currentIndex].click(); 
    }
  });
});
