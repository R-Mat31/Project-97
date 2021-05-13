var firebaseConfig = {
 apiKey : "AIzaSyBFG3L-uiFVk6Njv7kjqx7LELnCv_QCvt8",
 authDomain : "let-s-chat-8d7b1.firebaseapp.com",
 databaseURL : "https://let-s-chat-8d7b1.firebaseio.com",
 projectId : "let-s-chat-8d7b1",
 storageBucket : "let-s-chat-8d7b1.appspot.com",
 messagingSenderId : "356240475932",
 appId : "1:356240475932:web:2e0b205cb7ecf5a1701cd9"
};
firebase.initializeApp(firebaseConfig);
var userName = localStorage.getItem("name");
document.getElementById("User_Name").innerHTML = "Welcome " + userName + "!";
function add_room(){
 roomName = document.getElementById("roomname").value;
 localStorage.setItem("room_name", roomName);
 firebase.database().ref("/").child(roomName).update({
  Creator : userName   
 });
 window.location = "chat_page.html";
}
function getData(){
 firebase.database().ref("/").on('value', function(snapshot){
  document.getElementById("rooms").innerHTML = "";
  snapshot.forEach(function(childSnapshot){
   childKey = childSnapshot.key;
   Room_names = childKey;
   roomDiv = "<div class = 'room_name' id = " + Room_names + " onclick = 'redirectToRoomName(this.id)'>" + Room_names + "</div> <hr>";
   document.getElementById("rooms").innerHTML += roomDiv;
  });
 });
}
getData();
function redirectToRoomName(name){
 console.log(name);
 localStorage.setItem("roomNAME", name);
 window.location = "chat_page.html";
}
function logout(){
 localStorage.removeItem("name");
 localStorage.removeItem("room_name");
 window.location = "index.html"; 
} 