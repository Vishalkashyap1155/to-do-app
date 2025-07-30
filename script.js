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
    taskCounting();
}

function showdata(){
    listContainer.innerHTML = localStorage.getItem("data");
}





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


function taskCounting(){
    let totalPending = listContainer.querySelectorAll("li:not(.checked)").length;

    document.querySelector("#taskCount").innerHTML = totalPending === 0 ? "No Task Pending" :   `${totalPending} pending`

}


showdata();


listContainer.addEventListener("dblclick", (e)=>{
    if(e.target.tagName = "LI"){
        let oldTax = e.target.firstChild.nodeValue.trim();

        let newText = prompt("Edit Your Text:", oldTax);

             if (newText !== null && newText.trim() !== "") {
            e.target.firstChild.nodeValue = newText.trim();
            savedata(); // localStorage update karo
            updateCount(); // pending count refresh
        }
      }
})


const filterButtons = document.querySelectorAll('.filters button');

filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter; // all, active, completed

        const tasks = listContainer.querySelectorAll('li');
        tasks.forEach((task) => {
            if (filter === 'all') {
                task.style.display = '';
            } else if (filter === 'active') {
                task.style.display = task.classList.contains('checked') ? 'none' : '';
            } else if (filter === 'completed') {
                task.style.display = task.classList.contains('checked') ? '' : 'none';
            }
        });
    });
});
