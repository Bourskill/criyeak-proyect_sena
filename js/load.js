const contLoad = document.querySelector(".container-loader");

const anim = lottie.loadAnimation({
  container: document.querySelector(".loader-criyeak"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "json/loader.json"
});

console.log(contLoad);

window.addEventListener("load", () => {
  setTimeout(() => {
    contLoad.style.animation = "opacidad .5s forwards reverse";
    setTimeout(() => {
      contLoad.style.display = "none";
      anim.pause();
    }, 500);
  }, 2000);
});
