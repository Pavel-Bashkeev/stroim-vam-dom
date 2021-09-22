const catalogList = document.querySelector('.catalog-list');
// const catalogMore = document.querySelector('.catalon-more');
const filterBtns = document.querySelectorAll('.catalog-btns__item');
const prodModalContent = document.querySelector('[data-graph-target="prod-modal"]>.modal-content');


const modalSlider = document.querySelector('.modal-slider .swiper-wrapper');
const modalSliderPreview = document.querySelector('.modal-preview');
const modalInfo = document.querySelector('.modal-info');

let dataLength = null;
let prodQuantity = 5;

const normalPrice = (str) => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

if (catalogList) {
  const prodSlider = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 20,
  });

  const loadProducts = (quantity = 5) => {
    fetch('../data/house.json')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        dataLength = data.length;
        quantity = dataLength;
        catalogList.innerHTML = '';

        for (let i = 0; i < dataLength; i++) {
          if (i < quantity) {
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
      .then(() => {
        const modal = new GraphModal({
          isOpen: (modal) => {
            const openBtnId = modal.previousActiveElement.dataset.id;
            loadModalData(openBtnId);
            
          },
        });
      })

  };

  loadProducts();

  const loadModalData = (id = 1) => {
    fetch('../data/house.json')
      .then((response) => {
        return response.json()
      })
      .then(data => {
        modalSlider.innerHTML = ''
        modalSliderPreview.innerHTML = ''
        modalInfo.innerHTML = ''

        for (let dataItem of data) {
          if (dataItem.id == id) {
            console.log(dataItem);

            const slides = dataItem.images.map(image => {
              return `
              <div class='swiper-slide'>
                <img src='${image}' alt='image' class="swiper-slide__img">
              </div>
              
              `
            })
            const slidesPreview = dataItem.images.map((image, idx) => {
              return `
              <div class="modal-preview__item" tabindex="0" data-index="${idx}">
								<img src='${image}' alt="" class="swiper-slide__img">
							</div>
              `
            })
            modalSlider.innerHTML = slides.join('');
            modalSliderPreview.innerHTML = slidesPreview.join('');
            modalInfo.innerHTML = `
            <h3 class="modal-info__title">
            ${dataItem.title}
          </h3>
          <div class="modal-info__item">
            <h4 class="modal-info__item-title">
              Размеры:
            </h4>
            <div class="modal-info__size">
              <p class="modal-info__size-square">${dataItem.size.square}</p>
              <p class="modal-info__size-area">${dataItem.size.area}m<sup>2</sup></p>
            </div>
          </div>
          <div class="modal-info__item">
            <h4 class="modal-info__item-title">
              Утепление:
            </h4>
            <p class="modal-info__text">${dataItem.warming}</p>
          </div>
          <div class="modal-info__item">
            <h4 class="modal-info__item-title">
              Кладка:
            </h4>
            <p class="modal-info__text">${dataItem.masonry}</p>
          </div>
          <div class="modal-info__item">
            <h4 class="modal-info__item-title">
              Фундамент:
            </h4>
            <p class="modal-info__text">${dataItem.foundation}</p>
          </div>
          <div class="modal-info__item">
            <h4 class="modal-info__item-title">
              Отделка с наружи:
            </h4>
            <p class="modal-info__text">${dataItem.externalFacade}</p>
          </div>
          <div class="modal-info__item">
            <h4 class="modal-info__item-title">
              Отделка внутри:
            </h4>
            <p class="modal-info__text">${dataItem.inside}</p>
          </div>
          <div class="modal-info__item">
            <h4 class="modal-info__item-title">
              Транспортная доступность:
            </h4>
            <p class="modal-info__text">
            ${dataItem.transAcc}
            </p>
          </div>
          <div class="modal-info__item">
            <h4 class="modal-info__item-title">
              Цена:
            </h4>
            <p class="modal-info__text">${normalPrice(dataItem.price)} р</p>
          </div>
            `
          }
        }
      })
      .then(() => {
        prodSlider.update();
        document.querySelectorAll('.modal-preview__item').forEach(item => {
          item.addEventListener('click', (event)=>{
            let target = event.currentTarget;
            let idx = target.dataset.index

            prodSlider.slideTo(idx)
          })
        })
        
      })
  }

  const loadFilterItem = (itemBlock) => {
    fetch('../data/house.json')
      .then((response) => {
        return response.json()
      })
      .then(data => {
        catalogList.innerHTML = '';
        for (let i = 0; i < dataLength; i++) {
          let item = data[i]
          if (item.route === itemBlock) {
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
  window.addEventListener('DOMContentLoaded', () => {
    filterBtns.forEach(item => {

      item.addEventListener('click', (e) => {
        let target = e.target;
        let filterBtnValue = target.dataset.filterBtn;
        for (let i = 0; i < filterBtns.length; i++) {
          filterBtns[i].classList.remove('active-btn');
        }
        target.classList.add('active-btn')
        filterBtnValue == 'all' ? loadProducts() : loadFilterItem(filterBtnValue);
      })
    });
  })
}