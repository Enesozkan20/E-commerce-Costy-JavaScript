export const fetchProducts = async () => {
  try {
    const response = await fetch("db.json");
    // Eger hata yoksa veriyi dönüstür
    if (!response.ok) {
      throw new Error("Yanlis URL");
    }

    return await response.json();
  } catch (error) {
    console.log(`Hata: ${error}`);
    return [];
  }
};

//ürünleri render etme fonksiyonu
export const renderProducts = (products, addToCartCallBack) => {
  // Ürünleri render ediledecegi kapsami HTML den cekme
  const productList = document.querySelector("#product-list");
  // Htmll icerigini olustur
  productList.innerHTML = products
    .map(
      (product) =>
        `
       <div class="product">
                <img src="${product.image}" alt="product-img" class="product-img">
                <div class="product-info">
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-price">$${product.price}</p>
                    <a class="add-to-cart" data-id="${product.id}">Add to cart</a>
                </div>      
            </div> 
     `
    )
    .join("");
  // Products bir dizi. Dizi elemanlari ',' ile ayrilir. Biz bu elemanlari bosluk ile ayirmasini sagladik.

  // Add to cart butunlarini sec
  const addToCartButtons = document.getElementsByClassName("add-to-cart");

  for (let i = 0; i < addToCartButtons.length; i++) {
    // Button Collectioni icerisinden her bir butona tek tek ulasiyoruz
    const addToCartButton = addToCartButtons[i];
    // Her bir butona click eventi ekliyoruz.Bu eventi disardan ekliyoruz
    addToCartButton.addEventListener("click", addToCartCallBack);
  }
};
