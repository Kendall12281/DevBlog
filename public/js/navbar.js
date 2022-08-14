function NavbarClicked() {
  const primaryNav = document.querySelector(".primary-navigation");
  const navToggle = document.querySelector(".mobile-nav-toggle");
  const grid = document.getElementsByClassName("grid");
  //   const card = document.getElementsByClassName("card");

  navToggle.addEventListener("click", () => {
    const visibilityNavbar = primaryNav.getAttribute("data-visible");

    //Set opacity to cards & Show navbar
    if (visibilityNavbar == "false") {
      grid[0].style.opacity = 0.4;
      grid[0].setAttribute("data-visible", "false");

      primaryNav.setAttribute("data-visible", "true");
      navToggle.setAttribute("aria-expanded", "true");
    } else {
      grid[0].style.opacity = 1;
      grid[0].setAttribute("data-visible", "true");

      primaryNav.setAttribute("data-visible", "false");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function clicked() {
  const primaryNav = document.querySelector(".primary-navigation");
  const navToggle = document.querySelector(".mobile-nav-toggle");
  const grid = document.getElementsByClassName("grid");

  //Apply opacity
  grid[0].style.opacity = 1;
  grid[0].setAttribute("data-visible", "true");

  //Set invisible
  primaryNav.setAttribute("data-visible", "false");
  navToggle.setAttribute("aria-expanded", "false");
}

export { NavbarClicked,clicked };
