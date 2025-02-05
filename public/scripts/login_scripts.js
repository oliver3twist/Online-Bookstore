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

function checkSuspended(){
	firebase.auth().onAuthStateChanged(function(user) {//checks if user is signed in.
	  if (user) {//user is signed in.
		var db = firebase.firestore();
		var docRef = db.collection("users").doc(user.uid);
		docRef.get().then(function(doc) {
			if (doc.exists) {
				if(doc.data().status==true){
					return true;
				}
				else{
					return false;
				}
				console.log("Document data:", doc.data());
			} else {
				//window.open("./index.html", "_self");// refresh page
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
			}).catch(function(error) {
				console.log("Error getting document:", error);
			});
		
	  } else {
		  //window.open("./index.html", "_self");// refresh page
		  console.log("User is not logged in");
		  //return false;
		// No user is signed in.
	  }
	});
	
}

function checkAdmin(){
	firebase.auth().onAuthStateChanged(function(user) {//checks if user is signed in.
	  if (user) {//user is signed in.
		var db = firebase.firestore();
			var docRef = db.collection("users").doc(user.uid);

			docRef.get().then(function(doc) {
			if (doc.exists) {
				if(doc.data().Admin==true && doc.data().status==true){
					window.open("./homeAdmin.html", "_self");
				}
				else if(doc.data().Admin==false && doc.data().status==true){
					window.open("./homeReg.html", "_self");
				}
				else if(doc.data().status==false){
					window.open("./suspendedLogin.html", "_self");
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

function resetPassword(){
	var auth = firebase.auth();
	var emailAddress = document.getElementById("eaddress").value;
	//console.log(emailAddress);
	auth.sendPasswordResetEmail(emailAddress).then(function() {
		// Email sent.
		window.open("./passwordConfirm.html", "_self");
	}).catch(function(error) {
		// An error happened.
	});
}//resetPassword