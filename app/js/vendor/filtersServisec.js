const servisecBtn = document.querySelector('.uslugi__btns');

servisecBtn.addEventListener('click', (event)=>{
  let target = event.target;
  let itsBtnItem = 
  console.log(target);
  if(target.classList != 'uslugi__btn') return false;
  console.log(target);
});