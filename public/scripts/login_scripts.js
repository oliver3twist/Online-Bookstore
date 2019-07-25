function init()
{
    //If there is already a user signed in, navigate to the home page
    var user = firebase.auth().currentUser;
    if(user)
    {
        window.open("../public/home.html", "_self")
    }
}

function loginWithEmailAndPassword() {
	console.log("loginWithEmailAndPassword() called");
    var email = document.getElementById("login_username").value
    var password = document.getElementById("login_password").value
	
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        	var errorCode = error.code;
        	var errorMessage = error.message;
        	console.log("ERROR");

        	if(errorCode == 'auth/weak-password') {
            	alert("The password is too weak");
        	} else {
        	    alert(errorMessage);
        	}
    	}
    );
	
	firebase.auth().onAuthStateChanged(function(user){//state change with succesful log in.
		if (user && user.emailVerified) {
			checkAdmin();
			//window.open("./homeReg.html", "_self");// for testing-PJ
			//console.log(user.uid);//test if user is logged in.
		}
		else{
			console.log("error");
			//alert("Please verfiy your email address to login");
			// send to "looks like you need to verify email" page
			//window.open("./homeReg.html", "_self");// for testing-PJ
		}
	});
	
	
	
}//loginWithEmailAndPassword

function checkAdmin(){
	firebase.auth().onAuthStateChanged(function(user) {//checks if user is signed in.
	  if (user) {//user is signed in.
		var db = firebase.firestore();
			var docRef = db.collection("users").doc(user.uid);

			docRef.get().then(function(doc) {
			if (doc.exists) {
				if(doc.data().Admin==true){
					window.open("./homeAdmin.html", "_self");
				}
				else{
					window.open("./homeReg.html", "_self");
				}
				console.log("Document data:", doc.data());
			} else {
				window.open("./index.html", "_self");// refresh page
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
			}).catch(function(error) {
				console.log("Error getting document:", error);
			});
		console.log("Logged in User uid:"+ user.uid);
		return true;
	  } else {
		  window.open("./index.html", "_self");// refresh page
		  console.log("User is not logged in");
		  return false;
		// No user is signed in.
	  }
	});
	
}