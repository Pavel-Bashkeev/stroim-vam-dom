const galleryBtns = document.querySelectorAll('.gallery__item');
const modalBtnClose = document.querySelectorAll('.modal-popup__close');

galleryBtns.forEach(item => {
  item.addEventListener('click', (event) => {
    let target = event.currentTarget;
    let dataModalValue = target.dataset.modalBtn;
    let currentModal = document.querySelector(`[data-target-modal=${dataModalValue}]`);

    currentModal.classList.remove('hide');
    currentModal.classList.add('modal-visible');
    document.body.classList.add('modal-opened');
  });
});

modalBtnClose.forEach(item => {
  item.addEventListener('click', closeModal)
})

function closeModal () {
  document.body.classList.remove('modal-opened');
  this.parentElement.classList.add('hide');
  this.parentElement.classList.remove('modal-visible');
}