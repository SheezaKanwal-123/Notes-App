
let Notes = document.querySelector(".notes-newnotes");
let Notescontainer = document.querySelector(".notes-container");

function showpopup(title,desc,category,state){
   
    return ` <div class="form">
    <div class="form-container">
        <div class="header">
            <h3>${state==="add" ? "add new Notes":"update"}</h3>
        
            <div class="close-icon" onclick="closepopup()">
                <i class="fa-solid fa-xmark"></i>
            </div>
            
        </div>
        <div class="form-main">
            <label for="title" class="label">Title</label>
            <input type="text" name="" id="title" class="field" placeholder="title" value="${title}">

        </div>
        <div class="form-maingrp">
            <label for="Category" class="label">Category</label>
            <input type="text" name="" id="Category" class="field" placeholder="Category" value="${category}" >

        </div>
        <div class="form-maingrp">
            <label for="Description" class="label">Description</label>
            <textarea name="" rows="8" id="Description" class="field">${desc}</textarea>

        </div>
        <button class="form-button" data-state="${state}">${state} Notes</button>
    </div>`;
}

function notesitem(id,title,desc,category,date){
    return ` <div class="notes-item" date-id="${id}">
                    <div  class="notes-item-title">
                      <h1>${title} </h1>
                      <hr>
                    </div>
                    <div class="notes-item-description">
                        <p>${desc}</p>   
            </div>
             <div  class="notes-item-category">
                    <hr>
                    
                    <h3>${category} </h3>
                    
                  </div>
            
            <div class="notes-item-description-edit">
                <div class="notes-item-description-edit-date">${date}</div>
              <div class="notes-item-description-edit-icon" onclick="this.classList.toggle('show-popup')">
                 <button><i class="fa-solid fa-ellipsis-vertical"></i></button>
                 <div class="notes-item-description-edit-popup">
                    <ul class="notes-item-description-edit-popup-list">
                        <li class="notes-item-description-edit-popup-list-item" onclick="updatenotes(${id},'${title}','${desc}','${category}')">
                            <i class="fa-solid fa-pen-to-square"></i>
                            <p>Edit</p>
                        </li>
                        <li class="notes-item-description-edit-popup-list-item" onclick="deletenotes(${id})">
                            <i class="fa-solid fa-trash"></i>
                            <p>Delete</p>

                        </li> 
                                                                        
                    </ul>

                 </div>
              </div>
            </div>
        </div>`;
    
}




Notes.addEventListener("click",()=>addNotes());
function addNotes(){
    document.body.insertAdjacentHTML("beforeend",showpopup("title","description","category","add"));
  let addbtn=document.querySelector(".form-button[data-state=add]");
  let title=document.querySelector("#title");
  let desc=document.querySelector("#Description"); 
  let category= document.querySelector("#Category"); 
 let notes=getfromlocalstorage();
//  console.log(notes);
addbtn.addEventListener("click", () =>{
    let note={
        id:new Date().getTime(),
        title:title.value,
        category:Category.value,
        desc:desc.value,
        date: new Date().toLocaleString()
    };
//    console.log(note.date);
notes.push(note);
setIntolocalstorage(notes);
rendernotes();
closepopup();
renderAddButton();
});
 
}

function setIntolocalstorage(notes){
    localStorage.setItem("notes",JSON.stringify(notes));

}

function getfromlocalstorage() {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
}
function rendernotes(){
    document.querySelectorAll(".notes-item").forEach(note => note.remove())
    getfromlocalstorage().forEach(note =>{
        let {id,title,desc,category,date}=note;
        Notescontainer.insertAdjacentHTML("afterbegin", notesitem(id,title,desc,category,date))
    })
}
let searchInput = document.querySelector("#search");
let categoryFilter = document.querySelector("#categoryFilter");

// Event listeners to trigger re-rendering when search or category changes
searchInput.addEventListener("input", () => {
    let searchQuery = searchInput.value;
    let filterCategory = categoryFilter.value;
    rendernotes(searchQuery, filterCategory);
});

categoryFilter.addEventListener("change", () => {
    let searchQuery = searchInput.value;
    let filterCategory = categoryFilter.value;
    rendernotes(searchQuery, filterCategory);
});

// Render notes function with search and category filter applied
function rendernotes(searchQuery = "", filterCategory = "") {
    Notescontainer.innerHTML = "";
    let notes = getfromlocalstorage();
    let filteredNotes = notes.filter(note =>
        (note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
         note.desc.toLowerCase().includes(searchQuery.toLowerCase())) && 
        (filterCategory ? note.category === filterCategory : true)
    );

    if (filteredNotes.length === 0) {
        Notescontainer.insertAdjacentHTML("afterbegin", "<p>No notes available</p>");
    }

    filteredNotes.forEach(note => {
        let { id, title, desc, category, date } = note;
        Notescontainer.insertAdjacentHTML("afterbegin", notesitem(id, title, desc, category, date));
    });
}

function renderAddButton() {
  
    if (!document.querySelector(".notes-newnotes")) {
       
        let notesContainer = document.querySelector(".notes-container");
        notesContainer.insertAdjacentHTML("beforeend", '<button class="notes-newnotes"><h1>Add Notes</h1></button>');
        
    
        document.querySelector(".notes-newnotes").addEventListener("click", () => addNotes());
    }
}


renderAddButton();


function closepopup() {
    let formElement = document.querySelector(".form");
    if (formElement) {
        formElement.remove();
    }
}

function updatenotes(id,Title,desc,categ){
    // console.log(id,title,desc,category);
    document.body.insertAdjacentHTML("beforeend",showpopup(Title,desc,categ,"update"));
    let updatebtn=document.querySelector(".form-button[data-state=update]");
    let title=document.querySelector("#title");
    let Description=document.querySelector("#Description"); 
    let category= document.querySelector("#Category"); 
let notes = getfromlocalstorage();
updatebtn.addEventListener("click", ()=>{

    notes.forEach(note =>{
        if(note.id===id){
            note.title=title.value;
            note.desc=Description.value;
            note.category=category.value;
            // console.log(note)
            setIntolocalstorage(notes);
            rendernotes();
            closepopup();
        };
    
    });
});
}


function deletenotes(id){
    if(confirm("sure to delete the Notes....?")){
        let notes=getfromlocalstorage();
        notes.forEach((note ,index) => {
            if(note.id===id){

                notes.splice(index,1)
                setIntolocalstorage(notes);
                rendernotes();
            }
        }
   ) }

}