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
      
    })
}
getItems()