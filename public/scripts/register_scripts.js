function init() {
    //If there is already a user signed in, navigate to the home page
    var user = firebase.auth().currentUser
    if(user) {
        window.open("../public/home.html", "_self");// for testing-PJ
    }
}

function registerUserInFirebase() {
	var email = document.getElementById("register_email").value;
	//console.log(email);
    var p1 = document.getElementById("register_password").value;
	//console.log(p1);
	
    var p2 = document.getElementById("register_confirm_password").value;
	//console.log(p2);
    if(p1 != p2) {
        alert("Passwords do not match!");
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, p1).catch(function(error) {
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
	
	firebase.auth().onAuthStateChanged(function(user){
		if (user) {
			user.sendEmailVerification().then(function() {
		  // Email sent.
		  window.open("./confirmRegister.html", "_self");// for testing-PJ
		}).catch(function(error) {
		  // An error happened.
		});
			
			console.log(user.uid);//test if user is logged in.
		}
	});
	
}//registerUserInFirebase

