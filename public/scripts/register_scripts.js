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
			registeruserinfo(user,db);//register user info
			registerstreetinfo(user,db);
			registeruserbilling(user, db);
			registerusercc(user,db);
			
			/*
			var db = firebase.firestore();
		db.collection("users").doc(user.uid).set({
		
		if(document.getElementById("subpromo").checked){
			FirstName: document.getElementById("firstname").value,
			LastName: document.getElementById("lastname").value ,
			Admin: false,//is admin?
			subtopromo: true;
		}
		else{
			FirstName: document.getElementById("firstname").value,
			LastName: document.getElementById("lastname").value ,
			Admin: false,//is admin?
			subtopromo: false;
		}
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
		db.collection("shippingstreet").doc(user.uid).set({
		if(document.getElementById("shippingaddress").value!=""){//if
			number: document.getElementById("shippingnumber").value,
			street: document.getElementById("shippingstreet").value,
			city: document.getElementById("shippingcity").value,
			state: document.getElementById("shippingstate").value,
			zip: document.getElementById("shippingzip").value,
		}//if
		else{
			number: null,
			street: null,
			city: null,
			state: null,
			zip: null,
		}//else
		})
		.then(function() {
			console.log("Shipping Address successfully written!");
			//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
		
	
		//start add to db
		db.collection("billingaddress").doc(user.uid).set({
			if(document.getElementById("sameshipbill").checked==true){
				number: document.getElementById("shippingnumber").value,
				street: document.getElementById("shippingstreet").value,
				city: document.getElementById("shippingcity").value,
				state: document.getElementById("shippingstate").value,
				zip: document.getElementById("shippingzip").value,
			}//if
			else if(document.getElementById("sameshipbill").checked==false && document.getElementById("billingingaddress").value!=""){
				number: document.getElementById("billingnumber").value,
				street: document.getElementById("billingstreet").value,
				city: document.getElementById("billingcity").value,
				state: document.getElementById("billingstate").value,
				zip: document.getElementById("billingzip").value,
			}//else if
			else{
				number: null,
				street: null,
				city: null,
				state: null,
				zip: null,
			}//else
		})
		.then(function() {
			console.log("Billing Address successfully written!");
			//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
		
		
		
		//start add to db
		db.collection("creditcard").doc(user.uid).set({
			if(document.getElementById("ccname").value!=""){
				cardholder: document.getElementById("ccname").value,
				number: document.getElementById("ccnumber").value,
				ccv:document.getElementById("ccccv").value,
				date: document.getElementById("ccexp").value,
			}
			else{
				cardholder:null,
				number: null,
				ccv:null,
				date: null,
			}
		})
		.then(function() {
			console.log("Credit Card successfully written!");
			//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
		*/
		
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

function registeruserinfo(user,db){
	if(document.getElementById("subpromo").checked){
		db.collection("users").doc(user.uid).set({
			FirstName: document.getElementById("firstname").value,
			LastName: document.getElementById("lastname").value ,
			Admin: false,//is admin?
			subtopromo: true,
			status: true,//not suspended
		})
		.then(function() {
			console.log("Document successfully written!");
			//successfully written to db, new send email verification
		})
		.catch(function(error) {
			console.error("Error writing document: ", error);
		});
	}
	else{
		db.collection("users").doc(user.uid).set({
			FirstName: document.getElementById("firstname").value,
			LastName: document.getElementById("lastname").value ,
			Admin: false,//is admin?
			subtopromo: false,
			status: true,//not suspended
		})
		.then(function() {
			console.log("Document successfully written!");
			//successfully written to db, new send email verification
		})
		.catch(function(error) {
			console.error("Error writing document: ", error);
		});
	}//else
}//registeruserinfo

function registerstreetinfo(user,db){
	if(document.getElementById("shippingstreet").value!=""){//if
		db.collection("shippingaddress").doc(user.uid).set({
			number: document.getElementById("shippingnumber").value,
			street: document.getElementById("shippingstreet").value,
			city: document.getElementById("shippingcity").value,
			state: document.getElementById("shippingstate").value,
			zip: document.getElementById("shippingzip").value,
		})
		.then(function() {
			console.log("Shipping Address successfully written!");
			//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
	}//if
	else{
		db.collection("shippingstreet").doc(user.uid).set({
			number: null,
			street: null,
			city: null,
			state: null,
			zip: null,
		})
		.then(function() {
			console.log("Shipping Address successfully written!");
		//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
	}//else
}

function registeruserbilling(user, db){
	if(document.getElementById("sameshipbill").checked==true){
		db.collection("billingaddress").doc(user.uid).set({
			number: document.getElementById("shippingnumber").value,
			street: document.getElementById("shippingstreet").value,
			city: document.getElementById("shippingcity").value,
			state: document.getElementById("shippingstate").value,
			zip: document.getElementById("shippingzip").value,
		})
		.then(function() {
			console.log("Billing Address successfully written!");
			//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
	}//if
	else if(document.getElementById("sameshipbill").checked==false && document.getElementById("billingstreet").value!=""){
		db.collection("billingaddress").doc(user.uid).set({
				number: document.getElementById("billingnumber").value,
				street: document.getElementById("billingstreet").value,
				city: document.getElementById("billingcity").value,
				state: document.getElementById("billingstate").value,
				zip: document.getElementById("billingzip").value,
		})
		.then(function() {
			console.log("Billing Address successfully written!");
			//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
	}//else if
	else{
		db.collection("billingaddress").doc(user.uid).set({
			number: null,
			street: null,
			city: null,
			state: null,
			zip: null,
		})
		.then(function() {
			console.log("Billing Address successfully written!");
			//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
	}//else
}//registeruserbilling

function registerusercc(user, db){
	if(document.getElementById("ccname").value!=""){
		db.collection("creditcard").doc(user.uid).set({
			cardholder: document.getElementById("ccname").value,
			number: document.getElementById("ccnumber").value,
			ccv:document.getElementById("ccccv").value,
			date: document.getElementById("ccexp").value,
		})
		.then(function() {
			console.log("Credit Card successfully written!");
			//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
	}//if
	else{
		db.collection("creditcard").doc(user.uid).set({
			cardholder:null,
			number: null,
			ccv:null,
			date: null,
		})
		.then(function() {
			console.log("Credit Card successfully written!");
			//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
	}//else
}//registerusercc



