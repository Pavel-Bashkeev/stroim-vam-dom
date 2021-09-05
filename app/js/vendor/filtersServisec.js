const servicesItem = document.querySelectorAll('.uslugi__info');
const servicesBtn = document.querySelectorAll('.uslugi__btn');
if(servicesBtn){
  servicesBtn.forEach(item => {

    item.addEventListener('click', ()=>{
      for(let i = 0; i < servicesBtn.length; i++){
        servicesBtn[i].classList.remove('uslugi__btn--active');
      }
      item.classList.add('uslugi__btn--active');
      showContentServices(servicesItem, 0);

      for(let i = 0; i < servicesItem.length; i++){
        if(item.dataset.btnFilter == servicesItem[i].dataset.contentFilter){
          servicesItem[i].classList.remove('hide');
        }
      }
    });
    
  });

  function showContentServices(items, index){
    for(let i = index; i < items.length; i++){
      items[i].classList.add('hide');
    }
  }
  showContentServices(servicesItem, 1);
}
