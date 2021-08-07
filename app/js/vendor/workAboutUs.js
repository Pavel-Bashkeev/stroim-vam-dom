const aboutUsActions = document.querySelector('.aboutUs__actions');
if (aboutUsActions) {
  let counter = 0;
  let delay = 4000;

  const dataAbout = [{
      count: 15,
      descr: 'лет успешной работы'
    },
    {
      count: 1000,
      descr: 'м2 готовых объектов'
    },
    {
      count: 50,
      descr: 'довольных клиентов'
    },
  ]
  const changeValue = () => {

    let dataCount = `${dataAbout[counter].count}`;
    let dataDescr = `${dataAbout[counter].descr}`;

    aboutUsActions.querySelector('.aboutUs__actions-count').textContent = dataCount;
    aboutUsActions.querySelector('.aboutUs__actions-text--bottom').textContent = dataDescr;
    
    counter++;

    counter == dataAbout.length ? counter = 0: '';
    
  }
  setInterval(changeValue, delay);
<<<<<<< HEAD
=======
  console.log(counter);
  console.log(dataAbout.length);
>>>>>>> 3622bd4670c1e7355dd2b5fdf38daf61b3b265ed
}