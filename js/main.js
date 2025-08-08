import { addToCart, displayCartTotal, renderCartItems } from "./cart.js";
import { fetchProducts, renderProducts } from "./product.js";
import { getFromLocalStorage, updateCartIcon } from "./utils.js";

const menuIcon = document.querySelector("#menu-icon");
const menu = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  menu.classList.toggle("open-menu");
});

//Ürünleri ana sayfadeyken API dan almaliyiz bunun icin window.location ile tarayici path'ini izleyip karar veririz
document.addEventListener("DOMContentLoaded", async () => {
  //Sepet verisine eris
  let cart = getFromLocalStorage();

  // Tarayicida hangi sayfadayiz bunu kontrol et.
  if (window.location.pathname.includes("cart.html")) {
    //Cart Sayfasi
    console.log("Cart Sayfasi");

    renderCartItems();
    displayCartTotal();
  } else {
    //Ana Sayfa
    console.log("Ana Sayfa");

    const product = await fetchProducts();
    //Apidan gelen veriye bagli olarak cart render ettik
    renderProducts(product, (event) => {
      addToCart(event, product);
    });
  }

  // Sepet Iconunu güncelle
  updateCartIcon(cart);
});
