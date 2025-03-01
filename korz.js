const cartStorege = JSON.parse(localStorage.getItem(`cart`) || "[]");
const korz = document.querySelector(`.korz`);
const totalprices = document.querySelector(`.totalprices`);
const h1cart = document.querySelector(`.h1cart`);
const spancount = document.querySelector(`.spancount`);
const korzimg = document.querySelector(`.korzimg`);
const centerTotal = document.querySelector(`.centerTotal`);
const imgK = document.querySelector(`.imgK`);
const totalpricetext = document.querySelector(`.totalpricetext`);


function renderCart() {
   korz.innerHTML = ``;
   if(cartStorege.length <= 0) {
      centerTotal.style.display = `none`;
      totalpricetext.style.opacity = `1`;
      imgK.style.display = `flex`;
      imgK.style.opacity = `1`;
   }
   if(cartStorege.length > 0) {
      h1cart.innerHTML = `Your Cart`;
      korzimg.style.display = `none`;
      imgK.style.opacity = `0`;
      totalpricetext.style.display = `flex`;
      document.querySelector(`.totalprices`).style.display = `flex`;
   }
     if(cartStorege) {
        cartStorege.forEach((el, index) => {
        let {idcard, imges, title, pricenumber, opisanie, btaddcart} = el;   
        let pricemax = cartStorege.reduce((acum, item) => {
              return acum + item.pricenumber
        },0)
        totalprices.innerHTML = `${pricemax} $`;
        let newCart = document.createElement('div');
        newCart.setAttribute(`class`, `newcard`);
        newCart.innerHTML = `
        <div id="${idcard}" class="card">
        <div class="divz">
         <img class="imgKorz" src="${imges}" alt="">
        </div> 
         <p class="titlekorz">${title}</p>
         <p class="opisanie">${opisanie}</p>
         <p class="price">${pricenumber}$</p>
        <button data-id="${index}" class="btdelete">X</button>
        `
        spancount.innerHTML = cartStorege.length; 
        korz.appendChild(newCart);

        });

     }
};

renderCart();
 

            //    Удаление товаров с корзины

document.onclick = (event) => {
const cartposition = event.target.getAttribute("data-id")

if (event.target.classList.contains('btdelete') && cartposition !== null) {
   cartStorege.splice(cartposition, 1)
localStorage.setItem(`cart`, JSON.stringify(cartStorege));

location.reload();
renderCart();
  }

};










