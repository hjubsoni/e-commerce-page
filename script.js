const nav = document.querySelector(".primary-navigation");
const nextButton = document.querySelector(".arrow-right");
const previousButton = document.querySelector(".arrow-left");
const imageSlider = document.querySelector(".slider-contents")
const allPhotos =  Array.from(document.querySelectorAll('.slide'))
const header = document.querySelector('.primary-header')
const main = document.querySelector('main')
const basket = document.querySelector('.basket')
const desktopSlide = document.querySelector('.slider-contents-desktop')
const addToCartButton = document.querySelector('.add-to-cart')
const deleteCart = document.querySelector('.delete')

function left() {
    allPhotos.forEach(photo => {
        const getWidth = document.querySelector('.is-selected')
        const width = parseInt(getComputedStyle(getWidth).width)
        photo.style.left = width * allPhotos.indexOf(photo) + 'px'
    })
}

left()



header.addEventListener("click", (event) => {
 const navToggle = event.target.closest(".mobile-nav-toggle")
 if(navToggle) {
     nav.classList.add('active')
 }

})

header.addEventListener("click", (event) => {
 const closeNav = event.target.closest(".close-mobile-nav")
    if(closeNav) {
        nav.classList.remove('active')
    }
})


previousButton.setAttribute('data-visible', true)

nextButton.addEventListener('click', event => {
    const currentSlide = imageSlider.querySelector('.is-selected')
    const nextSlide = currentSlide.nextElementSibling
    const destination = getComputedStyle(nextSlide).left
    imageSlider.style.left = '-' + destination
    currentSlide.classList.remove('is-selected')
    nextSlide.classList.add('is-selected')
    previousButton.style.display = 'flex'
    if(!nextSlide.nextElementSibling) {
        nextButton.style.display = "none"
    }
  })

  previousButton.addEventListener('click', event => {
    const currentSlide = imageSlider.querySelector('.is-selected')
    const previousSlide = currentSlide.previousElementSibling
    const destination = getComputedStyle(previousSlide).left
    imageSlider.style.left = '-' + destination
    currentSlide.classList.remove('is-selected')
    previousSlide.classList.add('is-selected')
    nextButton.style.display = "flex"
    if(!previousSlide.previousElementSibling) {
        previousButton.style.display = "none"
    }
    
  })

  
main.addEventListener('click', (event) => {
    const minusButton = event.target.closest('.minus')
    const plusButton = event.target.closest('.plus')
    const display = document.querySelector('.current-value')
    if(minusButton) {
        if(display.textContent === "0") return
            display.textContent--
    }
    if(plusButton) {
        if(display.textContent === "50") return
            display.textContent++
    }
})



desktopSlide.addEventListener('click', (event) => {
    const desktopSlide = event.target.closest('.desktop-slide')
    const sliders = Array.from(document.querySelectorAll('.desktop-slide'))
    const target = desktopSlide.dataset.target
    const slideContent = main.querySelector('#' + target)
    const destination = getComputedStyle(slideContent).left
    if(desktopSlide) {
        imageSlider.style.left = '-' + destination
        sliders.forEach(slide => {
            slide.classList.remove('is-selected')
            desktopSlide.classList.add('is-selected')  
        })
    }
})

const calculatePrice = () => {
   const amountOfPairs = document.querySelector('.current-value')
   const value = parseInt(amountOfPairs.textContent)
   const sneakersPrice = document.querySelector('.sneaker-price')
   const xTimes = document.querySelector('.x-times')
   const finalPrice = document.querySelector('.stronger')
   const currentPrice = sneakersPrice.textContent
   const removeDolar = currentPrice.substring(1, 7)
   const priceToNum = parseInt(removeDolar)
   xTimes.textContent = "x" + value 
   finalPrice.textContent = "$" + value * priceToNum  
}

addToCartButton.addEventListener('click', () => {
    const amountOfPairs = document.querySelector('.current-value')
    const basketItems = document.querySelector('.number-of-items')
    const value = parseInt(amountOfPairs.innerHTML)
    if(value > 0) {
        basketItems.textContent = value
        calculatePrice()
    }    
})

basket.addEventListener('click', () => {
    const basketPopOver = document.querySelector('.basket-popover')
    const basketItems = document.querySelector('.number-of-items')
    const content = document.querySelector('.basket-container')
    const emptyBasket = document.querySelector('.basket-empty')
    const value = parseInt(basketItems.textContent)
    basketPopOver.classList.toggle('active')

    if(!value) {
        content.style.display = "none"
    } else {
        content.style.display = "flex"
        emptyBasket.style.display = "none"

    }

})


deleteCart.addEventListener('click', () => {
    const content = document.querySelector('.basket-container')
    const basketItems = document.querySelector('.number-of-items')
    const basketPopOver = document.querySelector('.basket-popover')
    const amountOfPairs = document.querySelector('.current-value')
    const basketEmpty = document.querySelector('.basket-empty')
    content.style.display = "none"
    basketItems.textContent = ""
    basketPopOver.classList.remove('active')
    basketEmpty.style.display = "flex"
    amountOfPairs.textContent = 0
})