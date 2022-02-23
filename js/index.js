const slidingImages = document.querySelectorAll('.img img')
const slidingTexts = document.querySelectorAll('.text')
const nextButton = document.querySelector('.next-btn')
const previousButton = document.querySelector('.previous-btn')
const firstNavDot = document.querySelector('.nav-dot1')

let positionValue = 0
let currentValue = 0

setInterval(()=>{
    nextFunctionLoop()
}, 10000)


nextButton.addEventListener('click', ()=>{
    nextFunction()
})

previousButton.addEventListener('click', ()=>{
    prevFunction()
})



/* ----------------------- next sliding images looping ---------------------- */
let nextFunctionLoop = () =>{
    if(currentValue < 300){
        currentValue += 100
        positionValue += 40
    }else{
        currentValue = 0
        positionValue = 0
        }
    for (i = 0; i < slidingImages.length; i++){
        slidingImages[i].style.setProperty('--marginValue', currentValue)
        slidingTexts[i].style.setProperty('--marginValue', currentValue)
        firstNavDot.style.setProperty('--positionValue', positionValue)
    }
}

/* ----------------------- next sliding image function ---------------------- */
let nextFunction = () =>{
    if(currentValue < 300){
        currentValue += 100
        positionValue += 40
    }else{
        currentValue = 300
    }
    for (i = 0; i < slidingImages.length; i++){
        slidingImages[i].style.setProperty('--marginValue', currentValue)
        slidingTexts[i].style.setProperty('--marginValue', currentValue)
        firstNavDot.style.setProperty('--positionValue', positionValue)
    }
}

/* -------------------- previous sliding images function -------------------- */
let prevFunction = () =>{
    if(currentValue > 0){
        currentValue -= 100
        positionValue -= 40
    }else{
        currentValue = 0
    }
    for (i = 0; i < slidingImages.length; i++){
        slidingImages[i].style.setProperty('--marginValue', currentValue)
        slidingTexts[i].style.setProperty('--marginValue', currentValue)
        firstNavDot.style.setProperty('--positionValue', positionValue)
    }
}
