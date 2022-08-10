// const { fetchItem } = require("./helpers/fetchItem");
// const saveCartItems = require("./helpers/saveCartItems");
// const getSavedCartItems = require("./helpers/getSavedCartItems");
const cartItemsList = document.getElementsByClassName('cart__items')[0];
const totalElement = document.getElementsByClassName('total-price')[0];
const resetButton = document.getElementsByClassName('empty-cart')[0];
const itemsContainer = document.getElementsByClassName('items')[0];

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

function saveTotal(total) {
  localStorage.setItem('amount', total);
}

function getTotal(key) {
  return localStorage.getItem(key);
}

function totalMinus(price) {
  const currentValue = Number(totalElement.innerText);
  let total = currentValue - Number(price);
  if (total === 0) {
    total = '00,00';
  } 
  totalElement.innerText = total;
  saveTotal(total);
}

function totalSum({ price }) {
  const currentValue = Number(totalElement.innerText.replace(',', '.'));
  const total = currentValue + Number(price);
  totalElement.innerText = total;
  saveTotal(total);
}

function resetCart() {
  cartItemsList.innerHTML = '';
  totalElement.innerText = '00,00';
  localStorage.clear();
}

const cartItemClickListener = (event) => {
  const element = event.target;
  const elementText = element.innerText;
  const dollarSignIndex = elementText.indexOf('$');
  const price = elementText.substring(dollarSignIndex + 1, elementText.length);
  totalMinus(price);
  element.remove();
  saveCartItems(cartItemsList.innerHTML);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

function transformData(data) {
  if (Array.isArray(data)) {
    return data.map((element) => {
      const { id, title, thumbnail } = element;
      return {
        sku: id,
        name: title,
        image: thumbnail,
      };
    });
  }
  const { id, title, price } = data;
  return {
    sku: id,
    name: title,
    salePrice: price,
  };
}

function appendProducts(productList) {
  productList.forEach((element) => {
    const product = createProductItemElement(element);
    const itemsSection = document.getElementsByClassName('items')[0];
    itemsSection.appendChild(product);
  });
}

async function pushToCart(event) {
  const element = event.target;
  const id = element.parentElement.firstElementChild.innerText;
  const data = await fetchItem(id);
  const item = transformData(data);
  totalSum(data);
  const listItem = createCartItemElement(item);
  cartItemsList.appendChild(listItem);
  saveCartItems(cartItemsList.innerHTML);
}
// ref Array.from: https://stackoverflow.com/questions/22754315/for-loop-for-htmlcollection-elements
function addButtonsEvent(listOfButtons) {
  const buttons = Array.from(listOfButtons);
  buttons.forEach((button) => {
    button.addEventListener('click', pushToCart);
  });
}

function onLoad() {
  const loadElement = document.createElement('p');
  loadElement.innerText = 'carregando...';
  loadElement.classList.add('loading');
  itemsContainer.appendChild(loadElement);
}

function loadCompleted() {
  itemsContainer.firstChild.remove();
}

window.onload = async () => {
  const cartItemsHTML = getSavedCartItems();
  if (cartItemsHTML !== null) {
    cartItemsList.insertAdjacentHTML('afterbegin', cartItemsHTML);
    const items = Array.from(cartItemsList.children);
    items.forEach((product) => product.addEventListener('click', cartItemClickListener));
  }
  const total = getTotal('amount');
  if (total !== null) {
    totalElement.innerText = total;
  }
  onLoad();
  const { results } = await fetchProducts('computador');
  loadCompleted();
  const data = transformData(results);
  appendProducts(data);
  const buttons = document.getElementsByClassName('item__add');
  addButtonsEvent(buttons);
  resetButton.addEventListener('click', resetCart);
};
