let selected_Weight = null;
let clickedDiv = null;

function changeColorsWeight(element) {
  // Apply hover effect only if the div is not clicked
  if (element !== clickedDiv) {
    // Change colors on hover
    clickedDiv.style.backgroundColor = "whitesmoke";
    element.style.backgroundColor = "#fcc6e2";
    element.style.border = "1px solid black";
  }
}

function changeColorsClickWeight(element) {
  // Reset styles for the previously clicked div
  if (clickedDiv) {
    clickedDiv.style.backgroundColor = "whitesmoke";
    clickedDiv.style.border = "1px solid black";
  }

  // Set styles for the clicked div
  element.style.backgroundColor = "#fcc6e2";
  element.style.color = "black";

  // Update the clickedDiv variable
  clickedDiv = element;

  //select div by skin type
  selected_Weight = element.innerText;
}
function restoreOriginalColorsWeight(element) {
  // Restore original colors only if the div is not clicked
  if (element !== clickedDiv) {
    element.style.backgroundColor = "whitesmoke";
    element.style.border = "1px solid black";
    clickedDiv.style.backgroundColor = "#fcc6e2";
  }
}

var originalPrice;
var newPrice;
var quantity = 1;

function weightSelector(div, productDetails) {
  selected_Weight = div.innerText;
  console.log("selected wheight : " + selected_Weight);

  const indexOfSize = productDetails.findIndex(
    (item) => item.size === selected_Weight
  );

  if (indexOfSize !== -1) {
    var priceDiv;
    // Iterate over all price divs and show/hide based on the selected weight
    for (let i = 0; i < productDetails.length; i++) {
      priceDiv = document.getElementById(`price${i + 1}`);
      if (i === indexOfSize) {
        // Show the price div for the selected weight
        priceDiv.style.display = "block";
      } else {
        // Hide other price divs
        priceDiv.style.display = "none";
      }
    }
    newPrice = document.getElementById(`price${indexOfSize + 1}`);
    originalPrice = productDetails[indexOfSize].price;
    updateQty();
    updateTotalPrice();
    update_product();
    updateHref();
  } else {
    console.log(`${selected_Weight} not found in productDetails`);
  }
}
// JavaScript fro set price according to size
var Qty = document.querySelector(".qty_number");

function increaseQuantity() {
  if (quantity < 10) {
    quantity++;
    updateQtyAndPrice();
    document.querySelector(".buy_button");
  }
}

function decreaseQuantity() {
  if (quantity > 1) {
    quantity--;
    updateQtyAndPrice();
  }
}

function updateQtyAndPrice() {
  updateQty();
  updateTotalPrice();
  update_product();
  updateHref();
}

function updateQty() {
  Qty.textContent = quantity;
}

function updateTotalPrice() {
  totalPrice = originalPrice * quantity;
  newPrice.innerText = totalPrice;
}

var buyButton = document.querySelector(".buy_button");
var Href = buyButton.getAttribute("href");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product_Name = urlParams.get("productName");
const product_Price = urlParams.get("price");
var product_imgUrl = urlParams.get("img");
product_imgUrl = product_imgUrl.replace("other pages/", "");
const product_rating = urlParams.get("rating");
var products = [];
var product = {
  img: product_imgUrl.replace("other pages/", ""),
  name: urlParams.get("productName"),
  price: urlParams.get("price"),
  quantity: quantity,
  rating: urlParams.get("rating"),
  weight: selected_Weight,
};
products.push(product);
function update_product() {
  product.weight = selected_Weight;
  product.quantity = quantity;
  product.price = newPrice.innerText;
}

Href += `?product=${encodeURIComponent(JSON.stringify(products))}`;

buyButton.setAttribute("href", Href);
function updateHref() {
  Href = Href.replace(
    /(product=)[^&]*/,
    `$1${encodeURIComponent(JSON.stringify(products))}`
  );
  buyButton.setAttribute("href", Href);
}
