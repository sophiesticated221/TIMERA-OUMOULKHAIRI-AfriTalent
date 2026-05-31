// Mode Sombre

// Récupère le bouton qui permet de changer de thème
const themeToggle = document.getElementById("theme-toggle");

// Vérifie si le thème sauvegardé dans le navigateur est "dark"
if (localStorage.getItem("theme") === "dark") {

    // Ajoute la classe dark-mode au body
    // Cela active tous les styles CSS du mode sombre
    document.body.classList.add("dark-mode");
}
if (themeToggle) {
    // Écoute le clic sur le bouton dark mode
    themeToggle.addEventListener("click", () => {

        // Ajoute ou retire automagittiquement la classe dark-mode
        document.body.classList.toggle("dark-mode");

        // Vérifie si le body possède actuellement la classe dark-mode
        if (document.body.classList.contains("dark-mode")) {

        // Sauvegarde le thème dark dans le navigateur
        // Le thème restera actif même après actualisation
        localStorage.setItem("theme", "dark");

        } else {
        // Sinon sauvegarde le thème light
        localStorage.setItem("theme", "light");
        }
    });
}

// NAVBAR dynamique au scroll

// Sélectionne la navbar
const navbar = document.querySelector(".navbar");

// Détecte le scroll de la page
window.addEventListener("scroll", () => {

    // Vérifie si l'utilisateur a scrollé de plus de 50px
    if (window.scrollY > 50) {

        // Ajoute la classe scrolled
        // Cela permet de modifier le style de la navbar en CSS(Exemple : ombre, réduction taille, changement fond)

        navbar.classList.add("scrolled");
    } else {
        // Retire la classe si on revient en haut
        navbar.classList.remove("scrolled");
    }
});

// Bouton retour en haut

// Récupère le bouton retour en haut
const backToTop = document.getElementById("backToTop");

// Détecte le scroll de la page
window.addEventListener("scroll", () => {
    // Si l'utilisateur descend de plus de 300px
    if (window.scrollY > 300) {
        // Affiche le bouton
        // La classe .show active opacity et visibility
        backToTop.classList.add("show");

    } else {
        // Cache le bouton quand on remonte
        backToTop.classList.remove("show");
    }
});

//    Détecte le clic sur le bouton
backToTop.addEventListener("click", () => {
    // Fait remonter la page en haut avec animation fluide
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
// Sélection des compteurs

// On récupère tous les éléments ayant la classe "counter"
const counters = document.querySelectorAll('.counter');

// INTERSECTION OBSERVER POUR LES COMPTEURS

// IntersectionObserver permet de détecter
// quand un élément entre dans l'écran
const counterObserver = new IntersectionObserver(

  // "entries" contient les éléments observés; "observer" représente l'observer lui-même
  (entries, observer) => {

    // On parcourt chaque élément détecté
    entries.forEach(entry => {

      // Vérifie si l'élément est visible à l'écran
      if (entry.isIntersecting) {

        // Élément actuellement visible
        const counter = entry.target;
        // Récupère la valeur finale depuis data-target
        const target = +counter.getAttribute('data-target'); // Le "+" transforme le texte en nombre

        // Valeur de départ du compteur
        let count = 0;

        // Fonction qui anime le compteur
        const updateCounter = () => {
          // Vitesse de l'incrémentation
          const increment = target / 100;
          // Tant qu'on n'a pas atteint la valeur finale
          if (count < target) {
            
            count += increment; // on augmente progressivement
            counter.textContent = Math.ceil(count); //affichage

            requestAnimationFrame(updateCounter); // Redemande une nouvelle animation fluide
          } else {

            
            counter.textContent = target; // affiche exactement la valeur finale
          }
        };
        
        updateCounter(); // Lance l'animation
        
        observer.unobserve(counter); // Arrête d'observer cet élément pour éviter que l'animation recommence
      }
    });
  },
  {
    
    threshold: 0.5 // L'animation démarre quand 50% de l'élément est visible
  }
);
// On commence à observer chaque section

counters.forEach(counter => {
  // L'observer surveille chaque compteur
  counterObserver.observe(counter);
});
// Animation fade in des sections

// On récupère toutes les sections ayant la classe fade-section
const fadeSections = document.querySelectorAll('.fade-in');
// Création de l'observer
const fadeObserver = new IntersectionObserver(
  (entries) => {
    // Parcourt toutes les sections observées
    entries.forEach(entry => {
      // Vérifie si la section est visible
      if (entry.isIntersecting) {
        // Ajoute la classe "visible"
        // ce qui déclenche l'animation CSS
        entry.target.classList.add('visible');
      }
    });
  },
  // Options
  {
    // Déclenche quand 20% de la section est visible
    threshold: 0.2
  }
);

// Observations des sections
fadeSections.forEach(section => {
  // L'observer surveille chaque section
  fadeObserver.observe(section);
});

// FILTRAGE DYNAMIQUE DES FREELANCES

// Sélectionne tous les boutons de filtre
const filterButtons = document.querySelectorAll('.filter-btn');

// Sélectionne tous les éléments freelances
const freelanceItems = document.querySelectorAll('.freelance-item');

// Parcourt chaque bouton
filterButtons.forEach(button => {

    // Détecte le clic sur un bouton
    button.addEventListener('click', () => {

        // Retire la classe active de tous les boutons
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Ajoute active au bouton cliqué
        button.classList.add('active');

        // Récupère la catégorie du bouton
        const filter = button.getAttribute('data-filter');

        // Parcourt tous les freelances
        freelanceItems.forEach(item => {

            // Récupère la catégorie de l'élément
            const category = item.getAttribute('data-category');

            // Vérifie si on doit afficher l'élément
            if (filter === 'all' || filter === category) {

                // Affiche l'élément
                item.style.display = '';

            } else {

                // Cache l'élément
                item.style.display = 'none';
            }
        });
    });
});


// VALIDATION DU FORMULAIRE DE CONTACT

// Sélectionne le formulaire
const contactForm = document.getElementById('contactForm');

// Vérifie si le formulaire existe
if (contactForm) {

    // Détecte la soumission du formulaire
    contactForm.addEventListener('submit', (e) => {

        // Empêche le rechargement de la page
        e.preventDefault();

        // Récupération des champs
        const nom = document.getElementById('nom');
        const prenom = document.getElementById('prenom');
        const email = document.getElementById('email');
        const sujet = document.getElementById('sujet');
        const message = document.getElementById('message');
        const successMessage = document.getElementById('success-message');

        // Regex email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Variable validation
        let isValid = true;

        // Réinitialisation des erreurs
        const formControls = document.querySelectorAll('.form-control, .form-select');

        formControls.forEach(field => {
            field.classList.remove('is-invalid');
        });

        // Cache message succès
        successMessage.classList.add('d-none');

        // VALIDATION NOM
        if (nom.value.trim() === '') {
            nom.classList.add('is-invalid');
            isValid = false;
        }

        // VALIDATION PRENOM
        if (prenom.value.trim() === '') {
            prenom.classList.add('is-invalid');
            isValid = false;
        }

        // VALIDATION EMAIL
        if (email.value.trim() === '') {
            email.classList.add('is-invalid');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            email.classList.add('is-invalid');
            isValid = false;
        }

        // VALIDATION SUJET
        if (sujet.value === '') {
            sujet.classList.add('is-invalid');
            isValid = false;
        }

        // VALIDATION MESSAGE
        if (message.value.trim() === '') {
            message.classList.add('is-invalid');
            isValid = false;
        } else if (message.value.trim().length < 20) {
            message.classList.add('is-invalid');
            isValid = false;
        }

        // SI TOUT EST OK
        if (isValid) {
            successMessage.classList.remove('d-none');
            contactForm.reset();
        }
    });
}