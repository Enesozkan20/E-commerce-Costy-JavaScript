// Sepete ekleme yapacak fonksiyon

import {
  calculateCartTotal,
  getFromLocalStorage,
  saveToLocalStorage,
  updateCartIcon,
} from "./utils.js";

// Cart Verisi
let cart = getFromLocalStorage();
// Sepete ürün ekleyen fonksiyon
export const addToCart = (event, products) => {
  // Tiklanan ürünün idsine erisme
  const productId = parseInt(event.target.dataset.id);
  // Bu id'ye sahip baska bir eleman var mi ?
  const product = products.find((product) => product.id == productId);
  if (product) {
    //Eger ürün varsa bunu bul
    const exitingItem = cart.find((item) => item.id === productId);
    // Ürün sepette varsa bunu ekleme miktarini bir arttir.
    if (exitingItem) {
      exitingItem.quantity++;
    } else {
      //Sepete eklenecek objeyi olustur
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      // Olusturulan cartItem i sepete ekle
      cart.push(cartItem);
      // Ekleme yapilan kartin icergini güncelleme
      event.target.textContent = "Added";
      // localStorage i güncelle
      saveToLocalStorage(cart);
      // Sepet iconunu güncelle
      updateCartIcon(cart);
    }
  }
};
// Sepetten Eleman Silen fonksiyon

const removeFromCart = (event) => {
  const productId = parseInt(event.target.dataset.id);
  //Tiklanan elemani sepetten kaldir
  cart = cart.filter((item) => item.id !== productId);
  // Localestorage i güncelle
  saveToLocalStorage(cart);

  // Sayfayi güncelle
  renderCartItems();

  // toplam miktari güncelle
  displayCartTotal();
  // Sepet iconunu güncelle
  updateCartIcon(cart);
};

// Ekran cart elemanlarini render eden fonksiyon
export const renderCartItems = () => {
  // Htmlde cart itemlarin render ediledecegi alana eris

  const cartItemsElement = document.querySelector("#cartItems");

  // Bu elemanlarin icerigini güncelle

  cartItemsElement.innerHTML = cart
    .map(
      (item) =>
        `
    <div class="cart-item">
       <img src="${item.image}" alt="">
                        <div class="cart-item-info">
                            <h2 class="cart-item-title">${item.title}</h2>
                            <input type="number" min="1"
                            value=${item.quantity}
                            class="cart-item-quantity"       
                            data-id='${item.id}'>
                        </div>
                        <h2 class="cart-item-price">$${item.price}</h2>
                        <button class="remove-from-cart" data-id='${item.id}'>Remove</button>
                </div>                                                                            
    `
    )
    .join("");

  // remove-from-cart butonlarina eris
  const removeButtons = document.querySelectorAll(".remove-from-cart");
  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCart);
  }

  // quantity inputlarina eris
  const quantityInputs = document.querySelectorAll(".cart-item-quantity");

  for (let i = 0; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", onQuantityChange);
  }
};
// Inputlarda degisim olmasi durumunda calisacak fonksiyon
const onQuantityChange = (event) => {
  const newQuantity = +event.target.value;
  const productID = +event.target.dataset.id;

  // yeni miktar 0'dan büyükse
  if (newQuantity > 0) {
    // id'si bilinen elemani bul
    const cartItem = cart.find((item) => item.id == productID);

    // Eger ürün sepette yoksa
    if (!cartItem) return;

    // bulunan ürünün miktarini güncelle
    cartItem.quantity = newQuantity;

    // Localestorage i güncelle
    saveToLocalStorage(cart);

    //toplam fiyati güncelle
    displayCartTotal();

    // sepet iconunu güncelle
    updateCartIcon(cart);
  }
};

//Sepetteki total ürün fiyatini render eden fonksiyon
export const displayCartTotal = () => {
  const cartTotalElement = document.querySelector("#cartTotal");
  // Sepetteki toplam ürün fiyatini hesapla
  const total = calculateCartTotal(cart);
  // Toplam fiyat kismini güncelle
  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
};
