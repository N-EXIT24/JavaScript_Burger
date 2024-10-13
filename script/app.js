
let products = [
    {
       id: 1,
       name: 'Crazy',
       price: 31000,
       img: 'images/products/burger-1.png',
       quantity: 0,
       get totalSum() {
            return this.price * this.quantity
       }
    },
    {
       id: 2,
       name: 'Light',
       price: 26000,
       img: 'images/products/burger-2.png',
       quantity: 0,
       get totalSum() {
            return this.price * this.quantity
       }
    },
    {
       id: 3,
       name: 'CheeseBurger',
       price: 29000,
       img: 'images/products/burger-3.png',
       quantity: 0,
       get totalSum() {
            return this.price * this.quantity
       }
    },
    {
       id: 4,
       name: 'dBurger',
       price: 24000,
       img: 'images/products/burger-4.png',
       quantity: 0,
       get totalSum() {
            return this.price * this.quantity
       }
    },
    {
       id: 5,
       name: 'Javascript burger',
       price: 44000,
       img: 'https://avatars.mds.yandex.net/i?id=a12252e6bc03e7a1aea9916b613f90e8bbab0397aa9dc105-5322671-images-thumbs&n=13',
       quantity: 0,
       get totalSum() {
            return this.price * this.quantity
       }
    },
]

const wrapperList = document.querySelector('.wrapper__list')

// outBurgers() - будет перебирать массив products и выводить бургеры внутри wrapperList 
function outBurgers() {
    
    products.forEach((item) => {
       let {id, name, price, img} = item
       
       wrapperList.innerHTML += `<div class="wrapper__list-card" id="${id}">
       <p class="wrapper__list-count"></p>
       <img class="wrapper__list-image" src="${img}" alt="">
       <h3 class="wrapper__list-title">${name}</h3>
       <div class="wrapper__list-sub">
           <p class="wrapper__list-text">${price} сум</p>
           <button class="wrapper__list-btn"><img src="images/sell-icon.svg" alt=""></button>
       </div>
   </div>`
    })
}
outBurgers()

let cart = []
const   burgerBtns = document.querySelectorAll('.wrapper__list-btn'),
        cartBtn    = document.querySelector('.wrapper__navbar-btn'),
        cartClose  = document.querySelector('.wrapper__navbar-close'),
        basket     = document.querySelector('.wrapper__navbar-basket'),
        cartQuantity = document.querySelector('.warapper__navbar-count'),
        cartPrice   = document.querySelector('.wrapper__navbar-totalprice'),
        cartList = document.querySelector('.wrapper__navbar-checklist')
        
cartBtn.addEventListener('click', () => basket.classList.add('active'))
cartClose.addEventListener('click', () => basket.classList.remove('active'))


burgerBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        addQuantity(btn)
    })
})

// addQuantity() добавляет кол-во указаному бургеру
function addQuantity(btn) {
   // closest() - метод который подключается к ближайшему указанному родителю
    let id = btn.closest('.wrapper__list-card').getAttribute('id')
    let burger = products.find((item) => item.id == id)
    burger.quantity < 10 ?  burger.quantity++ : alert('Слишком много')
    addToCart(burger)
}

function addToCart(burger) {
    if(burger.quantity > 0) {
        if(!cart.includes(burger)) {
            cart.push(burger)
        }
    }
    output()
}

function output() {
    
    cartPrice.innerHTML = getTotalSum()
    let cartAmount = getTotalQuantity()
    if(cartAmount > 0) {
        cartQuantity.classList.add('active')
        cartQuantity.innerHTML = cartAmount
    }else {
        cartQuantity.classList.remove('active')
        cartQuantity.innerHTML = ''
    }
    
    cartList.innerHTML = ''
    cart.forEach((burger) => {
        cartList.innerHTML += createBurger(burger)
    })
}


function createBurger({name, quantity, price, img}) {
    return `  <div class="navbar__item">
    <div class="navbar__item-left">
        <img src="${img}" alt="">
        <div class="navbar__item-left-info">
            <p class="navbar__item-left-name">${name}</p>
            <p class="navbar__item-left-price">${price} сум</p>
        </div>
    </div>
    <div class="navbar__item-right">
        <button data-symbol="-" class="navbar__item-btn">-</button>
        <output class="navbar__item-count">${quantity}</output>
        <button data-symbol="+" class="navbar__item-btn">+</button>
    </div>
    </div>  `
}

function getTotalSum() {
    let sum = 0
    products.forEach((item) => {
        sum += item.totalSum
    })
    return sum + 'сумм'
}

function getTotalQuantity() {
    let sum = 0
    products.forEach((item) => {
        sum += item.quantity
    })
    return sum 
}


window.addEventListener('click', (event) => {
    if(event.target.classList.contains('navbar__item-btn')) {
        let btn = event.target
        let burgerName = btn.closest('.navbar__item').querySelector('.navbar__item-left-name').innerHTML
        let burger = products.find((item) => item.name == burgerName)
        let dataValue = btn.getAttribute('data-symbol')
        if(dataValue == '+') {
            burger.quantity++
        }else if(dataValue == '-') {
            burger.quantity--
        }
        
        cart = cart.filter((item) => item.quantity > 0) 
        output()
    }
})


document.addEventListener("DOMContentLoaded", function() {
    let counterElement = document.getElementById("counter");
    let count = 0;
    let interval = setInterval(function() {
        if (count < 100) {
            count++;
            counterElement.textContent = count;
        } else {
            clearInterval(interval); // Останавливаем счетчик на 100
        }
    }, 50); // Скорость увеличения счетчика (50 миллисекунд на шаг)
});
