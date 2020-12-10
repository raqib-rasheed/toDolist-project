window.addEventListener('load',addExistingElements);

const add = document.querySelector(".add-btn");
const clearAll = document.querySelector(".btn-clearAll");
const container = document.querySelector('.list-containerr');
const input = document.querySelector('input');
const popupMsg = document.querySelector(".pop-up");
const addEditBtn = document.querySelector(".btn-success");
let listButtons;
let myStorage = window.localStorage;

function popMsg(){
  popupMsg.innerText='failed to add';
  window.setTimeout(()=>clearText(popupMsg),1500);
}
function clearText(content){
  content.innerText?content.innerText="":content.value="";
}
function removeAll(){
  container.innerHTML="";
  myStorage.clear();
}

function addItem(){
  let value = input.value;
  if(input.value){
    myStorage.setItem(value,Math.round(Math.random()*10));
      container.innerHTML+=
      `<div class="row d-flex justify-content-around">
      <li class="list-group-item"><span>${value}</span>
      <i class="delete-btn list-btn fas fa-trash-alt "></i>
      <i class="edit-btn list-btn far fa-edit btn"></i>
      </li>
      </div>`;
      clearText(input);
    }else{   
      popMsg();
    }
  }
function editItem(e){
  console.log(e)
  let text;
  try{
    if(e.path[0].classList.contains("delete-btn")){
      text=e.path[1].childNodes[0].innerText;
      e.path[2].innerHTML='';
      myStorage.removeItem(text);
      return;
    }else{
      addEditBtn.classList.remove("hide");
      input.value=e.path[1].innerText;
      addEditBtn.addEventListener('click',()=>{
        input.value.length>0?e.path[1].childNodes[0].innerText=input.value:popMsg();
        myStorage.setItem(text, input.value);
        addEditBtn.classList.add("hide");
        return clearText(input);
      });
    } 
  }catch{
  return;
}
return add.addEventListener('click',addItem);
}

function addExistingElements(){
  let myStorageItems=Object.keys(myStorage);
  for(let val of myStorageItems){
  container.innerHTML+=
  `<div class="row d-flex justify-content-around">
  <li class="list-group-item"><span>${val}</span>
  <i class="delete-btn list-btn fas fa-trash-alt "></i>
  <i class="edit-btn list-btn far fa-edit btn"></i>
  </li>
  </div>`;
  }
}
add.addEventListener('click',addItem);
clearAll.addEventListener('click',removeAll);
container.addEventListener('click',editItem);