const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');


let editElement;
let editflag=false;
let editId ="";

form.addEventListener('submit',addItem);
clearBtn.addEventListener('click',clearItems);



function addItem(e){
e.preventDefault();
const value = grocery.value;
const id = new Date().getTime().toString();
if(value && !editflag){
  const element = document.createElement('article');
  element.classList.add("grocery-item");
  const attr = document.createAttribute('data-id');
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML=`<p class="title">${value}</p>
  <div class="btn-container">
    <!-- edit btn -->
    <button type="button" class="edit-btn">
      <i class="fas fa-edit"></i>
    </button>
    <!-- delete btn -->
    <button type="button" class="delete-btn">
      <i class="fas fa-trash"></i>
    </button>
  </div>
`;
const deleteBtn = element.querySelector(".delete-btn");
const editBtn = element.querySelector(".edit-btn");
deleteBtn.addEventListener('click',deleteItem);
editBtn.addEventListener('click',editItem);
list.appendChild(element);
displayAlert("Item added to list","success");
container.classList.add("show-container");
addToLocalStorage(id,value);
setBackToDefault();
}else if(value && editflag){

}else{
  displayAlert("please enter value","danger");
  }
}
function displayAlert(str,action){
  alert.textContent = str;
  alert.classList.add(`alert-${action}`);
  setTimeout(()=>{
    alert.textContent="";
    alert.classList.remove(`alert-${action}`);
  },1500);
}
function clearItems(){
  const items = document.querySelectorAll(".grocery-item");

  if(items.length>0){
    list.forEach(item => {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty list","danger");
  localStorage.removeItem("list");
  setBackToDefault();
}
function deleteItem(){
console.log("aaaaaaa");
}
function editItem(){
  console.log("bbbbbb");
}
function setBackToDefault(){
  grocery.value = "";
  editflag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

function addToLocalStorage(id,value){
  console.log("added");
}

