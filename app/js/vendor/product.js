const catalogList = document.querySelector('.catalog-list');
// const catalogMore = document.querySelector('.catalon-more');
const filterBtns = document.querySelectorAll('.catalog-btns__item');
const prodModalContent = document.querySelector('[data-graph-target="prod-modal"]>.modal-content');
let dataLength = null;
let prodQuantity = 5;

const normalPrice = (str) => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}
const prodSlider = new Swiper('.modal-slider__container', {
  slidesPerView: 1,
  spaceBetween: 10
})
if (catalogList) {
  const loadProducts = (quantity = 5) => {
    fetch('../data/house.json')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        dataLength = data.length;
        quantity = dataLength;
        catalogList.innerHTML = '';

        for (let i = 0; i < dataLength; i++){
          if(i < quantity){
            let item = data[i]

            catalogList.innerHTML += `
            <div class="catalog-list__item" data-filter-item='${item.route}'>
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
            const openBtnId = modal.previousActiveElement.dataset.id;
            loadModalData(openBtnId);
            prodSlider.updateSize();
          },
        });

        
      })
  };

  loadProducts();

  const loadModalData = (id = 1)=>{
    fetch('../data/house.json')
      .then((response) => {
        return response.json()
      })
      .then(data => {
        // prodModalContent.innerHTML = "";

        for(let dataItem of data){
          if(dataItem.id == id){
            console.log(dataItem);
          }
        }
      })
  }

  const loadFilterItem = (itemBlock) => {
    fetch('../data/house.json')
      .then((response) => {
        return response.json()
      })
      .then(data => {
        catalogList.innerHTML = '';
        for (let i = 0; i < dataLength; i++){
          let item = data[i]
          if(item.route === itemBlock){
            catalogList.innerHTML += `
            <div class="catalog-list__item" data-filter-item='${item.route}'>
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
  }
  window.addEventListener('DOMContentLoaded', ()=>{
    filterBtns.forEach(item => {
      
      item.addEventListener('click', (e)=>{
        let target = e.target;
        let filterBtnValue = target.dataset.filterBtn;
        for(let i =0; i < filterBtns.length; i++){
          filterBtns[i].classList.remove('active-btn');
        }
        target.classList.add('active-btn')
        filterBtnValue == 'all' ? loadProducts(): loadFilterItem(filterBtnValue);
      })
    });
  })
}