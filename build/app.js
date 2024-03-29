const $ = document
const containerDiv = $.querySelector('#container')
const body = $.body
const content = $.querySelector('#contentDiv')
const userName = $.querySelector('#userName')
const profilePic = $.querySelector('#profilePic')
const fileInput = $.querySelector('#fileInput')
const backdropDivProfPic = $.querySelector('#backdropDiv-ProfPic')
const svgPic = $.querySelector('#svgPic')
const modulBox = $.querySelector('#modul')
const toDoModul = $.querySelector('#toDoModul')
const tmmrwToDoModul = $.querySelector('#tmmrwToDoModul')
const backdropDivTodo = $.querySelector('#backdropDiv-toDo')
const backdropDivTmmrwTodo = $.querySelector('#backdropDiv-tmmrwTodo')
const applyNewToDo = $.querySelector('#applyNewToDo')
const applyTmmrwNewToDo = $.querySelector('#applyTmmrwNewToDo')
const closeToDoModulBoxBtn = $.querySelector('#closeToDoModulBoxBtn')
const closeTmmrwToDoModulBoxBtn = $.querySelector('#closeTmmrwToDoModulBoxBtn')
const inputNewToDo = $.querySelector('#inputNewToDo')
const inputTmmrwNewToDo = $.querySelector('#inputTmmrwNewToDo')
const home = $.querySelector('#home')
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayElem = $.querySelector('#dayElem')
const timeElem = $.querySelector('#timeElem')
const addNewTodoBtn = $.querySelector('#addNewTodoBtn')
const addNewToDoTmmrwBtn = $.querySelector('#addNewTodo4TmmrwBtn')
const toDoUl = $.querySelector('#toDoUl')
const tmmrwToDoUl = $.querySelector('#tmmrwToDoUl')
const completedUl = $.querySelector('#completedUl')
const countOfTasks = $.querySelector('#countOfTasks')
const countOfCompleted = $.querySelector('#countOfCompleted')
const countOfTmmrwTasks = $.querySelector('#countOfTmmrwTasks')
const progressPer = $.querySelector('#progressPer')
const progressBg = $.querySelector('#progressBg')



// --------------------------------------------------------------------------------- Day reset


const currentDay = new Date().getDate()
window.addEventListener('load', ()=>{
    if (localStorage.getItem('lastDay') !== currentDay.toString()){
        localStorage.removeItem('savedItemsLi')
        localStorage.removeItem('savedItemsCom')
    
        toDoUl.innerHTML = ''
        completedUl.innerHTML = ''
        tmmrwToDoUl.innerHTML = ''
    
        const tomorrowTodos = JSON.parse(localStorage.getItem('savedItemsTmmrw'))
        const todayTodos = JSON.parse(localStorage.getItem('saveItemsLi')) || []
        todayTodos.push(...tomorrowTodos)
    
        localStorage.setItem('savedItemsLi', JSON.stringify(todayTodos))
        localStorage.removeItem('savedItemsTmmrw')
        localStorage.setItem('lastDay', currentDay.toString())
    }
})


// --------------------------------------------------------------------------------------- Profile Photo Handler


profilePic.addEventListener('click', ()=>{
    fileInput.click()
})

fileInput.addEventListener('change', ()=>{
    const file = fileInput.files[0]
    if (file){
        const fileType = file.type
        if (fileType === 'image/jpeg' || fileType === 'image/png'){
            window.scrollTo(0,0)
            const reader = new FileReader()
            reader.onload = function (e){
            profilePic.src = e.target.result
            localStorage.setItem('profilePic', e.target.result)
        }
        reader.readAsDataURL(file)
        } else{
            window.scrollTo(0,0)
            backdropDivProfPic.classList.remove('hidden')
            backdropDivProfPic.classList.add('flex')
            fileInput.value = ''
            setTimeout(()=>{
                backdropDivProfPic.firstElementChild.classList.add('fadeOutUp')
                backdropDivProfPic.firstElementChild.classList.remove('fadeInDown')
            }, 3000)
            setTimeout(()=>{
                backdropDivProfPic.classList.add('hidden')
                backdropDivProfPic.classList.remove('flex')
            }, 3500)
            setTimeout(()=>{
                backdropDivProfPic.firstElementChild.classList.remove('fadeOutUp')
                backdropDivProfPic.firstElementChild.classList.add('fadeInDown')
            }, 3600)
        }
    }
})

profilePic.addEventListener('mouseover', () =>{
    svgPic.classList.add('block')
    svgPic.classList.remove('hidden')
})

profilePic.addEventListener('mouseout', () =>{
    svgPic.classList.remove('block')
    svgPic.classList.add('hidden')
})

svgPic.addEventListener('mouseover', () =>{
    profilePic.classList.add('brightness-75')
    svgPic.classList.add('block')
    svgPic.classList.remove('hidden')
})

svgPic.addEventListener('click', ()=>{
    fileInput.click()
    svgPic.classList.remove('block')
    svgPic.classList.add('hidden')
})

svgPic.addEventListener('mouseout', () =>{
    profilePic.classList.remove('brightness-75')
    svgPic.classList.remove('block')
    svgPic.classList.add('hidden')
})


// ---------------------------------------------------------------------------------------- UserName Handler


userName.textContent = userName.textContent.trim()

userName.addEventListener('mouseover', ()=>{
    userName.style.textDecoration = 'underline'
    userName.style.cursor = 'pointer'
})

userName.addEventListener('mouseout', ()=>{
    userName.style.textDecoration = 'none'
})

userName.addEventListener('click', ()=>{
    if (userName.innerHTML.trim().length < 11){
        userName.contentEditable = 'true'
        const range = $.createRange()
        const selection = window.getSelection()
        range.selectNodeContents(userName)
        range.collapse(false)
        selection.removeAllRanges()
        selection.addRange(range)
        userName.focus()
        userName.style.outline = 'none'
    } else {
        userName.innerHTML = 'Name'
    }
})

userName.addEventListener('blur', ()=>{
    localStorage.setItem('username', JSON.stringify(userName.textContent))
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


// --------------------------------------------------------------------------------------- modul and ToDo Handlers


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
    document.documentElement.classList.add('overflow-y-hidden')
    body.classList.add('overflow-y-hidden')
    setTimeout(()=>{
        inputTmmrwNewToDo.focus()
    },500)
})


applyNewToDo.addEventListener('click', () =>{
    if (inputNewToDo.value.trim()){     
        addNewLiTodoFnc(inputNewToDo.value)
        countOfTasksFnc(countOfTasks)  
        closeToDoModulFnc()
        progressFnc() 
    } else{
        inputNewToDo.style.border = '1px solid red'
        inputNewToDo.classList.add('shakeInput')
        
        inputNewToDo.addEventListener('keyup', () => borderFixerFnc(inputNewToDo))

        timeOutForAni(inputNewToDo)
    }
})

applyTmmrwNewToDo.addEventListener('click', () =>{
    if (inputTmmrwNewToDo.value.trim()){
        addNewToDoTmmrwLiFnc(inputTmmrwNewToDo.value)
        countOfTmmrwTasksFnc(countOfTmmrwTasks)  
        closeTmmrwToDoModulBoxFnc()
    } else{
        inputTmmrwNewToDo.style.border = '1px solid red'
        inputTmmrwNewToDo.classList.add('shakeInput')
        
        inputTmmrwNewToDo.addEventListener('keydown', () => borderFixerFnc(inputTmmrwNewToDo))

        timeOutForAni(inputTmmrwNewToDo)
    }
})


backdropDivTodo.addEventListener('click', (e) =>{
    if (e.target.id == 'backdropDiv-toDo'){
        closeToDoModulFnc()
    }
})

backdropDivTmmrwTodo.addEventListener('click', (e) =>{
    if (e.target.id == 'backdropDiv-tmmrwTodo'){
        closeTmmrwToDoModulBoxFnc()
    }
})


inputNewToDo.addEventListener('keyup', (e) =>{
    if (e.keyCode == 13){
        addNewLiTodoFnc(inputNewToDo.value)
        closeToDoModulFnc()
        countOfTasksFnc(countOfTasks)
        progressFnc()
    }
    if (e.keyCode == 27){
        closeToDoModulFnc()
    }
})

inputTmmrwNewToDo.addEventListener('keyup', (e) =>{
    if (e.keyCode == 13){
        addNewToDoTmmrwLiFnc(inputTmmrwNewToDo.value)
        closeTmmrwToDoModulBoxFnc()
        countOfTmmrwTasksFnc(countOfTmmrwTasks)
    }
    if (e.keyCode == 27){
        closeTmmrwToDoModulBoxFnc()
    }
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
        checkBox.parentElement.parentElement.classList.remove('liElem', 'bg-lightBlue', 'hover:bg-[#e4efff]')
        checkBox.parentElement.parentElement.classList.add('line-through', 'decoration-black', 'decoration-solid', 'bg-[#f2f8ff]', 'completed')
        checkBox.nextElementSibling.classList.add('opacity-70')
    }
    countOfTasksFnc(countOfTasks)
    countOfCompletedFnc(countOfCompleted)
    progressFnc()
    localSaveComFnc()
    localSaveLiFnc()
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
        checkBox.parentElement.parentElement.classList.add('liElem', 'bg-lightBlue', 'hover:bg-[#e4efff]')
        checkBox.parentElement.parentElement.classList.remove('line-through', 'decoration-black', 'decoration-solid', 'bg-[#f2f8ff]', 'completed')
        checkBox.nextElementSibling.classList.remove('opacity-70')
    }
    countOfTasksFnc(countOfTasks)
    countOfCompletedFnc(countOfCompleted)
    progressFnc()
    localSaveComFnc()
    localSaveLiFnc()
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
        let textOfElem = e.target.nextElementSibling.textContent
        localRemover(textOfElem, 'savedItemsTmmrw')
        e.target.parentElement.parentElement.remove()
    } else{
        return false
    }
    countOfTmmrwTasksFnc(countOfTmmrwTasks)
})


//------------------------------------------------------- functions --------------------------------------------------------//


function localRemover(item , storeName){
        let arraySavedItems = Array.from(JSON.parse(localStorage.getItem(storeName)))
        if (arraySavedItems){
            let indexLi = arraySavedItems.findIndex((e)=>{
                return e == item
            })
            arraySavedItems.splice(indexLi, 1)
            localStorage.setItem(storeName, JSON.stringify(arraySavedItems))
        }
}


// --------------------------------------------- Close Modal Fncs


function closeToDoModulFnc() {
    backdropDivTodo.classList.add('hidden');
    backdropDivTodo.classList.remove('flex');
    document.documentElement.classList.remove('overflow-y-hidden' , 'h-screen')
    body.classList.remove('overflow-y-hidden', 'h-screen')
    inputNewToDo.classList.remove('shakeInput')
    inputNewToDo.value = ''
    borderFixerFnc(inputNewToDo)
}

function closeTmmrwToDoModulBoxFnc() {
    backdropDivTmmrwTodo.classList.add('hidden');
    backdropDivTmmrwTodo.classList.remove('flex');
    document.documentElement.classList.remove('overflow-y-hidden')
    body.classList.remove('overflow-y-hidden')
    inputTmmrwNewToDo.classList.remove('shakeInput')
    inputTmmrwNewToDo.value = ''
    borderFixerFnc(inputTmmrwNewToDo)
}


// --------------------------------------------- Add New Li Fncs


function addNewLiFnc(){
    let newLi = document.createElement('li')
    newLi.innerHTML = inputNamePage.value
    newLi.classList.add('lg:w-full', 'mr-3', 'w-auto', 'opacity-80', 'sm:mr-2', 'lg:border-none', 'lg:rounded-none', 'py-2', 'rounded-xl', 'border', 'border-solid', 'border-borderGray', 'px-3', 'w-full', 'hover:bg-white', 'cursor-pointer', 'transition-all', 'duration-300', 'pageElem');
    ulPages.append(newLi)
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

function addNewLiTodoFnc(content){
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
    newSpan.innerHTML = content
    newLi.classList.add('min-h-10', 'h-auto', 'relative', 'w-full' ,'bg-lightBlue' ,'rounded-md' ,'shadow-custom4Li' ,'pr-8' , 'px-3' ,'py-2' ,'flex' , 'flex-row-reverse', 'justify-end' ,'items-center', `liElem`, 'transition-all', 'duration-300', 'hover:bg-[#e4efff]', 'ease-[cubic-bezier(0,0.55,0.45,1)]');
    newLabel.append(checkBox, newSpan, newDiv)
    newLi.setAttribute('title', 'Click for edit')
    let newSvgDiv = $.createElement('div')
    newSvgDiv.innerHTML = `<svg viewBox="0 0 24 24" fill="none" class="w-full h-full">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#FF4763" stroke-width="1.128" stroke-linecap="round" stroke-linejoin="round">
            </path>
        </g></svg>`
    newSvgDiv.classList.add('w-6', 'h-6', 'absolute', 'right-2', 'cursor-pointer', 'hidden')
    newSpan.setAttribute('spellcheck', 'false')

    if (content.length > 9){
        newSpan.style.fontSize = '13px'
    } else {
        newSpan.style.fontSize = '16px'
    }

    newLi.appendChild(newSvgDiv)
    newLi.append(newLabel)
    toDoUl.append(newLi)

    inputNewToDo.value = ''

    localSaveLiFnc()
    deleteSvgDivFnc(newSvgDiv)
    editTodoFnc(newLi, newSpan)

    newLi.addEventListener('mouseover', ()=>{
        newSvgDiv.classList.remove('hidden')
        newSvgDiv.classList.add('block')
    })
    newLi.addEventListener('mouseout', ()=>{
        newSvgDiv.classList.add('hidden')
        newSvgDiv.classList.remove('block')
    })
}

function addNewToDoTmmrwLiFnc(content){
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
    newSpan.innerHTML = content
    newLi.classList.add('w-full' ,'bg-lightBlue' ,'rounded-md' ,'shadow-custom4Li' ,'px-3' ,'py-2' ,'flex' , 'flex-row-reverse', 'justify-end' ,'items-center', 'tmmrwLi');
    newLabel.append(checkBox, newSpan, newDiv)
    newLi.append(newLabel)
    tmmrwToDoUl.append(newLi)

    inputTmmrwNewToDo.value = ''

    localSaveTmmrwFnc()
}


// --------------------------------------------- Border Input Fixer Fnc


function borderFixerFnc(elem){
    elem.style.border = '1px solid #e4e4e4'
}


// --------------------------------------------- Count Of Tasks Fncs


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


// --------------------------------------------- Progress Fnc


function progressFnc(){
        let progressNum = Math.floor((completedUl.childElementCount / (completedUl.childElementCount + toDoUl.childElementCount)) * 100)
        progressPer.innerHTML = `${progressNum} %`
        progressBg.style.width = `${progressNum}%`
}


// --------------------------------------------- delet Li Fnc


function deleteSvgDivFnc(svg){
    svg.addEventListener('click', (ev)=>{
        if (ev.target.nodeName == 'svg'){
            const textOfElem = ev.target.parentElement.parentElement.textContent.trim()
            const ul = ev.target.parentElement.parentElement.parentElement
            if (ul.getAttribute('id') == 'toDoUl'){
                localRemover(textOfElem, 'savedItemsLi')
                ev.target.parentElement.parentElement.remove()
                countOfTasksFnc(countOfTasks)
                countOfCompletedFnc(countOfCompleted)
              if (isNaN(completedUl.childElementCount / (completedUl.childElementCount + toDoUl.childElementCount))){
                progressPer.innerHTML = `${0} %`
                progressBg.style.width = 0
              } else{
                progressFnc()
              }
            } else if (ul.getAttribute('id') == 'completedUl'){
                localRemover(textOfElem, 'savedItemsCom')
                ev.target.parentElement.parentElement.remove()
                countOfTasksFnc(countOfTasks)
                countOfCompletedFnc(countOfCompleted)
              if (isNaN(completedUl.childElementCount / (completedUl.childElementCount + toDoUl.childElementCount))){
                progressPer.innerHTML = `${0} %`
                progressBg.style.width = 0
              } else{
                progressFnc()
              }
            }
        }

        if (ev.target.nodeName == 'path'){
            const textOfElem = ev.target.parentElement.parentElement.parentElement.parentElement.textContent.trim()
            const ul = ev.target.parentElement.parentElement.parentElement.parentElement.parentElement
            if (ul.getAttribute('id') == 'toDoUl'){
                localRemover(textOfElem, 'savedItemsLi')
                ev.target.parentElement.parentElement.parentElement.parentElement.remove()
                countOfTasksFnc(countOfTasks)
                countOfCompletedFnc(countOfCompleted)
              if (isNaN(completedUl.childElementCount / (completedUl.childElementCount + toDoUl.childElementCount))){
                progressPer.innerHTML = `${0} %`
                progressBg.style.width = 0
              } else{
                progressFnc()
              }
            } else if (ul.getAttribute('id') == 'completedUl'){
                localRemover(textOfElem, 'savedItemsCom')
                ev.target.parentElement.parentElement.parentElement.parentElement.remove()
                countOfTasksFnc(countOfTasks)
                countOfCompletedFnc(countOfCompleted)
              if (isNaN(completedUl.childElementCount / (completedUl.childElementCount + toDoUl.childElementCount))){
                progressPer.innerHTML = `${0} %`
                progressBg.style.width = 0
              } else{
                progressFnc()
              }
            }
        }
    })
}


// --------------------------------------------------------- Edit Li Fnc


function editTodoFnc(elem, spanElem){
    elem.addEventListener('click', (e)=>{
        if (e.target.nodeName === 'LI' && e.target.parentElement.id == 'toDoUl'){
            spanElem.contentEditable = 'true'
            const range = $.createRange()
            const selection = window.getSelection()
            range.selectNodeContents(spanElem)
            range.collapse(false)
            selection.removeAllRanges()
            selection.addRange(range)
            spanElem.focus()
            spanElem.style.outline = 'none'
            spanElem.addEventListener('blur', ()=>{
                if (spanElem){
                    if (spanElem.innerHTML == ''){
                        spanElem.innerHTML = 'To Do'
                        localSaveLiFnc()
                    } else {
                        localSaveLiFnc()
                    }
                }
            })
            spanElem.addEventListener('keyup', ()=>{
                if (spanElem.textContent.length > 9){
                    spanElem.style.fontSize = '13px'
                } else {
                    spanElem.style.fontSize = '16px'
                }
            })
        }
    })
}


// --------------------------------------------------------- window Load and localSver Fncs


window.addEventListener('load', () =>{
    let date = new Date()
    dayElem.innerHTML = days[date.getDay()]
    timeElem.innerHTML =`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
})


function localSaveLiFnc(){
    let liElements = document.querySelectorAll('.liElem')
    const items = Array.from(liElements).map(item => item.textContent.trim())
    localStorage.setItem('savedItemsLi', JSON.stringify(items))
}

function localSaveComFnc(){
    let completedElements = document.querySelectorAll('.completed')
    const items = Array.from(completedElements).map(item => item.textContent.trim())
    localStorage.setItem('savedItemsCom', JSON.stringify(items))
}

function localSaveTmmrwFnc(){
    let liTmmrwElements = document.querySelectorAll('.tmmrwLi')
    const items = Array.from(liTmmrwElements).map(item => item.textContent.trim())
    localStorage.setItem('savedItemsTmmrw', JSON.stringify(items))
}


window.addEventListener('load', ()=>{

    $.querySelector("#loading-container").style.display = "none"
    containerDiv.style.display = 'flex'

    let userContent = JSON.parse(localStorage.getItem('username'))
    if (userContent){
        userName.innerHTML = userContent
    }

    let savedProfilePic = localStorage.getItem('profilePic')
    if (savedProfilePic){
        profilePic.src = savedProfilePic
    }

    let savedItemsLi = JSON.parse(localStorage.getItem('savedItemsLi'))
    if (savedItemsLi){
        savedItemsLi.forEach((li) =>{
            addNewLiTodoFnc(li)
        })
    }

    let savedItemsTmmrw = JSON.parse(localStorage.getItem('savedItemsTmmrw'))
    if (savedItemsTmmrw){
        savedItemsTmmrw.forEach((li) =>{
            addNewToDoTmmrwLiFnc(li)
        })
    }

    let savedItemsCom = JSON.parse(localStorage.getItem('savedItemsCom'))
    if (savedItemsCom){
        savedItemsCom.forEach((li)=>{
            let newDiv = document.createElement('div')
            newDiv.classList.add('b-input')
            let newSpan = document.createElement('span')
            newSpan.classList.add('text-grayText', 'font-semibold', 'text-base', 'opacity-70')
            let newLabel = document.createElement('label')
            newLabel.classList.add('b-contain')
            let checkBox = document.createElement('input')
            checkBox.setAttribute('type', 'checkbox')
            checkBox.setAttribute('checked', 'true')
            checkBox.classList.add('cursor-pointer', 'mr-2', 'checked')
            let newLi = document.createElement('li')
            newSpan.innerHTML = li
            newLi.classList.add('relative', 'w-full' ,'rounded-md' ,'shadow-custom4Li' ,'px-3' ,'py-2' ,'flex' , 'flex-row-reverse', 'justify-end' ,'items-center', 'line-through', 'decoration-black', 'decoration-solid', 'bg-[#f2f8ff]', 'completed');
            newLabel.append(checkBox, newSpan, newDiv)
            newLi.append(newLabel)
            
            let newSvgDiv = $.createElement('div')
            newSvgDiv.innerHTML = `<svg viewBox="0 0 24 24" fill="none" class="w-full h-full">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#e84f4f" stroke-width="1.128" stroke-linecap="round" stroke-linejoin="round">
                    </path>
                </g></svg>`
            newSvgDiv.classList.add('w-6', 'h-6', 'absolute', 'right-2', 'cursor-pointer', 'hidden')
            newLi.appendChild(newSvgDiv)
            deleteSvgDivFnc(newSvgDiv)
    
            newLi.addEventListener('mouseover', ()=>{
                newSvgDiv.classList.remove('hidden')
                newSvgDiv.classList.add('block')
            })
            newLi.addEventListener('mouseout', ()=>{
                newSvgDiv.classList.add('hidden')
                newSvgDiv.classList.remove('block')
            })

            completedUl.append(newLi)
        })
    }

    if (userName.innerHTML.trim().length > 7){
        userName.classList.add('sm:text-base')
        userName.classList.remove('sm:text-xl')
    } else{
        userName.classList.remove('sm:text-base')
        userName.classList.add('sm:text-xl')
    }

    countOfTmmrwTasksFnc(countOfTmmrwTasks)
    countOfCompletedFnc(countOfCompleted)
    countOfTasksFnc(countOfTasks)
    if (!isNaN(completedUl.childElementCount / (completedUl.childElementCount + toDoUl.childElementCount))){
        progressFnc()
    }

})


