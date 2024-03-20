const $ = document
const addPageBtn = $.getElementById('addBtn')
const containerDiv = $.getElementById('container')
const ulPages = $.getElementById('pagesUl')
const addNamePageBtn = $.getElementById('addNamePageBtn')
const body = $.body
let userName = $.getElementById('userName')
// moduls
const modulBox = $.getElementById('modul')
const toDoModul = $.getElementById('toDoModul')
const tmmrwToDoModul = $.getElementById('tmmrwToDoModul')
const backdropDivPage = $.getElementById('backdropDiv-Page')
const backdropDivTodo = $.getElementById('backdropDiv-toDo')
const backdropDivTmmrwTodo = $.getElementById('backdropDiv-tmmrwTodo')
// apply
const applyNewToDo = $.getElementById('applyNewToDo')
const applyTmmrwNewToDo = $.getElementById('applyTmmrwNewToDo')
// close ModulBox
const closeModulBoxBtn = $.getElementById('closeModulBoxBtn')
const closeToDoModulBoxBtn = $.getElementById('closeToDoModulBoxBtn')
const closeTmmrwToDoModulBoxBtn = $.getElementById('closeTmmrwToDoModulBoxBtn')
// inputs
const inputNamePage = $.getElementById('inputNamePage')
const inputNewToDo = $.getElementById('inputNewToDo')
// ------
const inputTmmrwNewToDo = $.getElementById('inputTmmrwNewToDo')
const home = $.getElementById('home')
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let dayElem = $.getElementById('dayElem')
let timeElem = $.getElementById('timeElem')
// add new todo button
const addNewTodoBtn = $.getElementById('addNewTodoBtn')
const addNewToDoTmmrwBtn = $.getElementById('addNewTodo4TmmrwBtn')
// ul
const toDoUl = $.getElementById('toDoUl')
const tmmrwToDoUl = $.getElementById('tmmrwToDoUl')
const completedUl = $.getElementById('completedUl')
// counter
const countOfTasks = $.getElementById('countOfTasks')
const countOfCompleted = $.getElementById('countOfCompleted')
const countOfTmmrwTasks = $.getElementById('countOfTmmrwTasks')
// progress
const progressPer = $.getElementById('progressPer')
const progressBg = $.getElementById('progressBg')


// ---------------------------------------------------------------------------------

userName.addEventListener('mouseover', ()=>{
    userName.style.textDecoration = 'underline'
    userName.style.cursor = 'pointer'
})

userName.addEventListener('mouseout', ()=>{
    userName.style.textDecoration = 'none'
})

userName.addEventListener('click', ()=>{
    userName.innerHTML.trim()
    if (userName.innerHTML.trim().length < 11){
        userName.contentEditable = 'true'
        userName.focus()
        userName.style.outline = 'none'
    } else {
        userName.innerHTML = 'Name'
    }
})



userName.addEventListener('focusout', ()=>{
    userName.contentEditable = 'false'
})

userName.addEventListener('keyup', ()=>{
    if (userName.innerHTML.trim().length > 10){
        userName.contentEditable = 'false'
        userName.blur()
    }
    if (userName.innerHTML.trim().length > 7){
        userName.classList.add('sm:text-base')
        userName.classList.remove('sm:text-xl')
    } else{
        userName.classList.remove('sm:text-base')
        userName.classList.add('sm:text-xl')
    }
})

setInterval(()=>{
    if (userName.innerHTML.trim().length > 10){
        userName.innerHTML = 'Name'
        alert('Must be under 10 character')
    }
}, 500)



addPageBtn.addEventListener('click', () =>{
    window.scrollTo(0,0)
    backdropDivPage.classList.add('flex')
    backdropDivPage.classList.remove('hidden')
    document.documentElement.classList.add('overflow-y-hidden' , 'h-screen')
    body.classList.add('overflow-y-hidden', 'h-screen')
    setTimeout(()=>{
        inputNamePage.focus()
    }, 700)
})

addNewTodoBtn.addEventListener('click', () =>{
    window.scrollTo(0,0)
    backdropDivTodo.classList.add('flex')
    backdropDivTodo.classList.remove('hidden')
    document.documentElement.classList.add('overflow-y-hidden' , 'h-screen')
    body.classList.add('overflow-y-hidden', 'h-screen')
    setTimeout(()=>{
        inputNewToDo.focus()
    }, 700)
})

addNewToDoTmmrwBtn.addEventListener('click', () =>{
    window.scrollBy(0, window.innerHeight)
    backdropDivTmmrwTodo.classList.add('flex')
    backdropDivTmmrwTodo.classList.remove('hidden')
    document.documentElement.classList.add('overflow-y-hidden' , 'h-screen')
    body.classList.add('overflow-y-hidden', 'h-screen')
    setTimeout(()=>{
        inputTmmrwNewToDo.focus()
    },500)
})

addNamePageBtn.addEventListener('click', () =>{
    if (inputNamePage.value.trim() && inputNamePage.value.length < 11){
        addNewLiFnc()
        pageLiFnc()
        closeModulFnc()
    } else{
        inputNamePage.style.border = '1px solid red'
        inputNamePage.classList.add('shakeInput')
        timeOutForAni(inputNamePage)
    }
})

applyNewToDo.addEventListener('click', () =>{
    if (inputNewToDo.value.trim()){     
        addNewLiTodoFnc()
        countOfTasksFnc(countOfTasks)  
        closeToDoModulFnc()
        progressFnc() 
    } else{
        inputNewToDo.style.border = '1px solid red'
        inputNewToDo.classList.add('shakeInput')
        timeOutForAni(inputNewToDo)
    }
})

applyTmmrwNewToDo.addEventListener('click', () =>{
    if (inputTmmrwNewToDo.value.trim()){
        addNewToDoTmmrwLiFnc()
        countOfTmmrwTasksFnc(countOfTmmrwTasks)  
        closeTmmrwToDoModulBoxFnc()
    } else{
        inputTmmrwNewToDo.style.border = '1px solid red'
        inputTmmrwNewToDo.classList.add('shakeInput')
        timeOutForAni(inputTmmrwNewToDo)
    }
})



inputNamePage.addEventListener('keyup', (e) =>{
    if (e.keyCode == 13){
        if(inputNamePage.value.length < 11 && inputNamePage.value.trim()){
            addNewLiFnc()
            pageLiFnc()
            closeModulFnc()
        } else{
            inputNamePage.style.border = '1px solid red'
            inputNamePage.classList.add('shakeInput')
            timeOutForAni(inputNamePage)
        }
    }

    if (e.keyCode == 27){
        closeModulFnc()
    }
})

inputNewToDo.addEventListener('keyup', (e) =>{
    if (e.keyCode == 13){
        addNewLiTodoFnc()
        closeToDoModulFnc()
        countOfTasksFnc(countOfTasks)
    }
    if (e.keyCode == 27){
        closeToDoModulFnc()
    }
})

inputTmmrwNewToDo.addEventListener('keyup', (e) =>{
    if (e.keyCode == 13){
        addNewToDoTmmrwLiFnc()
        closeTmmrwToDoModulBoxFnc()
        countOfTmmrwTasksFnc(countOfTmmrwTasks)
    }
    if (e.keyCode == 27){
        closeTmmrwToDoModulBoxFnc()
    }
})

closeModulBoxBtn.addEventListener('click', () =>{
    closeModulFnc()
})

closeToDoModulBoxBtn.addEventListener('click', () =>{
    closeToDoModulFnc()
})

closeTmmrwToDoModulBoxBtn.addEventListener('click', () =>{
    closeTmmrwToDoModulBoxFnc()
})



toDoUl.addEventListener('click', (e) =>{
    let checkBox = null
    if (e.target.getAttribute('type') == 'checkbox'){
        checkBox = e.target
        checkBox.classList.toggle('checked')
    } else {
        return false
    }
    if (checkBox.classList.contains('checked')){
        completedUl.append(checkBox.parentElement.parentElement)
        checkBox.parentElement.parentElement.classList.remove('liElem', 'bg-lightBlue')
        checkBox.parentElement.parentElement.classList.add('line-through', 'decoration-black', 'decoration-solid', 'bg-[#f2f8ff]')
        checkBox.nextElementSibling.classList.add('opacity-70')
    }
    countOfTasksFnc(countOfTasks)
    countOfCompletedFnc(countOfCompleted)
    progressFnc()
})

completedUl.addEventListener('click', (e) =>{
    let checkBox = null
    if (e.target.getAttribute('type') == 'checkbox'){
        checkBox = e.target
        checkBox.classList.toggle('checked')
    } else {
        return false
    }
    if (!checkBox.classList.contains('checked')){
        toDoUl.append(checkBox.parentElement.parentElement)
        checkBox.parentElement.parentElement.classList.add('liElem', 'bg-lightBlue')
        checkBox.parentElement.parentElement.classList.remove('line-through', 'decoration-black', 'decoration-solid', 'bg-[#f2f8ff]')
        checkBox.nextElementSibling.classList.remove('opacity-70')
    }
    countOfTasksFnc(countOfTasks)
    countOfCompletedFnc(countOfCompleted)
    progressFnc()
})

tmmrwToDoUl.addEventListener('click', (e)=>{
    let checkBox = null
    if (e.target.getAttribute('type') == 'checkbox'){
        checkBox = e.target
        checkBox.classList.toggle('checked')
    } else{
        return false
    }
    if (checkBox.classList.contains('checked')){
        e.target.parentElement.parentElement.remove()
    } else{
        return false
    }
    countOfTmmrwTasksFnc(countOfTmmrwTasks)
})

///////////////////// functions

function closeModulFnc() {
    backdropDivPage.classList.add('hidden');
    backdropDivPage.classList.remove('flex');
    document.documentElement.classList.remove('overflow-y-hidden' , 'h-screen')
    body.classList.remove('overflow-y-hidden', 'h-screen')
    inputNamePage.classList.remove('shakeInput')
    inputNamePage.style.border = 'none'
    inputNamePage.value = ''
}

function closeToDoModulFnc() {
    backdropDivTodo.classList.add('hidden');
    backdropDivTodo.classList.remove('flex');
    document.documentElement.classList.remove('overflow-y-hidden' , 'h-screen')
    body.classList.remove('overflow-y-hidden', 'h-screen')
    inputNewToDo.classList.remove('shakeInput')
    inputNewToDo.style.border = 'none'
    inputNewToDo.value = ''
}

function closeTmmrwToDoModulBoxFnc() {
    backdropDivTmmrwTodo.classList.add('hidden');
    backdropDivTmmrwTodo.classList.remove('flex');
    document.documentElement.classList.remove('overflow-y-hidden' , 'h-screen')
    body.classList.remove('overflow-y-hidden', 'h-screen')
    inputTmmrwNewToDo.classList.remove('shakeInput')
    inputTmmrwNewToDo.style.border = 'none'
    inputTmmrwNewToDo.value = ''
}

// add new li fncs

function addNewLiFnc(){
    let newLi = document.createElement('li')
    newLi.innerHTML = inputNamePage.value
    newLi.classList.add('lg:w-full', 'mr-3', 'w-auto', 'opacity-80', 'sm:mr-2', 'lg:border-none', 'lg:rounded-none', 'py-2', 'rounded-xl', 'border', 'border-solid', 'border-borderGray', 'px-3', 'w-full', 'hover:bg-white', 'cursor-pointer', 'transition-all', 'duration-300', 'pageElem');
    ulPages.append(newLi)
    inputNamePage.style.border = 'none'
    inputNamePage.value = ''
}



function pageLiFnc(){
    let items = document.querySelectorAll('.pageElem')
    items.forEach((item)=>{
        item.addEventListener('click', (e)=>{
            items.forEach((li)=>{
                li.classList.remove('activeli', 'opacity-100')
                li.classList.add('opacity-80')
            })
            e.target.classList.remove('opacity-80')
            e.target.classList.add('activeli' , 'opacity-100')
        })
    })
}


function addNewLiTodoFnc(){
    let newDiv = document.createElement('div')
    newDiv.classList.add('b-input')
    let newSpan = document.createElement('span')
    newSpan.classList.add('text-grayText', 'font-semibold', 'text-base')
    let newLabel = document.createElement('label')
    newLabel.classList.add('b-contain')
    let checkBox = document.createElement('input')
    checkBox.setAttribute('type', 'checkbox')
    checkBox.classList.add('cursor-pointer', 'mr-2')
    let newLi = document.createElement('li')
    newSpan.innerHTML = inputNewToDo.value
    newLi.classList.add('w-full' ,'bg-lightBlue' ,'rounded-md' ,'shadow-custom4Li' ,'px-3' ,'py-2' ,'flex' , 'flex-row-reverse', 'justify-end' ,'items-center', `liElem`);
    newLabel.append(checkBox, newSpan, newDiv)
    newLi.append(newLabel)
    toDoUl.append(newLi)
    inputNewToDo.style.border = 'none'
    inputNewToDo.value = ''
}


function addNewToDoTmmrwLiFnc(){
    let newDiv = document.createElement('div')
    newDiv.classList.add('b-input')
    let newSpan = document.createElement('span')
    newSpan.classList.add('text-grayText', 'font-semibold', 'text-base')
    let newLabel = document.createElement('label')
    newLabel.classList.add('b-contain')
    let checkBox = document.createElement('input')
    checkBox.setAttribute('type', 'checkbox')
    checkBox.classList.add('cursor-pointer', 'mr-2')
    let newLi = document.createElement('li')
    newSpan.innerHTML = inputTmmrwNewToDo.value
    newLi.classList.add('w-full' ,'bg-lightBlue' ,'rounded-md' ,'shadow-custom4Li' ,'px-3' ,'py-2' ,'flex' , 'flex-row-reverse', 'justify-end' ,'items-center', 'tmmrwLi');
    newLabel.append(checkBox, newSpan, newDiv)
    newLi.append(newLabel)
    tmmrwToDoUl.append(newLi)
    inputTmmrwNewToDo.style.border = 'none'
    inputTmmrwNewToDo.value = ''
}

function countOfTasksFnc(elem){
    elem.innerHTML = `${document.querySelectorAll(`.liElem`).length} Tasks`
}

function countOfCompletedFnc(elem){
    elem.innerHTML = `${document.querySelectorAll('.checked').length} Tasks`
}

function countOfTmmrwTasksFnc(elem){
    elem.innerHTML = `${document.querySelectorAll('.tmmrwLi').length} Tasks`
}

function timeOutForAni(elem){
    setTimeout(() =>{
        elem.classList.remove('shakeInput')
    }, 2000)
}

function progressFnc(){
    let progressNum = Math.floor((completedUl.childElementCount / (completedUl.childElementCount + toDoUl.childElementCount)) * 100)
    progressPer.innerHTML = `${progressNum} %`
    progressBg.style.width = `${progressNum}%`

}



window.addEventListener('load', () =>{
    let date = new Date()
    dayElem.innerHTML = days[date.getDay()]
    timeElem.innerHTML =`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
})

