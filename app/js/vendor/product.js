const catalogList = document.querySelector('.catalog-list');
const catalogMore = document.querySelector('.catalon-more');
let dataLength = null;
let prodQuantity = 5;

const normalPrice = (str) => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

if (catalogList) {
  const loadProducts = (quantity = 5) => {
    fetch('../data/house.json')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data);

        dataLength = data.length;

        catalogList.innerHTML = '';

        for (let i = 0; i < dataLength; i++){
          if(i < quantity){
            let item = data[i]
            console.log(item);

            catalogList.innerHTML += `
            <div class="catalog-list__item">
              <p class="catalog-list__item-name">${item.title}</p>
              <div class="catalog-list__item-box">
                <img src="${item.mainImage}" alt="${item.title}" class="catalog-list__item-img">
              </div>
              <div class="catalog-list__item-size">
                <p class="catalog-list__item-square">${item.size.square}</p>
                <p class="catalog-list__item-area">${item.size.area}m<sup>2</sup></p>
              </div>
              <p class="catalog-list__item-price">от ${normalPrice(item.price)} р</p>
              <button class="catalog-list__item-btn" data-graph-path="prod-modal" data-id='${item.id}'>Побробнее</button>
            </div>
            `;
          }
        }
      })
      .then(()=>{
        const modal = new GraphModal({
          isOpen: (modal) => {
            console.log(modal);
            console.log('opened');

            const openBtn = modal.previousActiveElement;
            console.log(openBtn);
          },
        });
      })
  };

  loadProducts(prodQuantity);

  catalogMore.addEventListener('click', ()=>{
    prodQuantity = prodQuantity + 1;

    loadProducts(prodQuantity);
    if(prodQuantity >= dataLength){
      catalogMore.style.display = 'none'
    }else {
      catalogMore.style.display = 'block'
    }
  })
}