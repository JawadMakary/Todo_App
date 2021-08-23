const addItem=(event)=>{
    event.preventDefault() 
    let text=document.getElementById("todo_input")
    db.collection("todo-items").add({
        text:text.value,
        status:'active'
    })
    text.value=''
}