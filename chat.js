function add_user(){
 userName = document.getElementById("user_name").value;
 localStorage.setItem("name", userName);
 window.location = "chat_room.html";
}