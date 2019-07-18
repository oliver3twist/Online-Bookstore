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

function getUID(){
	var firebase
	firebase.auth().onAuthStateChanged(function(user){
	  if (user) {
		return user.UID;
	  }
	});
}

function uniqueProfile(){
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			var db = firebase.firestore();
			var docRef = db.collection("users").doc(user.uid);

			docRef.get().then(function(doc) {
			if (doc.exists) {
				console.log("Document data:", doc.data());
				//dynamic home
				home=document.getElementById("barLink-home");
				home.setAttribute('href', 'homeReg.html');
				home.id="barLink";
				//dynamic profile
				profile=document.getElementById("barLink-profile");
				profile.text=doc.data().FirstName+"'s Profile";
				profile.setAttribute('href','profile.html');
				document.getElementById("barLink-logout").id="barLink";
				cart=document.getElementById("cart");
				cicon=document.createElement("img");
				cicon.id="cartIcon";
				cicon.setAttribute('src', 'images/cart3.png');
				cart.appendChild(cicon);
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
			}).catch(function(error) {
				console.log("Error getting document:", error);
			});
			console.log(user.uid);
			// User is signed in.
			
		} else {//edit the nave bar
			console.log("no user signed in");
			
			home=document.getElementById("barLink-home");
			home.setAttribute('href', 'home.html');
			home.id="barLink";
			signup=document.getElementById("barLink-profile");
			signup.text="Sign up";
			signup.setAttribute('href','register.html');
			nocart=document.getElementById("cart");
			nocart.text="Login";
			nocart.setAttribute('href', 'login.html');
			nocart.id="barLink";
			nocart.className="nav-link";
			document.getElementById("barLink-logout").remove();
		  // No user is signed in.
		}
	});
	//document.getElementById("barLink-profile").text=getUID();
}

function uniqueProfileShipping(){
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			var db = firebase.firestore();
			var docRef = db.collection("shippingaddress").doc(user.uid);

			docRef.get().then(function(doc) {
			if (doc.exists) {
				console.log("Document data:", doc.data());
				var street=doc.data().number+" "+ doc.data().street;
				var city=doc.data().city+", "+ doc.data().state + " " + doc.data().zip;
				document.getElementById("shipstreet").innerHTML=street;
				document.getElementById("shipcity").innerHTML=city;
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
			}).catch(function(error) {
				console.log("Error getting document:", error);
			});
			console.log(user.uid);
			// User is signed in.
			
		} else {
			console.log("no user signed in");
			
		  // No user is signed in.
		}
	});
	//document.getElementById("barLink-profile").text=getUID();
}//uniqueProfileShipping

function uniqueProfileBilling(){
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			var db = firebase.firestore();
			var docRef = db.collection("billingaddress").doc(user.uid);

			docRef.get().then(function(doc) {
			if (doc.exists) {
				console.log("Document data:", doc.data());
				var street=doc.data().number+" "+ doc.data().street;
				var city=doc.data().city+", "+ doc.data().state + " " + doc.data().zip;
				document.getElementById("billstreet").innerHTML=street;
				document.getElementById("billcity").innerHTML=city;
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
			}).catch(function(error) {
				console.log("Error getting document:", error);
			});
			console.log(user.uid);
			// User is signed in.
			
		} else {
			console.log("no user signed in");
			
		  // No user is signed in.
		}
	});
	//document.getElementById("barLink-profile").text=getUID();
}//uniqueProfileBilling

function uniqueProfileCard(){
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			var db = firebase.firestore();
			var docRef = db.collection("creditcard").doc(user.uid);

			docRef.get().then(function(doc) {
			if (doc.exists) {
				console.log("Document data:", doc.data());
				if(doc.data().cardholder!=null){
					document.getElementById("holder").innerHTML=doc.data().cardholder;
					document.getElementById("number").innerHTML=doc.data().number;
					document.getElementById("exp").innerHTML=doc.data().date;
					document.getElementById("ccvdisplay").innerHTML=doc.data().ccv;
				}
				else{
					document.getElementById("holder").innerHTML="Oops, Looks like we don't have a card on file...";
				}
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
			}).catch(function(error) {
				console.log("Error getting document:", error);
			});
			console.log(user.uid);
			// User is signed in.
			
		} else {
			console.log("no user signed in");
			
		  // No user is signed in.
		}
	});
	//document.getElementById("barLink-profile").text=getUID();
}//uniqueProfileShipping


function updateShippingAddress(){
	firebase.auth().onAuthStateChanged(function(user){
		if (user) {
				var db = firebase.firestore();
		db.collection("shippingaddress").doc(user.uid).set({
			number: document.getElementById("shippingnumber").value,
			street: document.getElementById("shippingstreet").value,
			city: document.getElementById("shippingcity").value,
			state: document.getElementById("shippingstate").value,
			zip: document.getElementById("shippingzip").value,
			})
			.then(function() {
				console.log("Shipping Address successfully updated!");
				window.open("./profile.html", "_self");// refresh page
				//successfully written to db, new send email verification
			}).catch(function(error) {
				console.error("Error writing document: ", error);
			});//end add to db
		}//if(user)
	});
}

function updateBillingAddress(){
	firebase.auth().onAuthStateChanged(function(user){
		if (user) {
				var db = firebase.firestore();
		db.collection("billingaddress").doc(user.uid).set({
			number: document.getElementById("billingnumber").value,
			street: document.getElementById("billingstreet").value,
			city: document.getElementById("billingcity").value,
			state: document.getElementById("billingstate").value,
			zip: document.getElementById("billingzip").value,
			})
			.then(function() {
				console.log("Billing Address successfully updated!");
				window.open("./profile.html", "_self");// refresh page
				//successfully written to db, new send email verification
			}).catch(function(error) {
				console.error("Error writing document: ", error);
			});//end add to db
		}//if(user)
	});
}

function updateCreditCard(){
	firebase.auth().onAuthStateChanged(function(user){
		if (user) {
				var db = firebase.firestore();
		db.collection("creditcard").doc(user.uid).set({
			cardholder: document.getElementById("cardholder").value,
			ccv: document.getElementById("ccv").value,
			date: document.getElementById("expdate").value,
			number: document.getElementById("cardnumber").value,
			})
			.then(function() {
				console.log("Credit Card info successfully updated!");
				window.open("./profile.html", "_self");// refresh page
				//successfully written to db, new send email verification
			}).catch(function(error) {
				console.error("Error writing document: ", error);
			});//end add to db
		}//if(user)
	});
}

function logout(){
	firebase.auth().signOut().then(function() {
		window.open("./index.html", "_self");//redirect to index page
		// Sign-out successful.
	}).catch(function(error) {
		// An error happened.
	});
}