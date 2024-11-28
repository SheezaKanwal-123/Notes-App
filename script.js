
let Notes = document.querySelector(".notes-newnotes");
let Notescontainer = document.querySelector(".form-container");

function showpopup(){
    return ` <div class="form">
    <div class="form-container">
        <div class="header">
            <h3>Add Notes</h3>
        
            <div class="close-icon" onclick="closepopup()">
                <i class="fa-solid fa-xmark"></i>
            </div>
            
        </div>
        <div class="form-main">
            <label for="title" class="label">Title</label>
            <input type="text" name="" id="title" class="field" placeholder="title">

        </div>
        <div class="form-maingrp">
            <label for="Category" class="label">Category</label>
            <input type="text" name="" id="Category" class="field" placeholder="Category">

        </div>
        <div class="form-maingrp">
            <label for="Description" class="label">Description</label>
            <textarea name="" rows="8" id="Description" class="field">Description</textarea>

        </div>
        <button class="form-button">Add Notes</button>
    </div>`;
}


Notes.addEventListener("click",()=>addNotes());
function addNotes(){
    document.body.insertAdjacentHTML("beforeend",showpopup())
}

function closepopup() {
    let formElement = document.querySelector(".form");
    if (formElement) {
        formElement.remove();
    }
}


