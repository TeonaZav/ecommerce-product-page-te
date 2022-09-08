"use strict";
const modal = document.querySelector("#modal-window");
const overlay = document.querySelector(".overlay");
const gallery = document.querySelector(".gallery");
let gallerySlides = document.querySelector(".gallery-slides");
let galleryImgs = document.querySelectorAll(".slide");
const items = document.querySelectorAll(".img-thumb");
const slides = document.querySelector(".carousel-slides");
const slideArr = document.querySelectorAll(".carousel-slide");
const slidesMob = document.querySelector(".carousel-slides--moblie");
const slideArrMob = document.querySelectorAll(".carousel-slide--mobile");
const tumbsArr = document.querySelectorAll(".thumb");
const imgTumbsArr = document.querySelectorAll(".img-thumb");
const btnCheckout = document.querySelector(".btn--checkout");
const btnAdd = document.querySelector(".btn--add");
let plus = false;
let minus = false;
let selectQuantity = 1;
let productPrice = 125;
let cart = [];

//===================== MAIN MODAL =====================//
document
  .querySelector(".btn--close-modal")
  .addEventListener("click", closeModal);
galleryImgs.forEach((img) => {
  img.addEventListener("click", openModal);
});

function openModal() {
  modal.classList.add("showModal");
  modal.classList.remove("hideModal");
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.remove("showModal");
  modal.classList.add("hideModal");
  modal.classList.add("hidden");
}

//===================== SLIDER =====================//
let currentSlide = 0;
const numberOfSlides = slides.childElementCount;
const maxLeft = (numberOfSlides - 1) * 100 * -1;
let cur = 0;
function changeSlide(next = true) {
  if (next) {
    currentSlide += currentSlide > maxLeft ? -100 : currentSlide * -1;
    slides.style.transition = "all 0.5s ease-in-out";
    cur = (currentSlide / 100) * -1;
    tumbsArr.forEach((tumb) => {
      tumb.classList.remove("transluz");
    });
    tumbsArr[cur].classList.add("transluz");
  } else {
    currentSlide = currentSlide < 0 ? currentSlide + 100 : maxLeft;
    cur = (currentSlide / 100) * -1;
  }
  slides.style.left = `${currentSlide}%`;
  slidesMob.style.left = `${currentSlide}%`;
  tumbsArr.forEach((tumb) => {
    tumb.classList.remove("transluz");
  });
  tumbsArr[cur].classList.add("transluz");
}

document.querySelector(".next-slide").addEventListener("click", function () {
  changeSlide();
});
document.querySelector(".prev-slide").addEventListener("click", function () {
  changeSlide(false);
});

let current = 0;
function getIndex(el) {
  let index = el.id.charAt(0);
  tumbsArr.forEach((tumb) => {
    tumb.classList.remove("transluz");
  });
  tumbsArr[index].classList.add("transluz");
  currentSlide = index * 100 * -1;
  slides.style.left = `${currentSlide}%`;
}
function getIndex1(el) {
  let index = el.id.charAt(0);
  imgTumbsArr.forEach((tumb) => {
    tumb.classList.remove("transluz");
  });
  imgTumbsArr[index].classList.add("transluz");
  current = index * 100 * -1;
  gallerySlides.style.left = `${current}%`;

  galleryImgs.forEach((img) => {
    img.style.display = "none";
  });

  document.querySelector(`.slide--${index}`).style.display = "block";
}

//===================== SLIDER  mobile=====================//
function changeSlideMobile(next = true) {
  if (next) {
    currentSlide += currentSlide > maxLeft ? -100 : currentSlide * -1;
    slides.style.transition = "all 0.5s ease-in-out";
  } else {
    currentSlide = currentSlide < 0 ? currentSlide + 100 : maxLeft;
  }
  slidesMob.style.left = `${currentSlide}%`;
}
document
  .querySelector(".next-slide--mobile")
  .addEventListener("click", function () {
    changeSlideMobile();
  });
document
  .querySelector(".prev-slide--mobile")
  .addEventListener("click", function () {
    changeSlideMobile(false);
  });
// =================== Shopping Cart ==================//
//show/hide cart
document.querySelector(".cart-icon-wrap").addEventListener("click", (e) => {
  document.querySelector(".cart-box").classList.toggle("hidden");
  if (document.querySelector(".cart-box").classList.contains("hidden")) {
    btnCheckout.style.transition = "none";
  }
});

// =================== Cart  / LOCALSTORAGE ==================//
// Save cart
function saveCart() {
  window.localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

// Load cart
function loadCart() {
  cart = JSON.parse(window.localStorage.getItem("shoppingCart"));
}
if (window.localStorage.getItem("shoppingCart") != null) {
  loadCart();
}
// =============ADD/REMOVE ITEMS FROM SHOPPING CART =============//
let uniqueID;
function Item(id, name, price, count) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.count = count;
}
let cartItemHtml = function (itemId, price, quantity) {
  let html = `<div id="${itemId}" class="cart-product-wrap">
  <div class="cart-img-box">
    <img
      class="cart-product-image"
      src="images/image-product-1-thumbnail.jpg"
    />
  </div>
  <p class="cart-product-description">
    Fall Limited Edition Sneakers
    <span class="cart-product-price">$${price}&nbsp;</span>&nbsp;x&nbsp;
    <span class="cart-product-quantity">${quantity}</span>&nbsp;
    <span class="product-total-amount">&nbsp;$${quantity * price}</span>
  </p>
  
  <div class="btn-delete" onClick="deleteItem(this)">
    <img src="images/icon-delete.svg" />
  </div>
  </div>`;
  return html;
};
document.querySelector(".btn-increase").addEventListener("click", selectMore);
document.querySelector(".btn-decrease").addEventListener("click", selectLess);
btnAdd.addEventListener("click", (e) => {
  //check if same product is already selected
  if (cart.length != 0) {
    cart.filter((element) => {
      element.name == "Fall Limited Edition Sneakers";
      if (element.name == "Fall Limited Edition Sneakers") {
        uniqueID = element.id;
        let newQuantity = element.count + selectQuantity;
        let newAmount = newQuantity * element.price;
        document.getElementById(
          `${element.id}`
        ).firstElementChild.nextElementSibling.lastElementChild.textContent = `$${newAmount}`;
        document.getElementById(
          `${element.id}`
        ).firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.textContent =
          newQuantity;
        document.querySelector(".cart-product-number").textContent =
          newQuantity;
        element.count = newQuantity;
        saveCart();
      }
    });
  } else {
    uniqueID = new Date().valueOf();
    let item = new Item(
      uniqueID,
      "Fall Limited Edition Sneakers",
      productPrice,
      selectQuantity
    );
    cart.push(item);
    saveCart();
    let html = cartItemHtml(uniqueID, productPrice, selectQuantity);
    document.querySelector(".cart-empty").style.display = "none";
    document.querySelector(".cart-full").style.display = "block";
    document.querySelector(".cart-full").insertAdjacentHTML("afterbegin", html);
    document.querySelector(".cart-product-number").style.display = "block";
    document.querySelector(".cart-product-number").textContent = selectQuantity;
  }
});

function renderCart() {
  loadCart();
  cart.forEach((el) => {
    let html = cartItemHtml(el.id, el.price, el.count);
    document.querySelector(".cart-empty").style.display = "none";
    document.querySelector(".cart-full").style.display = "block";
    document.querySelector(".cart-full").insertAdjacentHTML("afterbegin", html);
    document.querySelector(".cart-product-number").style.display = "block";
    document.querySelector(".cart-product-number").textContent = el.count;
  });
}
if (cart.length != 0) renderCart();
// Remove item from cart
function deleteItem(el) {
  el.parentElement.remove();
  cart.filter((element) => {
    element.id === Number(el.parentElement.id);
    if (element.id == Number(el.parentElement.id)) {
      cart.splice(cart.indexOf(element), 1);
      document.querySelector(".cart-full").style.display = "none";
      document.querySelector(".cart-empty").style.display = "block";
      document.querySelector(".cart-product-number").style.display = "none";
      document.querySelector(".cart-product-number").textContent = el.count;
      saveCart();
    }
  });
}
// select product quantity
function selectMore() {
  plus = true;
  minus = false;
  let quantity = document.querySelector(".product-quantity");
  selectQuantity++;
  quantity.innerText = `${selectQuantity}`;
  return selectQuantity;
}
function selectLess() {
  plus = false;
  minus = true;
  let quantity = document.querySelector(".product-quantity");
  selectQuantity != 1 ? selectQuantity-- : (selectQuantity = selectQuantity);
  quantity.innerText = `${selectQuantity}`;
  return selectQuantity;
}

//============ MOBILE NAVIGATION ========= //

const mobileToggle = document.querySelector(".menu-toggle");
const mobileNavigation = document.querySelector(".mobile-nav");
let menu = "close";
mobileToggle.addEventListener("click", (e) => {
  if (menu === "close") {
    mobileNavigation.style.visibility = "visible";
    mobileNavigation.style.opacity = "1";
    mobileNavigation.style.transform = "translate(0, 0)";
    document.querySelectorAll(".line")[0].style.transform =
      "rotate(45deg) translate(0px, -3.2px)";
    document.querySelectorAll(".line")[1].style.transform =
      "rotate(-45deg) translate(0px, 3.2px)";
    document.querySelectorAll(".line")[2].style.opacity = "0";
    menu = "open";
    document.querySelector(".overlay").classList.remove("hidden");
  } else if (menu === "open") {
    mobileNavigation.style.visibility = "hidden";
    mobileNavigation.style.opacity = "0";
    mobileNavigation.style.transform = "translate(-100%, 0)";
    document.querySelectorAll(".line")[0].style.transform =
      "rotate(0deg) translate(0, 0)";
    document.querySelectorAll(".line")[1].style.transform =
      "rotate(0deg) translate(0, 0)";
    document.querySelectorAll(".line")[2].style.opacity = "1";
    menu = "close";
    document.querySelector(".overlay").classList.add("hidden");
  }
});
