function checkLoggedin(){
	firebase.auth().onAuthStateChanged(function(user) {//checks if user is signed in.
	  if (user) {//user is signed in.
		console.log("Logged in User uid:"+ user.uid);
		return true;
	  } else {
		  console.log("User is not logged in");
		  return false;
		// No user is signed in.
	  }
	})
	
}