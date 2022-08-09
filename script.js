// const { fetchItem } = require("./helpers/fetchItem");

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

const cartItemClickListener = (event) => {
  // coloque seu código aqui!!
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
  const listItem = createCartItemElement(item);
  const cartItemsList = document.getElementsByClassName('cart__items')[0];
  cartItemsList.appendChild(listItem);
}
// ref Array.from: https://stackoverflow.com/questions/22754315/for-loop-for-htmlcollection-elements
function addButtonsEvent(listOfButtons) {
  const buttons = Array.from(listOfButtons);
  buttons.forEach((button) => {
    button.addEventListener('click', pushToCart);
  });
}

window.onload = async () => {
  const { results } = await fetchProducts('computador');
  const data = transformData(results);
  appendProducts(data);
  const buttons = document.getElementsByClassName('item__add');
  addButtonsEvent(buttons);
};
