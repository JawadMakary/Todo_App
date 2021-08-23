const addItem=(event)=>{
    event.preventDefault() 
    let text=document.getElementById("todo_input")
    db.collection("todo-items").add({
        text:text.value,
        status:'active'
    })
    text.value=''
}
const getItems=()=>{
    db.collection("todo-items").onSnapshot((snapshot) => {
        let items = [];
      
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id, 
                ...doc.data()
            })
          

          
        })
        
        generateItems(items)
      
    })
}
const generateItems=(items)=>{
    let itemsHTML=''
    items.forEach((item)=>{
        itemsHTML += `
        <div class="todo-item">
        <div class="check">
            <div data-id="${item.id}" class="check-mark      ${item.status=='completed' ? 'checked':''}">
                <img src="assets/icon-check.svg" alt="">
            </div>
        </div>
        <div class="todo-text ${item.status=='completed' ? 'checked':''}">
           ${item.text}
        </div>
    </div>
        `
    })
    document.querySelector(".todo-items").innerHTML=itemsHTML
    createEventListeners()

}
const createEventListeners=()=>{
    let todoCheckMarks=document.querySelectorAll(".todo-item .check-mark")
    todoCheckMarks.forEach((checkMark)=>{
        checkMark.addEventListener('click',()=>{
            markCompleted(checkMark.dataset.id)
        })
    })
}
const markCompleted=(id)=>{
    let item=db.collection("todo-items").doc(id)
    item.get().then((doc)=>{
        if(doc.exists){
           let status=doc.data().status
           if(status=='active'){
               item.update({
                   status:'completed'
               })
           } else if(status=='completed'){
               item.update({
                   status:'active'
               })
           }
        }
    })
}

getItems()