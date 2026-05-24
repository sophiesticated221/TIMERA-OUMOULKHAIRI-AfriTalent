// Mode Sombre

// Récupère le bouton qui permet de changer de thème
const themeToggle = document.getElementById("theme-toggle");

// Vérifie si le thème sauvegardé dans le navigateur est "dark"
if (localStorage.getItem("theme") === "dark") {

    // Ajoute la classe dark-mode au body
    // Cela active tous les styles CSS du mode sombre
    document.body.classList.add("dark-mode");
}

// Écoute le clic sur le bouton dark mode
themeToggle.addEventListener("click", () => {

    // Ajoute ou retire automatiquement la classe dark-mode
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