//const body = document.querySelector("body");
/*body.style.overflow = "hidden";*/
const cover0 = document.querySelectorAll(".cover")[0];
const header = document.querySelector("header");
const headerOne = document.querySelector(".header-hijo1");
const headerTwo = document.querySelector(".header-hijo2");
const menuBoton = document.querySelector(".menu-btn");
const menuOptions = document.querySelector(".menu-options");

const boxSearch = document.querySelectorAll(".box-search")[0];
const searchBar = document.querySelectorAll(".search-bar")[0];
const inputSearch = document.querySelectorAll(".barra-texto")[0];
const lupa = document.querySelectorAll(".lupa")[0];
const templateLi = document.getElementById("list").content;

const boxSearch1 = document.querySelectorAll(".box-search")[1];
const searchBar1 = document.querySelectorAll(".search-bar")[1];
const inputSearch1 = document.querySelectorAll(".barra-texto")[1];
const lupa1 = document.querySelectorAll(".lupa")[1];
//REMOVER EVENTLISTENER
function removeEvent(element, funcion) {
  element.removeEventListener("click", funcion);
}

//DESPLEGAR MENU
let mainBolean = false;
const recogerMenu = () => {
  mainBolean = false;
  cover0.style.visibility = "hidden";
  cover0.style.opacity = "0";

  headerTwo.style.visibility = "visible";
  headerTwo.style.animation = "opacidad .5s forwards";
  menuOptions.style.animation = "opacidad 1s forwards reverse";

  setTimeout(() => {
    menuOptions.style.display = "none";
  }, 1000);
  removeEvent(cover0, recogerMenu);
};

const desplegarMenu = () => {
  mainBolean = true;
  //menuOptions.display = "flex";
  menuOptions.setAttribute("style", "display: flex;");
  menuOptions.innerHTML = "";
  headerTwo.style.animation = "opacidad .3s forwards reverse";
  setTimeout(() => {
    headerTwo.style.visibility = "hidden";
  }, 500);

  const clone = headerOne.cloneNode(true);
  clone.classList.replace("header-hijo1", "container-options");
  clone.style.animation = "hello2 1s forwards ease-out, opacidad .5s forwards";
  menuOptions.appendChild(clone);

  cover0.style.visibility = "visible";
  cover0.style.opacity = "1";
  cover0.addEventListener("click", recogerMenu);
};
menuBoton.addEventListener("click", desplegarMenu);

//ANIMACION FLOTANTE HEADER
var ubicacionScroll = window.pageYOffset;
window.onscroll = function () {
  var desplazamientoScroll = window.pageYOffset;
  if (ubicacionScroll >= desplazamientoScroll) {
    header.style.animation = "barra1 1s ease-out forwards";
  } else {
    header.style.animation = "barra2 1s ease-out forwards";
  }
  ubicacionScroll = desplazamientoScroll;
};

//ANIMACIONES CON SCROLL
window.addEventListener("scroll", function () {
  headerOne.classList.toggle("header-bajando", window.scrollY > 0);
  searchBar.classList.toggle("header-bajando", window.scrollY > 0);
  menuBoton.classList.toggle("header-bajando", window.scrollY > 0);
  if (mainBolean === true) {
    if (window.scrollY !== 0) {
      recogerMenu();
    }
  }
});

//SLIDER TOUCH
const gallery = document.querySelector(".gallery");
const slider = document.querySelector(".gallery .slider");
const img = slider.querySelectorAll(".slider img");
let section = document.querySelectorAll(".slider section");
let sectionLast = section[section.length - 1];
let leftMargin = -100 / section.length;

slider.insertAdjacentElement("afterbegin", sectionLast);
slider.style.transform = "translateX(" + leftMargin + "%)";

function next() {
  let sectionFirst = document.querySelectorAll(".slider section")[0];
  slider.style.transition = "all .5s";
  slider.style.transform = "translateX(" + leftMargin * 2 + "%)";
  setTimeout(() => {
    slider.style.transition = "none";
    slider.insertAdjacentElement("beforeend", sectionFirst);
    slider.style.transform = "translateX(" + leftMargin + "%)";
    gallery.addEventListener("mousedown", down);
    gallery.addEventListener("touchstart", down);
  }, 500);
}
function prev() {
  let section = document.querySelectorAll(".slider section");
  let sectionLast = section[section.length - 1];
  slider.style.transition = "all .5s";
  slider.style.transform = "translateX(0%)";
  setTimeout(() => {
    slider.style.transition = "none";
    slider.insertAdjacentElement("afterbegin", sectionLast);
    slider.style.transform = "translateX(" + leftMargin + "%)";
    gallery.addEventListener("mousedown", down);
    gallery.addEventListener("touchstart", down);
  }, 500);
}

var time;
const reloj = () => {
  time = setInterval(() => {
    next();
  }, 7000);
};

let isDown = false;
let startX;
let walk;
let num;

function down(e) {
  isDown = true;
  e.preventDefault();
  clearInterval(time);

  if (e.changedTouches) {
    startX = e.changedTouches[0].pageX / 20;
  } else if (e.pageX) {
    startX = e.pageX / 35;
  }

  img.forEach((element) => {
    element.classList.toggle("scale-img");
  });
}
function move(e) {
  if (!isDown) return;
  e.preventDefault();
  clearInterval(time);

  if (e.changedTouches) {
    const x = e.changedTouches[0].pageX / 20;
    walk = x - startX;
    num = leftMargin + walk;
  } else if (e.pageX) {
    const x = e.pageX / 35;
    walk = x - startX;
    num = (leftMargin + walk).toFixed(3);
  }

  slider.style.transition = "none";
  slider.style.transform = "translateX(" + num + "%)";
  //console.log(num.toFixed(1));
}

function up() {
  isDown = false;
  clearInterval(time);
  reloj();

  gallery.removeEventListener("mousedown", down);
  gallery.removeEventListener("touchstart", down);

  if (walk > 7) {
    prev();
  } else if (walk < -7.5) {
    next();
  } else {
    slider.style.transition = "all .5s";
    slider.style.transform = "translateX(" + leftMargin + "%)";
    setTimeout(() => {
      gallery.addEventListener("mousedown", down);
      gallery.addEventListener("touchstart", down);
    }, 500);
  }

  img.forEach((element) => {
    element.classList.toggle("scale-img");
  });
}

function leave() {
  isDown = false;
  clearInterval(time);
  reloj();
  setTimeout(() => {
    slider.style.transition = "all .5s";
    slider.style.transform = "translateX(" + leftMargin + "%)";
  }, 500);
}

gallery.addEventListener("mousedown", down);
gallery.addEventListener("mousemove", move);
gallery.addEventListener("mouseup", up);
gallery.addEventListener("mouseleave", leave);

gallery.addEventListener("touchstart", down);
gallery.addEventListener("touchmove", move);
gallery.addEventListener("touchend", up);
gallery.addEventListener("touchleave", leave);

window.onload = () => {
  //loader.style.opacity = "0";
  //loader.style.visibility = "hidden";
  setTimeout(() => {
    /*body.style.overflow = "";*/
    clearInterval(time);
    reloj();
  }, 1000);
};

//CARRITO
const cards = document.querySelector(".contenedor-productos");
const preview = document.querySelector(".preview");
const preview2 = document.querySelector(".preview2");
const cover1 = document.querySelectorAll(".cover")[1];
const icono = document.querySelector(".icono");
//TEMPLATES
const templateCard = document.getElementById("product-card").content;
const previewProduct = document.getElementById("preview-product").content;
const productCar = document.getElementById("product-car").content;

const fragment = document.createDocumentFragment();
let carrito = {};

//let resultadoList = {};

const color = {
  blanco: "#ffffff",
  amarillo: "#ffcf33",
  azul: "#4a95bd",
  rojo: "#db3a45",
  mostaza: "#ebab38",
  verde: "#329132",
  purpura: "#562878",
  pink: "#FFC0CB",
  verdeMilitar: "#a9bfb3",
  abano: "#fbebcd",
  gris: "#a5a5a5",
  negro: "#222222"
};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    pintarPreviewCarrito();
  }
});

cards.addEventListener("click", (e) => {
  addPreview(e);
});
preview2.addEventListener("click", (e) => {
  btnAccion(e);
});

const fetchData = async () => {
  try {
    const res = await fetch("json/product-api.json");
    const productosTotal = await res.json();
    var data = aleatorio(productosTotal);

    pintarCards(data);
    listSearch(productosTotal);
    sarchProduct(productosTotal);
    initMap();
  } catch (error) {
    console.log(error);
  }
};

const aleatorio = (productosTotal) => {
  var numRandom = [];
  var posicionesElegibles = [];
  var i, r;
  for (i = 0; i < productosTotal.length; i++) posicionesElegibles[i] = i;
  for (i = 0; i < 4; i++) {
    r = Math.floor(Math.random() * posicionesElegibles.length);
    numRandom.push(productosTotal[posicionesElegibles[r]]);
    posicionesElegibles.splice(r, 1);
  }
  return numRandom;
};

//BARRA DE BUSQUEDA ANIMACION
const recogerBarra = () => {
  cover0.style.visibility = "hidden";
  cover0.style.opacity = "0";
  searchBar.style.width = "";
  searchBar.style.borderRadius = "";
  searchBar.style.transition = "";
  headerTwo.style.flexDirection = "inherit";
  menuBoton.style.display = "";
  boxSearch.style.display = "none";
  inputSearch.value = "";
  removeEvent(cover0, recogerBarra);
};

const desplazarBarra = () => {
  headerTwo.style.flexDirection = "column";
  searchBar.style.width = "100%";
  menuBoton.style.display = "none";
  cover0.style.visibility = "visible";
  cover0.style.opacity = "1";
  inputSearch.focus();
  if (inputSearch.value === "") {
    boxSearch.style.display = "none";
  }
  cover0.addEventListener("click", recogerBarra);
};
inputSearch.addEventListener("click", desplazarBarra);

//GENERADOR DE LISTA DE "ALTS" PARA BUSQUEDA
const listSearch = (elementos) => {
  let listAlt = [];
  let listAltUnicos = [];
  elementos.forEach((element) => {
    if (element.hasOwnProperty("alt")) {
      Object.values(element["alt"]).forEach((element) => {
        listAlt.push(element);
      });
    }
  });
  listAlt.forEach((element) => {
    if (!listAltUnicos.includes(element)) {
      listAltUnicos.push(element);
    }
  });
  console.log(listAltUnicos);
  interactionBar(listAltUnicos);
};

//FILTRADO DE SUGERENCIAS BARRA DE BUSQUEDA
const interactionBar = (lista) => {
  inputSearch.addEventListener("keyup", () => {
    searchActive(boxSearch, inputSearch, searchBar, lista);
  });
  inputSearch1.addEventListener("keyup", () => {
    searchActive(boxSearch1, inputSearch1, searchBar1, lista);
  });
  boxSearch.addEventListener("click", (e) => {
    boxli(e, inputSearch, boxSearch, searchBar);
  });
  boxSearch1.addEventListener("click", (e) => {
    boxli(e, inputSearch1, boxSearch1, searchBar1);
  });
};

const sarchProduct = (productos) => {
  inputSearch.addEventListener("keyup", (e) => {
    let enter = e.keyCode;
    if (enter === 13) {
      searchEvent(productos, inputSearch);
    }
  });
  inputSearch1.addEventListener("keyup", (e) => {
    let enter = e.keyCode;
    if (enter === 13) {
      searchEvent(productos, inputSearch1);
    }
  });
  lupa.addEventListener("click", () => {
    searchEvent(productos, inputSearch);
  });
  lupa1.addEventListener("click", () => {
    searchEvent(productos, inputSearch1);
  });
};

function searchEvent(productos, input) {
  let resultadoList = {};
  let conteo = 0;
  productos.forEach((item) => {
    if (item.hasOwnProperty("alt")) {
      Object.values(item["alt"]).forEach((element) => {
        input.value.split(" ").forEach((palabra) => {
          if (palabra.length > 0) {
            if (palabra === element) {
              resultadoList[conteo] = {...item};
              conteo++;
            }
          }
        });
      });
    }
  });
  recogerBarra();
  let resultadoStart = Object.values(resultadoList);
  let resultadoFinish = [];
  resultadoStart.forEach((element) => {
    if (!resultadoFinish.includes(element)) {
      resultadoFinish.push(element);
    }
  });
  console.log(resultadoFinish);
  pintarCards(resultadoFinish);
}

function searchActive(box, input, barra, lista) {
  box.innerHTML = "";
  box.style.display = "flex";
  var textBar = input.value.toLowerCase();
  var liStart = [];
  var liFinish = [];
  lista.forEach((element) => {
    textBar.split(" ").forEach((palabras) => {
      if (element.toLowerCase().indexOf(palabras) > -1) {
        if (palabras.length > 0) {
          barra.style.transition = "0";
          barra.style.borderRadius = ".5rem .5rem 0 0";
          liStart.push(element);
        } else if (input.value === "") {
          barra.style.borderRadius = "";
          box.innerHTML = "";
        }
      }
    });
  });
  liStart.forEach((element) => {
    if (!liFinish.includes(element)) {
      liFinish.push(element);
    }
  });
  liFinish.forEach((element) => {
    templateLi.querySelector("button span").textContent = element;
    const clone = templateLi.cloneNode(true);
    box.appendChild(clone);
  });
  console.log(liFinish,liStart)
}

function boxli(e, input, box, barra) {
  if (e.target.tagName.toLowerCase() === "button") {
    let textInput = input.value.split(" ").slice(0, -1).join(" ");
    input.value =
      textInput +
      e.target.firstChild.textContent.padStart(
        e.target.firstChild.textContent.length + 1
      );
    box.innerHTML = "";
    barra.style.borderRadius = "";
    input.focus();
  } else if (e.target.tagName.toLowerCase() === "span") {
    let textInput = input.value.split(" ").slice(0, -1).join(" ");
    input.value =
      textInput +
      e.target.textContent.padStart(e.target.textContent.length + 1);
    box.innerHTML = "";
    barra.style.borderRadius = "";
    input.focus();
  }
}

//PINTAR PRODUCTOS
const pintarCards = (data) => {
  cards.innerHTML = "";
  data.forEach((producto) => {
    templateCard.querySelector("h4").textContent = producto.title.toUpperCase();
    templateCard.querySelector(
      "h6 span"
    ).textContent = producto.precio.toLocaleString("es");
    templateCard.querySelector(".btn-card").dataset.id = producto.id;
    templateCard.querySelector(".item").textContent = producto.item;
    templateCard.querySelector(".descripcion").textContent =
      producto.descripcion;
    templateCard
      .querySelectorAll(".producto-card .img")[0]
      .setAttribute("src", producto.thumbnailUrl1);
    templateCard
      .querySelectorAll(".producto-card .img")[1]
      .setAttribute("src", producto.thumbnailUrl2);
    templateCard.querySelector(".talla-product").textContent = "L";

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);

    //console.log(Object.values(producto.alt).join(' '))
  });
  cards.appendChild(fragment);

  cards.querySelector("img").addEventListener("load", () => {
    let loadNum = 0;
    document.querySelectorAll(".producto-card").forEach((element) => {
      element.style.display = "block";
      element.style.animation =
        "load-product .5s forwards ." + loadNum + "s ease-out";
      loadNum++;
    });
    console.log("imgs cargadas");
  });
};

const addPreview = (e) => {
  if (e.target.classList.contains("img")) {
    setPreviewProduct(e.target.parentElement.parentElement); 
  }
  if (e.target.classList.contains("btn-card")) {
    setPreviewProduct(e.target.parentElement.parentElement.parentElement);
  }
  // Detener la propagación si es necesario
  // e.stopPropagation();
};


const setPreviewProduct = (objeto) => {
  const product = {
    id: objeto.querySelector(".btn-card").dataset.id,
    item: objeto.querySelector(".item").textContent,
    title: objeto.querySelector("h4").textContent,
    precio: objeto.querySelector("h6 span").textContent,
    descripcion: objeto.querySelector(".descripcion").textContent,
    img1: objeto.querySelectorAll(".producto-card .img")[0].getAttribute("src"),
    img2: objeto.querySelectorAll(".producto-card .img")[1].getAttribute("src"),
    talla: objeto.querySelector(".talla-product").textContent
  };
  pintarPreviewProduct(product);
};

const pintarPreviewProduct = (product) => {
  preview.innerHTML = "";

  preview.style.visibility = "visible";
  preview.style.opacity = "1";
  cover1.style.visibility = "visible";
  cover1.style.opacity = "1";

  previewProduct.querySelectorAll("h2")[0].textContent = product.item;
  previewProduct.querySelectorAll("h2")[1].textContent = product.title;
  previewProduct.querySelector("h3 span").textContent = product.precio;
  previewProduct.querySelector(".comprar").dataset.id = product.id;
  previewProduct.querySelector(".añadir").dataset.id = product.id;
  previewProduct.querySelector(".talla").dataset.id = product.id;
  previewProduct.querySelector("p").textContent = product.descripcion;

  previewProduct
    .querySelectorAll(".img-slider")[0]
    .setAttribute(
      "src",
      "./img/mockup/camisa1.png"
    );
  previewProduct
    .querySelectorAll(".img-slider")[1]
    .setAttribute(
      "src",
      "./img/mockup/camisa2.png"
    );
  previewProduct
    .querySelectorAll(".img-slider")[2]
    .setAttribute("src", product.img1);
  previewProduct
    .querySelectorAll(".img-slider")[3]
    .setAttribute("src", product.img2);
    previewProduct
    .querySelectorAll(".img-slider")[4]
    .setAttribute("src", product.img2);
  previewProduct.querySelectorAll(".img-slider")[0].style.mixBlendMode =
    "multiply";
  previewProduct.querySelectorAll(".img-slider")[1].style.transform =
    "translateY(-100%)";

  const clone = previewProduct.cloneNode(true);
  fragment.appendChild(clone);
  preview.appendChild(fragment);

  colores();
  tallas();
  zoom();
  sliderProduct();
  interaction();
};

const interaction = () => {
  preview.querySelector(".botones").addEventListener("click", (e) => {
    if (e.target.classList.contains("añadir")) {
      setCarrito();
      adverAddProduct();
    }
    e.stopPropagation();
  });
};

const setCarrito = () => {
  let colorProduct = preview
    .querySelector(".color-active")
    .parentElement.getAttribute("style")
    .substr(7, 7);
  let colorKey;
  Object.entries(color).forEach(([key, value]) => {
    if (value === colorProduct) {
      colorKey = key;
    }
  });

  const producto = {
    cantidad: 1,
    item: preview.querySelectorAll("h2")[0].textContent,
    title: preview.querySelectorAll("h2")[1].textContent,
    talla: preview.querySelector(".talla-active").textContent,
    precio: preview.querySelector("h3 span").textContent,
    colorKey: colorKey,
    colorValue: preview
      .querySelector(".color-active")
      .parentElement.getAttribute("style")
      .substr(7, 7),
    id: (preview.querySelector(".comprar").dataset =
      preview.querySelectorAll("h2")[1].textContent +
      "-" +
      colorKey +
      "-" +
      preview.querySelector(".talla-active").textContent)
  };

  const nameProduct =
    producto.title + "-" + producto.colorKey + "-" + producto.talla;

  if (carrito.hasOwnProperty(nameProduct)) {
    producto.cantidad = carrito[nameProduct].cantidad + 1;
  }
  carrito[nameProduct] = {...producto};
  console.log(carrito);
};

function ocultarPreviews() {
  preview.style.visibility = "hidden";
  preview.style.opacity = "0";
  preview2.style.visibility = "hidden";
  preview2.style.opacity = "0";
  cover1.style.visibility = "hidden";
  cover1.style.opacity = "0";
  boleanIcon = false;
}
cover1.addEventListener("click", ocultarPreviews);

let boleanIcon = false;
icono.addEventListener("click", () => {
  if (boleanIcon === false) {
    boleanIcon = true;
    preview2.style.visibility = "visible";
    preview2.style.opacity = "1";
    cover1.style.visibility = "visible";
    cover1.style.opacity = "1";
    recogerBarra();
    recogerMenu();
    pintarPreviewCarrito();
  } else {
    ocultarPreviews();
  }
});

const pintarPreviewCarrito = () => {
  preview2.querySelector(".productos-carrito").innerHTML = "";
  Object.values(carrito).forEach((producto) => {
    productCar.querySelector(".btn-restar").dataset.id = producto.id;
    productCar.querySelector(".btn-sumar").dataset.id = producto.id;
    productCar.querySelector("h5 span").textContent = producto.item;
    productCar.querySelectorAll("h5")[1].textContent = producto.title;
    productCar.querySelectorAll("h5")[3].textContent = producto.talla;
    productCar.querySelectorAll("h5")[4].textContent = producto.cantidad;
    productCar.querySelector("h4 span").textContent =
      "$" + (1000 * producto.cantidad * producto.precio).toLocaleString("es");
    productCar
      .querySelector("i")
      .setAttribute("style", "color:" + producto.colorValue);

    const clone = productCar.cloneNode(true);
    fragment.appendChild(clone);
  });
  preview2.querySelector(".productos-carrito").appendChild(fragment);
  pintarFooter();
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const pintarFooter = () => {
  let comprasFooter = preview2.querySelector(".compras-footer");
  comprasFooter.querySelector("h4 span").textContent = "";
  comprasFooter.parentElement.querySelector("h2").textContent = "";

  if (Object.keys(carrito).length === 0) {
    preview2.querySelector(".productos-carrito").innerHTML =
      "<h5 class='no-hay'>¡Aún no has comprado nada! :c</h5>";
    preview2.querySelector(".compras h2").textContent = "0";
    comprasFooter.querySelector("h4 span").textContent = "0";
    return;
  }

  const nCantidad = Object.values(carrito).reduce(
    (acc, {cantidad}) => acc + cantidad,
    0
  );
  const nPrecio = Object.values(carrito).reduce(
    (acc, {cantidad, precio}) => acc + cantidad * precio,
    0
  );

  comprasFooter.parentElement.querySelector("h2").textContent = nCantidad;
  comprasFooter.querySelector("h4 span").textContent =
    "$" + (1000 * nPrecio).toLocaleString("es");

  let btnVaciar = preview2.querySelector(".compras-btns-footer");
  btnVaciar.querySelectorAll("button")[0].addEventListener("click", () => {
    carrito = {};
    pintarPreviewCarrito();
    preview2.querySelector(".compras h2").textContent = "0";
  });
};

const btnAccion = (e) => {
  if (e.target.classList.contains("btn-sumar")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad++;
    carrito[e.target.dataset.id] = {...producto};
    pintarPreviewCarrito();
  }

  if (e.target.classList.contains("btn-restar")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad--;
    if (producto.cantidad === 0) {
      delete carrito[e.target.dataset.id];
    }
    pintarPreviewCarrito();
  }
  e.stopPropagation();
};

// COLORS
const colores = () => {
  const colores = preview.querySelector(".colores");

  Object.values(color).forEach((element) => {
    var btnColor = document.createElement("div");
    btnColor.innerHTML = "<i class='fas fa-tshirt'></i>";
    btnColor.classList.add("color");
    btnColor.setAttribute("style", "color: " + element + ";");
    const clone = btnColor.cloneNode(true);
    fragment.appendChild(clone);
  });

  colores.appendChild(fragment);
  preview.querySelectorAll(".color i")[0].classList.add("color-active");
};

preview.addEventListener("click", (e) => {
  addColor(e);
});

const addColor = (e) => {
  if (e.target.classList.contains("fas")) {
    let colorToggle = e.target.parentElement.getAttribute("style");
    let sections = preview.querySelectorAll("section");
    sections.forEach((element) => {
      element.setAttribute(
        "style",
        "transition: all .5s; background-" + colorToggle
      );
    });
    preview.querySelector(".color-active").classList.remove("color-active");
    e.target.classList.add("color-active");
  }
  e.stopPropagation();
};

//TALLAS
const tallas = () => {
  preview.querySelectorAll(".talla")[0].classList.add("talla-active");

  preview.querySelector(".tallas").addEventListener("click", (e) => {
    if (e.target.classList.contains("talla")) {
      preview.querySelector(".talla-active").classList.remove("talla-active");
      e.target.classList.add("talla-active");
    }
    e.preventDefault();
  });
};

//ZOOM
const zoom = () => {
  const contenedor1 = document.querySelector(".contenedor1");
  const contenedor = contenedor1.clientWidth;
  var onOff = false;
  var pX1;
  var pY1;
  var pX2;
  var pY2;

  const primeraPosicion = (e, img) => {
    img.style.transition = "all 0s";
    pX1 = e.pageX;
    pY1 = e.pageY;
    onOff = true;

    img.addEventListener("mousemove", (e) => {
      var scale;
      pX2 = e.pageX;
      pY2 = e.pageY;
      if (onOff === false) {
        pY2 = 0;
        pX2 = 0;
        pX1 = 0;
        pX2 = 0;
        var finalRX = 0;
        var finalRY = 0;
        scale = 1;
      } else {
        var recorX = pX1 - pX2;
        var porcentajeX = recorX / contenedor;
        var sumasX = porcentajeX * 100;
        var resultX = sumasX / 2;
        var finalRX = resultX.toFixed(1);

        if (pX2 / pX2 < 0) {
          finalRX = resultX * -1;
        }

        var recorY = pY1 - pY2;
        var porcentajeY = recorY / contenedor;
        var sumasY = porcentajeY * 100;
        var resultY = sumasY / 2;
        var finalRY = resultY.toFixed(1);

        if (pY2 / pY2 < 0) {
          finalRY = resultY * -1;
        }

        scale = 2;
      }
      img.style.transform =
        "translate(" + finalRX + "%," + finalRY + "%) scale(" + scale + ")";
    });
  };
  const iniciar = (e) => {
    if (e.target.classList.contains("img-slider")) {
      if (onOff === false) {
        primeraPosicion(e, e.target.parentElement);
        e.target.parentElement.style.cursor = "zoom-out";
      } else {
        onOff = false;
        e.target.parentElement.style.transition = "all .5s";
        e.target.parentElement.style.cursor = "";
      }
    }
  };
  contenedor1.addEventListener("click", iniciar);
};

//SLIDER
const sliderProduct = () => {
  const sliderp = document.querySelector(".slider-preview");
  const sliderSectionP = document.querySelectorAll(".slider-preview section");

  let sectionLastP = sliderSectionP[sliderSectionP.length - 1];

  const btnLeftP = document.querySelector(".slider-btn-left");
  const btnRightP = document.querySelector(".slider-btn-right");

  sliderp.insertAdjacentElement("afterbegin", sectionLastP);
  let marginLengthP = -100 / sliderSectionP.length;
  let leftMarginP = marginLengthP.toFixed(2);
  sliderp.style.transform = "translateX(" + leftMarginP + "%)";
  sliderp.style.width = 100 * sliderSectionP.length + "%";

  function nextP() {
    let sectionFirst = document.querySelectorAll(".slider-preview section")[0];
    sliderp.style.transition = "all .5s";
    sliderp.style.transform = "translateX(" + leftMarginP * 2 + "%)";
    setTimeout(() => {
      sliderp.style.transition = "none";
      sliderp.insertAdjacentElement("beforeend", sectionFirst);
      sliderp.style.transform = "translateX(" + leftMarginP + "%)";
    }, 500);
  }

  function prevP() {
    let sliderSectionP = document.querySelectorAll(".slider-preview section");
    let sectionLastP = sliderSectionP[sliderSectionP.length - 1];
    sliderp.style.transition = "all .5s";
    sliderp.style.transform = "translateX(0%)";
    setTimeout(() => {
      sliderp.style.transition = "none";
      sliderp.insertAdjacentElement("afterbegin", sectionLastP);
      sliderp.style.transform = "translateX(" + leftMarginP + "%)";
    }, 500);
  }

  btnRightP.addEventListener("click", () => {
    nextP();
  });
  btnLeftP.addEventListener("click", () => {
    prevP();
  });
};

const adverAddProduct = () => {
  let alertAddtProduct = document.querySelector(".adver-add-product");
  alertAddtProduct.style.display = "block";
  alertAddtProduct.style.animation =
    "hello 1s ease-out forwards, opacidad 1.5s 2 ease-out alternate";
  setTimeout(() => {
    alertAddtProduct.style.display = "";
  }, 3000);
};
//MODO CLARO
const sunAndMoon = document.querySelectorAll(".icono")[1];
let iconBolean = false;
sunAndMoon.addEventListener("click", () => {
  document.body.classList.toggle("light");
  if (iconBolean === false) {
    iconBolean = true;
    sunAndMoon.querySelector("i").setAttribute("class", "fas fa-sun");
  } else {
    iconBolean = false;
    sunAndMoon.querySelector("i").setAttribute("class", "fas fa-moon");
  }
});

const mediaQ = matchMedia("(min-width: 768px)");
const changeSize = (mql) => {
  if (mql.matches === true) {
    recogerBarra();
    recogerMenu();
    ocultarPreviews();
  }
};
mediaQ.addListener(changeSize);
changeSize(mediaQ);

function initMap() {
  new google.maps.Map(document.getElementById("map"), {
    mapId: "6f1060ef161e8b89",
    center: { lat: 3.58237, lng: -76.4973273 },
    zoom: 16,
  });
}

const sectionQuien = document.querySelectorAll(".quienes");
const cargarSection = (start) => {
  start.forEach(element => {
    if (element.isIntersecting) {
      element.target.classList.add("bounceInLeft");
    }
  });
}

const observador = new IntersectionObserver(cargarSection, {
  root: null,
  rootMargin: "0px",
  threshold: 0.2
})

sectionQuien.forEach(element => {
  observador.observe(element);
});


