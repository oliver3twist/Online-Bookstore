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
			
		  window.open("./homeReg.html", "_self");// for testing-PJ
			//console.log(user.uid);//test if user is logged in.
		}
		else{
			// send to "looks like you need to verify email" page
			//window.open("./homeReg.html", "_self");// for testing-PJ
		}
	});
	
	
	
}//loginWithEmailAndPassword