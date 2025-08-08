// Localestorage ekleme  yapacak fonksiyon

export const saveToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Localstorage'dan veriyi alacak fonksiyon
export const getFromLocalStorage = () => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

// Sepet toplamini bulan fonksiyon

export const calculateCartTotal = (cart) => {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // sum biriken miktar item ise aktif eleman
};

// ! reduce metotu bir dizideki tüm elemanlarin üzerinden bir islem gerceklestirerek bir deger döndürür. Ilk parametre olarak bir callback function ister. Ikinci deger olaraksa bir baslangic degeri ister.

// Sepet iconunu güncelleyen fonksiyon
export const updateCartIcon = (cart) => {
  // Sepet iconuna ve quantity degerine eris
  const cartIcon = document.querySelector("#cart-icon");
  const i = document.querySelector(".bxs-shopping-bag");

  //Sepetteki toplam ürün sayisina eris

  let totalQuantity = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  // Sepet iconunun yanindaki quantity degerini güncelle
  i.setAttribute("data-quantity", totalQuantity);
};
