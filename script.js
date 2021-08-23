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
            <div class="check-mark">
                <img src="assets/icon-check.svg" alt="">
            </div>
        </div>
        <div class="todo-text">
           ${item.text}
        </div>
    </div>
        `
    })
    document.querySelector(".todo-items").innerHTML=itemsHTML
}
getItems()