const accountExpandButton = document.querySelector('.expand-button')
const accountRelatedListBox = document.querySelector('.account-relates-wrapper ul')
const expandListCancelButton = document.querySelector('.expand-button ul li:last-child a')

accountExpandButton.addEventListener('mouseover', ()=>{
    accountRelatedListBox.style.setProperty('max-height', '200px')
})

accountExpandButton.addEventListener('mouseout', ()=>{
    accountRelatedListBox.style.setProperty('max-height', '0px')
})

expandListCancelButton.addEventListener('click', ()=>{
    accountRelatedListBox.style.setProperty('max-height', '0px')
})

/* ---------------------------- membership board ---------------------------- */
const wrapBoard = document.querySelector('.membership-wrapper')
const linkBoard = document.querySelector('.membership-link')
const guideToggleBtn = document.querySelector('.guide-button')
const registerBtn = document.querySelector('.register-button a')
const inputDetails = document.querySelectorAll('input')

wrapBoard.addEventListener('mouseenter', ()=>{
    linkBoard.classList.add('membership-link-active')
})

wrapBoard.addEventListener('mouseleave', ()=>{
    linkBoard.classList.remove('membership-link-active')
})

guideToggleBtn.addEventListener('click', ()=>{
    linkBoard.classList.toggle('membership-link-active')
})

registerBtn.addEventListener('click', ()=>{
    /* ------------------- 1. test all details being filled up ------------------ */
    if (inputDetails[0].value == '' || inputDetails[1].value == ''){
        return alert('Please fill in all the details.')}
    
        // if(/[^a-zA-Z'\s]/g.test(inputDetails[0].value)){
        //     return alert('Invalid Name')}

        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(inputDetails[0].value)){
            return alert('Invalid Email')}

        if(inputDetails[1].value.length < 8){
            return alert('Invalid Password')}

        registerBtn.href = 'update-profile.html'
})

document.body.addEventListener('mousemove', (event)=>{
    const eyeballCenter = document.querySelectorAll('.eyeball-center')
    let X1 = eyeballCenter[0].getBoundingClientRect().left + (eyeballCenter[0].clientWidth/2)
    let Y1 = eyeballCenter[0].getBoundingClientRect().top + (eyeballCenter[0].clientHeight/2)
    let X1Length = event.pageX - X1
    let Y1Length = event.pageY - Y1
    let rad1 = Math.atan2(X1Length,Y1Length)*-1
    let rotate1 = rad1 * (180/Math.PI)+180
    const eyeballOne = document.querySelector('.eyeball1')
    eyeballOne.style.setProperty('--rotate1', rotate1)

    let X2 = eyeballCenter[1].getBoundingClientRect().left + (eyeballCenter[0].clientWidth/2)
    let Y2 = eyeballCenter[1].getBoundingClientRect().top + (eyeballCenter[0].clientHeight/2)
    let X2Length = event.pageX - X2
    let Y2Length = event.pageY - Y2
    let rad2 = Math.atan2(X2Length,Y2Length)*-1
    let rotate2 = rad2 * (180/Math.PI)+180
    const eyeballTwo = document.querySelector('.eyeball2')
    eyeballTwo.style.setProperty('--rotate2', rotate2)
})

const burgerDecor = document.querySelector('.decor')

burgerDecor.addEventListener('click', ()=>{
    if(getComputedStyle(burgerDecor).getPropertyValue('--fun') != 'shake'){
        console.log(123)

        burgerDecor.style.setProperty('--fun', 'shake');

        setTimeout(()=>{
        burgerDecor.style.setProperty('--fun', '');
        }, 1000)}
})