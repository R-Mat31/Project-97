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
user_name = localStorage.getItem("name");
room_name = localStorage.getItem("room_name");
function send(){
 message = document.getElementById("msg").value;
 firebase.database().ref(room_name).push({
  sender : user_name,
  message : message,
  likes : 0
 });
 document.getElementById("msg").value = "";
}
function getData(){ 
 firebase.database().ref("/" + room_name).on('value', function(snapshot){ 
  document.getElementById("output").innerHTML = ""; 
  snapshot.forEach(function(childSnapshot){ 
   childKey = childSnapshot.key; 
   childData = childSnapshot.val(); 
   if(childKey != "purpose"){ 
    firebase_message_id = childKey; 
    message_data = childData; 
    sender = message_data['sender'];
    msg = message_data['message'];
    likes = message_data['likes'];
    h3 = "<h3 class = 'text-warning'>" + sender + "<img src = 'wolf.png' class = 'wolf'></h3>";
    h4 = "<h4 class = 'message_h4'>" + msg + "</h4>";
    btn = "<button class = 'btn btn-danger' id = " + firebase_message_id + " value = " + likes + " onclick = 'update_like(this.id)'><span class = 'glyphicon glyphicon-thumbs-up'>Likes: " + likes + "</span></button><hr>";
    fullMessage = h3 + h4 + btn;
    document.getElementById("output").innerHTML += fullMessage;
   }; 
  }); 
 }); 
} 
getData();
function update_like(messageId){
 buttonId = messageId;
 likes = document.getElementById(buttonId).value;
 updatedLikes = Number(likes) + 1;
 firebase.database().ref(room_name).child(messageId).update({
  likes : updatedLikes     
 });
}
function logout(){
 localStorage.removeItem("name");
 localStorage.removeItem("room_name");
 window.location = "index.html";     
}