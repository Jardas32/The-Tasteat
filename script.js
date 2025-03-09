const cardset = document.querySelectorAll(`.cards`);
const btshowless = document.querySelector(`.btshowless`);
const sliders = document.querySelector(`.sliders`);
const btallcard = document.getElementById('btallcard');
const cartStorege = JSON.parse(localStorage.getItem(`cart`) || "[]");
const spancount = document.querySelector(`.spancount`);
const productgrid = document.querySelector(`.productgrid`);
const imgpopup = document.querySelector(`.imgpoup`);
let offset = 0;
spancount.innerHTML = cartStorege.length;

                    // Карусель отзывов

document.querySelector(`.btleft`).addEventListener(`click`, () => {
    offset = offset - 575;
    if (offset < 0) {
        offset = 2050
    }
    sliders.style.left = -offset + `px`;

});

document.querySelector(`.btright`).addEventListener(`click`, () => {
    offset = offset + 575;
    if (offset > 2050) {
       offset = 0
    }
    sliders.style.left = -offset + `px`;
});

                    //    Показываеть больше товаров

let visibleCards = 8; // Сколько карточек показывать изначально
const increment = 8; // Количество карточек, добавляемых при каждом клике

function updateCards() {
    cardset.forEach((item, index) => {
        if (index < visibleCards) {
            item.classList.remove('hiden'); // Показываем карточку
        } else {
            item.classList.add('hiden'); // Скрываем карточку
        }
    });

    if (visibleCards >= cardset.length) {
        btallcard.innerHTML = 'Show less';
    } else {
        btallcard.innerHTML = 'Show more';
    }
}

// Обработчик для кнопки
btallcard.addEventListener('click', () => {
    if (visibleCards >= cardset.length) {
        visibleCards = 8; // Если все карточки показаны, оставляем только 8
    } else {
        visibleCards += increment; // Иначе показываем больше карточек
    }
    updateCards();
});

// Изначально показываем только часть карточек
updateCards();


                //  Добавление товаров в корзину


cardset.forEach(el => {
// console.dir(cardset);    
    let idcard = el.id;
    let imges = el.childNodes[1].childNodes[1].attributes.src.textContent;
    let title = el.childNodes[3].childNodes[0].textContent;
    let price = el.childNodes[3].childNodes[1].innerHTML;
    let opisanie = el.childNodes[5].innerHTML;
    let btaddcart = el.childNodes[7];
// console.log(btaddcart);

let pricenumber = parseInt(price.replace(/[^\d]/g, ""), 10);

btaddcart.addEventListener(`click`, function() {
let card = {idcard, imges, title, pricenumber, opisanie, btaddcart, quantity: 1};     

const cardStorede = localStorage.getItem(`cart`) || "[]";
let cart = JSON.parse(cardStorede);
const existcard = cart.findIndex(item => item.idcard === idcard);
if(existcard !== -1) {
    alert(`Такой товар уже добавлен в корзину!`)
    cart[existcard].pricenumber += pricenumber;
}else {
    cart.push(card);
}

localStorage.setItem(`cart`, JSON.stringify(cart))
location.reload();
});
});

                    // Pop-up-card

document.addEventListener("DOMContentLoaded", function() {
    
const titlepop = document.querySelector(`.titlepop`);
const imgPopup = document.querySelector(`.imgPopup`);
const popupPrice = document.querySelector(`.popupPrice`);
const opispopup = document.querySelector(`.opispopup`);
const btClosedpop = document.querySelector(`.btClosedpop`);

document.querySelectorAll(`.cards`).forEach(el => {
    let openpopup = el.childNodes[1];
    let imges = el.childNodes[1].childNodes[1].attributes.src.textContent;
    let title = el.childNodes[3].childNodes[0].textContent;
    let price = el.childNodes[3].childNodes[1].innerHTML;
    let opisanie = el.childNodes[5].innerHTML;
    let pricepopup = parseInt(price.replace(/[^\d]/g, ""), 10);
    console.log(openpopup)

 openpopup.addEventListener(`click`, function() {
     imgPopup.src = imges;
     titlepop.textContent = title;
     popupPrice.innerHTML = `${pricepopup}$`;
     opispopup.textContent = opisanie;
     document.querySelector(`html`).classList.add('no-scroll');
    imgpopup.classList.add(`imgpoupclass`);
 })   
});

btClosedpop.addEventListener(`click`, () => {
    imgpopup.classList.remove('imgpoupclass');
    document.querySelector(`html`).classList.remove('no-scroll');
});
});

            //  Go--Up

            
const goup = document.querySelector(`.goup`);

goup.addEventListener(`click`, goTop);
window.addEventListener(`scroll`, trackskroll);

function trackskroll() {
  const offset = window.pageYOffset;
  const coord = document.documentElement.clientHeight;
  if (offset > coord) {
      goup.classList.add('goupclass')
  }
  else {
      goup.classList.remove('goupclass')
  }
}

function goTop() {
    if (window.pageYOffset > 0 ) {
        window.scrollBy(0, -77);
        setTimeout(goTop, 0)
    }
}; 

