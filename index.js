let products = [];

fetch("products.json")
  .then((response) => response.json())
  .then((data) => showProducts(data));

const cart = {};

const addToCart = (id) => {
  if (!cart[id]) {
    cart[id] = 1;
  } else {
    cart[id] += 1;
  }
  showCart();
};

const increment = (id) => {
  cart[id]++;
  showCart();
};

const decrement = (id) => {
  cart[id]--;
  if (cart[id] <= 0) {
    delete cart[id];
  }
  showCart();
};

const deleteCart = (id) => {
  delete cart[id];
  showCart();
};

const displayCart = () => {
  cartBox.style.display = "block";
  productBox.style.display = "none";
};

const hideCart = () => {
  cartBox.style.display = "none";
  productBox.style.display = "block";
};

const showTotal = () => {
  let total = products.reduce((sum, value) => {
    return sum + value.price * (cart[value.id] ?? 0);
  }, 0);
  order.innerHTML = `$${total.toFixed(2)}`;
};

const showCart = () => {
  items.innerHTML = Object.keys(cart).length;
  showTotal();

  let str = "";
  products.forEach((value) => {
    if (cart[value.id]) {
      str += `
        <div class="cart-item">
          <strong>${value.name}</strong> - $${value.price} x ${cart[value.id]}
          = <strong>$${(value.price * cart[value.id]).toFixed(2)}</strong><br>
          <button onclick="decrement(${value.id})">-</button>
          <button onclick="increment(${value.id})">+</button>
          <button class="delete-btn" onclick="deleteCart(${value.id})">Delete</button>
        </div>
      `;
    }
  });

  divCart.innerHTML = str || "<p>Your cart is empty.</p>";
};

const showProducts = (data) => {
  products = data;

  let str = 
  "<div class='row'>";
  products.forEach((value) => {
    str += `
      <div class='box'>
        <img src='${value.url}' alt='${value.name}' style='width:100%; border-radius: 10px;'>
        <h3>${value.name}</h3>
        <p>${value.desc}</p>
        <h4>$${value.price}</h4>
        <button onclick='addToCart(${value.id})'>Add to Cart</button>
      </div>
    `;
  });
  divProducts.innerHTML = str + "</div>";

};
