

  
var db = firebase.database();
var auth = firebase.auth();



function hideSignInBtn(){
    console.log("geyf")
    document.getElementById('signIn').classList.add('hide')
    document.getElementById('signUp').classList.remove('hide')
    document.getElementById('petName').classList.remove('hide')
    document.getElementById('petName').classList.add('block')
    document.getElementById('becomeMember').classList.remove('hide')
    document.getElementById('becomeMember').classList.add('block')
    document.getElementById('dont').classList.add('hide')
    document.getElementById('have').classList.remove('hide')
    document.getElementById('sexuality').classList.remove('hide')
    document.getElementById('matchPaw').classList.add('hide')
    document.getElementById('matchPaw').classList.remove('block')
}
function hideSignUpBtn(){

    document.getElementById('signIn').classList.remove('hide')
   
    document.getElementById('signUp').classList.add('hide')
    document.getElementById('petName').classList.add('hide')
    document.getElementById('petName').classList.remove('block')
    document.getElementById('becomeMember').classList.add('hide')
    document.getElementById('becomeMember').classList.remove('block')
    document.getElementById('matchPaw').classList.remove('hide')
    document.getElementById('matchPaw').classList.add('block')
    
    
    document.getElementById('have').classList.add('hide')
    document.getElementById('dont').classList.remove('hide')
    document.getElementById('sexuality').classList.add('hide')
}


function signUp(){

    var petName = document.getElementById('petName').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var gender = document.getElementById("gender").options[document.getElementById("gender").selectedIndex].value
    var pet = document.getElementById("pet").options[document.getElementById("pet").selectedIndex].value

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
      signIn()
      if((pet == "cat")){
        var catsDatabase = db.ref("cats");
        if(gender == "male"){
            var catMales = catsDatabase.child('catMales/' + firebase.auth().currentUser.uid)
            catMales.set({
                petName: petName,
                email : email,
                gender: gender,
                pet: pet,
            });     
        }else if(gender == "female"){
            var catFemales = catsDatabase.child('catFemales/' + firebase.auth().currentUser.uid)
            catFemales.set({
              petName: petName,
              email : email,
              gender: gender,
              pet: pet
          });
        }
      }else if((pet == "dog")){
        var dogsDatabase = db.ref("dogs");
        if(gender == "male"){
            var dogMales = dogsDatabase.child('dogMales/' + firebase.auth().currentUser.uid)
            dogMales.set({
                petName: petName,
                email : email,
                gender: gender,
                pet: pet
            });
        }else if(gender == "female"){
            var dogFemales = dogsDatabase.child('dogFemales/' + firebase.auth().currentUser.uid)
            dogFemales.set({
              petName: petName,
              email : email,
              gender: gender,
              pet: pet
          });
                                    var image;
                                    $("#file").on("change", function(event){
                                    image = event.target.files[0];
                                    })
                                    var filename = image.name
                                    var storageRef = firebase.storage().ref("/dogImages/" + filename)
                                    var uploadTask = storageRef.put(image)
                                    uploadTask.on('state_changed', function(snapshot){
                                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                        console.log('Upload is ' + progress + '% done');
                                                switch (snapshot.state) {
                                                        case firebase.storage.TaskState.PAUSED:
                                                        console.log('Upload is paused');
                                                            break;
                                                        case firebase.storage.TaskState.RUNNING: 
                                                        console.log('Upload is running');
                                                            break;
                                                }
                                    }, function(error) {
                                            }, function() {
                                            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                                                        console.log('File available at', downloadURL);
                           
                                                        var dogsDatabase = db.ref("dogs");
                                                        var dogFemales = dogsDatabase.child('dogFemales/' + firebase.auth().currentUser.uid)
                                                        dogFemales.update({
                                                        imageURL: downloadURL
                                                        });
                                    });
                                    });
        }
      }
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
  });
}


function signIn(){
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        displaySignedPage()
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
  });
}






  
function signOut(){
firebase.auth().signOut().then(function() {
        displaySignForm()
        
    }).catch(function(error) {
        displaySignForm()
});
}






firebase.auth().onAuthStateChanged(user => {
if(!user) {
    displaySignForm()
}else{
 sexyFunction(user.uid)
 
}
});






console.log("HEYYYYYY MANNNNN")


function heartClicked(){
    sexyFunction(firebase.auth().currentUser.uid)
}



function sexyFunction(user){
                            console.log(user)
                            displaySignedPage() 


                            var ref = firebase.database().ref("cats/catMales/");
                            ref.once("value").then(function(snapshot) {
                                        var existsBool = snapshot.child(user).exists();
                                        if(existsBool == true){
                                            var catMales = db.ref("cats/catMales/" + user);
                                            catMales.on("value", function(snapshot) {
                                                                    console.log(catMales.parent.key)
                                                                    document.getElementById('activePetName').innerText = snapshot.val().petName +  "'s Profile"
                                                                    document.getElementById('petKind').innerText = snapshot.val().pet
                                                                    document.getElementById('petGender').innerText = snapshot.val().gender
                                                                    document.getElementById('accountEmail').innerText = snapshot.val().email
                                                                }, function (errorObject) {
                                                                    console.log("The read failed: " + errorObject.code);
                                                                }); 

                                        }else if(existsBool == false){
                                                var ref = firebase.database().ref("cats/catFemales/");
                                                ref.once("value").then(function(snapshot) {
                                                    var existsBool = snapshot.child(user).exists();
                                                            if(existsBool == true){
                                                                var catFemales = db.ref("cats/catFemales/" + user);
                                                                console.log(catFemales.parent.key)  
                                                                catFemales.on("value", function(snapshot) {
                                                                    console.log(catFemales.parent.key)
                                                                    document.getElementById('activePetName').innerText = snapshot.val().petName +  "'s Profile"
                                                                    document.getElementById('petKind').innerText = snapshot.val().pet
                                                                    document.getElementById('petGender').innerText = snapshot.val().gender
                                                                    document.getElementById('accountEmail').innerText = snapshot.val().email
                                                                    }, function (errorObject) {
                                                                    console.log("The read failed: " + errorObject.code);
                                                                    });           
                                                            }else if(existsBool == false){
                                                                var ref = firebase.database().ref("dogs/dogMales/");
                                                                ref.once("value").then(function(snapshot) {
                                                                    var existsBool = snapshot.child(user).exists();
                                                                            if(existsBool == true){
                                                                                    var dogMales = db.ref("dogs/dogMales/" + user);
                                                                                    console.log(dogMales.parent.key)
                                                                                    var otherRef = firebase.database().ref("dogs/dogFemales")
                                                                                                    
                                                                                                    otherRef.on('value',function(snapshot){
                                                                                                         
                                                                                                    
                                                                                                        var i = 0;
                                                                                                        var randomIndex = Math.floor(Math.random() * snapshot.numChildren());
                                                                                                        
                                                                                                    snapshot.forEach(function(childSnapshot) {
                                                                                                        if (i == randomIndex) {
                                                                                                        var childData = childSnapshot.val();
                                                                                                        console.log("talal" + childData.imageURL)

                                                                                                       
                                                                                                        if(childData.imageURL == null ){ childData.imageURL == "../images/no-picture.png" }
                                                                                                        document.getElementById('swiped').innerHTML = "<div class='container'> <div class='content'><div class='card'><div class='user'><img class='user' src='" + childData.imageURL  + ".jpg'/><div class='profile'><div class='name' style='color:white;text-transform:capitalize;'>"+childData.petName+"</div><div class='name' style='color:white;text-transform:capitalize;'>"+childData.gender + " " + childData.pet+"</div><div class='local'><i class='fas fa-map-marker-alt'></i><span> 20 miles away</span></div></div></div></div></div></div><div class='tinder--buttons'><button><i class='fa fa-times'></i></button><button onclick='heartClicked()'><i class='fa fa-heart'></i></button></div>"
                                                                                                        }
                                                                                                        i++;
                                                                                                        });
                                                                                                         
                                                                                                    });
                                                                                    dogMales.on("value", function(snapshot) {
                                                                                        document.getElementById('activePetName').innerText =  snapshot.val().petName +  "'s Profile"
                                                                                        document.getElementById('petKind').innerText = snapshot.val().pet
                                                                                        document.getElementById('petGender').innerText = snapshot.val().gender
                                                                                        document.getElementById('accountEmail').innerText = snapshot.val().email
                                                                                    }, function (errorObject) {
                                                                                    console.log("The read failed: " + errorObject.code);
                                                                                    });
                                                                            }else if(existsBool == false){
                                                                                var ref = firebase.database().ref("dogs/dogFemales/");
                                                                                ref.once("value").then(function(snapshot) {
                                                                                    var existsBool = snapshot.child(user).exists();
                                                                                                if(existsBool == true){
                                                                                                    var dogFemales = db.ref("dogs/dogFemales/" + user);
                                                                                                    console.log(dogFemales.parent.key)
                                                                                                    console.log("talal below")
                                                                                                    var otherRef = firebase.database().ref("dogs/dogMales")
                                                                                                    
                                                                                                    otherRef.on('value',function(snapshot){
                                                                                                         
                                                                                                        


                                                                                                            var i = 0;
                                                                                                            var randomIndex = Math.floor(Math.random() * snapshot.numChildren());
                                                                                                            
                                                                                                        snapshot.forEach(function(childSnapshot) {
                                                                                                            if (i == randomIndex) {
                                                                                                            var childData = childSnapshot.val();
                                                                                                            document.getElementById('swiped').innerHTML = "<div class='container'> <div class='content'><div class='card'><div class='user'><img class='user' src='../images/no-picture.png'/><div class='profile'><div class='name' style='color:white;text-transform:capitalize;'>"+childData.petName+"</div><div class='name' style='color:white;text-transform:capitalize;'>"+childData.gender + " " + childData.pet+"</div><div class='local'><i class='fas fa-map-marker-alt'></i><span> 20 miles away</span></div></div></div></div></div></div><div class='tinder--buttons'><button><i class='fa fa-times'></i></button><button onclick='heartClicked()'><i class='fa fa-heart'></i></button></div>"
                                                                                                            }
                                                                                                            i++;
                                                                                                          });
                                                                                                         
                                                                                                    });


                                                                                                    dogFemales.on("value", function(snapshot) {
                                                                                                        console.log(dogFemales.parent.key)
                                                                                                        document.getElementById('petProfileName').value = snapshot.val().petName
                                                                                                        document.getElementById('activePetName').innerText = snapshot.val().petName +  "'s Profile"
                                                                                                        document.getElementById('petKind').value =  snapshot.val().pet
                                                                                                        document.getElementById('petGender').value = snapshot.val().gender
                                                                                                        document.getElementById('accountEmail').value = snapshot.val().email
                                                                                                        document.getElementById('talal').value = snapshot.val().gender
                                                                                                        
                                                                                                    }, function (errorObject) {
                                                                                                    console.log("The read failed: " + errorObject.code);
                                                                                                    });
                                                                                                }
                                                                                    });
                                                                            }
                                                                });
                                                            }
                                                });
                                        }
                            });

       
 }                                   
                                
                                  


            


                                
function displaySignForm(){
    document.getElementById('signForm').classList.add('block')
    document.getElementById('signForm').classList.remove('hide')
    document.getElementById('signedInForm').classList.add('hide')
    document.getElementById('signedInForm').classList.remove('block')
}
function displaySignedPage(){
    document.getElementById('signForm').classList.add('hide')
    document.getElementById('signForm').classList.remove('block')
    document.getElementById('signedInForm').classList.add('block')
    document.getElementById('signedInForm').classList.remove('hide')
}