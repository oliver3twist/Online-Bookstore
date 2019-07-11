function init() {
    //If there is already a user signed in, navigate to the home page
    var user = firebase.auth().currentUser
    if(user) {
        window.open("../public/home.html", "_self")
    }
}

function registerUserInFirebase() {
	var email = document.getElementById("register_email").value
    var p1 = document.getElementById("register_password").value
    var p2 = document.getElementById("register_confirm_password").value

    if(p1 != p2) {
        alert("Passwords do not match!")
        return
    }

    firebase.auth().createUserWithEmailAndPassword(email, p1).then(function(user) {
        if(user) {
            //addUserToDB()
        }
    }).catch(function(error) 
    	{
        	var errorCode = error.code
        	var errorMessage = error.message
        	console.log("ERROR")

        	if(errorCode == 'auth/weak-password') {
            	alert("The password is too weak")
        	} else {
        	    alert(errorMessage)
        	}
    	}
    )
}