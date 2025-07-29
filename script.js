let btn = document.getElementById("btn");
let listContainer = document.querySelector(".listContainer");

function clickBtn(){

    let input = document.querySelector("#input");

    if(input.value == ""){
        alert("Enter your text first")
    }else{
        
    let li = document.createElement("LI")

    li.innerHTML = input.value;

    listContainer.appendChild(li);

    input.value = "";

    let span = document.createElement("SPAN");

    span.innerHTML = "x"
    li.appendChild(span)
    
    }

    savedata();

}

listContainer.addEventListener("click" ,(e)=>{


    if(e.target.tagName == "LI"){
       e.target.classList.toggle("checked")
    }

    
    if(e.target.tagName == "SPAN"){
       e.target.parentElement.remove()
    }
    savedata()

})

function savedata(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showdata(){
    listContainer.innerHTML = localStorage.getItem("data")
}

showdata();


document.getElementById("input").addEventListener("keydown", (e)=>{
    if(e.key == "Enter"){
        clickBtn();
    }
})


document.getElementById("clearAll").addEventListener("click", (e)=>{
    if(listContainer.children.length === 0){
        alert("Not any task for clean");
        return;
    }

    if(confirm("All Task will be clean")){
        listContainer.innerHTML = "";
        savedata();
    }
})