const cartStorege = JSON.parse(localStorage.getItem(`cart`) || []);
const korz = document.querySelector(`.korz`);
const totalprices = document.querySelector(`.totalprices`);
const h1cart = document.querySelector(`.h1cart`);
const spancount = document.querySelector(`.spancount`);
const korzimg = document.querySelector(`.korzimg`);
const centerTotal = document.querySelector(`.centerTotal`);
const imgK = document.querySelector(`.imgK`);
const totalpricetext = document.querySelector(`.totalpricetext`);


function quantityPrice() {
let pricemax = cartStorege.reduce((acum, item) => {

   return acum + item.pricenumber * item.quantity;

},0)

totalprices.innerHTML = `${pricemax} $`;
}

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
      let {idcard, imges, title, pricenumber, opisanie, quantity = 1} = el; 
       let newCart = document.createElement('div');
       newCart.setAttribute(`class`, `newcard`);
       newCart.innerHTML = `
       <div id="${idcard}" class="card">
       <div class="divz">
        <img class="imgKorz" src="${imges}" alt="">
       </div> 
        <p class="titlekorz">${title}</p>
        <p class="opisanie">${opisanie}</p>
        <p class="price">${pricenumber * quantity}$</p>
       <div class="counts">
       <span class="spanMinus" data-index="${index}">-</span>
       <input class="inputcount" type="text" value="${quantity}" readonly>
       <span class="spanPlus" data-index="${index}">+</span>
       </div> 
       <button data-id="${index}" class="btdelete">X</button>
       `
       spancount.innerHTML = cartStorege.length; 
       korz.appendChild(newCart);

      });
   }
   quantityPrice();
}

korz.addEventListener('click', event => {
   const index = event.target.dataset.index;
   if(event.target.classList.contains('spanPlus')) {
      cartStorege[index].quantity = (cartStorege[index].quantity) + 1;
   }
   else if (event.target.classList.contains('spanMinus')) {
      cartStorege[index].quantity -= 1;
      if(cartStorege[index].quantity <= 0) {
         cartStorege.splice(index, 1);
         location.reload();
      }
   }
   localStorage.setItem('cart', JSON.stringify(cartStorege));
   renderCart();
})

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

