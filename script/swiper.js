document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    autoHeight: true,
    loop: false,
    speed: 300,
    autoplay: true,
    parallax: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
});
