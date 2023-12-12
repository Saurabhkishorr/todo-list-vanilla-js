const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let previousvalue = '';
let addtask = document.getElementById("addtask");
let Updatetask = document.getElementById("Updatetask");
let clearlistbtn = document.getElementById("clearlistbtn");


function addTask() {
    if (inputBox.value === ' ') {
        alert('you must write something');
    }
    else{
        
        const inputValue = inputBox.value.trim();
         
        const listItem = createListItem(inputValue);
        listContainer.appendChild(listItem);

        displayclearbtn();

       
    }
    inputBox.value = ' ';
    savedata() 
}




function createListItem(value) {
    const li = document.createElement("li");
    li.innerHTML = value;

    li.appendChild(createListItemButtons());
    return li;
}

listContainer.addEventListener("click",function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        savedata() 
    }
    else if (e.target.classList.contains("fa-trash-can")) {
        let listitem = e.target.closest("li");
        if (listitem) {
            listitem.remove();
            Undisplayclearbtn();
        }
        savedata() 
    }
    else if (e.target.classList.contains("fa-pen-to-square")) {
        let listitem = e.target.closest("li");
        if (listitem) {
            inputBox.value = listitem.textContent.trim();
            previousvalue = listitem.textContent.trim();
            addtask.style.display = "none";
            Updatetask.style.display = "block";
            listitem.firstElementChild.firstElementChild.firstElementChild.disabled = true;
        }
        
    }
}, false)


 function Update() {
    let list = document.getElementsByTagName("li");
    for (let i = 0; i < list.length; i++) {
        if (previousvalue === list[i].textContent.trim()) {
            list[i].textContent = inputBox.value.trim();
            addtask.style.display = "block";
            Updatetask.style.display = "none";
            list[i].appendChild(createListItemButtons())
        }
        
    }
    inputBox.value = ' ';
    savedata()

    setTimeout(function() {
        alert('list updated');
    }, 100);
}



function createListItemButtons() {
    const span = document.createElement("span");
    span.innerHTML = `
        <div>
            <button><i class="fa-regular fa-trash-can fa-xl" style="color: #020203;"></i></button>
            <button><i class="fa-solid fa-pen-to-square fa-xl" style="color: #020203;"></i></button>
        </div>
    `;
    return span;
}

function clearlist(){
    let listitem = listContainer.querySelectorAll('li');

    listitem.forEach(function(item) {
        item.remove();
        localStorage.clear();
        clearlistbtn.style.display = 'none';
    })
}

function displayclearbtn() {
    let listlength = listContainer.children.length;
    if (listlength>1) {
        clearlistbtn.style.display = 'block';
    }  
}

function Undisplayclearbtn() {
    let listlength = listContainer.children.length;
    if (listlength < 2) {
        clearlistbtn.style.display = 'none';
    }  
}

function savedata() {
    localStorage.setItem("data",listContainer.innerHTML);
}

function showtask() {
    listContainer.innerHTML = localStorage.getItem("data")
    
}

showtask();






