// date and day
const date = document.getElementById('date');
options = {weekday: "long", month: "short", day: "numeric"};
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);



var list =document.getElementById("list_item")


firebase.database().ref("todo").on('child_added',function(data){

var li =document.createElement("li")
var text=document.createTextNode(data.val().value);
li.appendChild(text)

var delbtn=document.createElement("button");
var deltext= document.createTextNode("Done")
delbtn.setAttribute("class","delbutton")
delbtn.setAttribute("id",data.val().key)
delbtn.setAttribute("onclick","delete_item(this)")
delbtn.appendChild(deltext)



var editbtn = document.createElement("button")
var editText= document.createTextNode("Edit")
editbtn.setAttribute("class","edit")
editbtn.setAttribute("id",data.val().key)
editbtn.setAttribute("onclick","edit(this)")
editbtn.appendChild(editText)


	var checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
checkBox.setAttribute("class","check")
	li.appendChild(checkBox)
    
    
li.appendChild(editbtn)
li.appendChild(delbtn)

list.appendChild(li)


})

function input_text(){
var todo=document.getElementById("input")
var key= firebase.database().ref("todo").push().key

var item={
    value: todo.value,
    key:key
}

firebase.database().ref("todo").child(key).set(item)

todo.value=" "




}






function delete_item(b,key){
firebase.database().ref("todo").child(b.id).remove()
    b.parentNode.remove()
}

function deleteAll(){
    
    firebase.database().ref("todo").remove()
    list.innerHTML= ""
}

function edit(e){
    var val =prompt("Enter edit value",e.parentNode.firstChild.nodeValue)  
var edittodo = {
    value:val,
    key:e.id
}

firebase.database().ref("todo").child(e.id).set(edittodo)
e.parentNode.firstChild.nodeValue= val;

 }


