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
			var db = firebase.firestore();
		db.collection("users").doc(user.uid).set({
		FirstName: document.getElementById("firstname").value,
		LastName: document.getElementById("lastname").value ,
		Admin: false,//is admin?
		status: true,//not suspended
		})
		.then(function() {
			console.log("Document successfully written!");
			//successfully written to db, new send email verification
				
				})
		.catch(function(error) {
			console.error("Error writing document: ", error);
		});
		
		//start add to db
		db.collection("billingaddress").doc(user.uid).set({
		number: 0,
		street: "",
		city: "",
		state: "",
		zip: 0,
		})
		.then(function() {
			console.log("Billing Address successfully written!");
			//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
		
		//start add to db
		db.collection("shippingaddress").doc(user.uid).set({
		number: 0,
		street: "",
		city: "",
		state: "",
		zip: 0,
		})
		.then(function() {
			console.log("Shipping Address successfully written!");
			//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
		
		//start add to db
		db.collection("creditcard").doc(user.uid).set({
		number: 0,
		date: 0,
		})
		.then(function() {
			console.log("Credit Card successfully written!");
			//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
		
		//start add to db
		db.collection("orderhistory").doc(user.uid).set({
		order: [{ bookid:"" , number: 0, date:0}] ,
		})
		.then(function() {
			console.log("Order History successfully written!");
			//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
		
		//start add to db
		db.collection("cart").doc(user.uid).set({
		 book: [{ bookid:"" , number: 0}] ,
		})
		.then(function() {
			console.log("Cart successfully written!");
			user.sendEmailVerification().then(function() {
				// Email sent.
				  window.open("./confirmRegister.html", "_self");// for testing-PJ
				}).catch(function(error) {
					console.log("Error Sending Email");
				  // An error happened.
				});
			//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
		
		
			console.log(user.uid);//test if user is logged in.
		}//if(user)
	});
	
	
	
	
}//registerUserInFirebase

