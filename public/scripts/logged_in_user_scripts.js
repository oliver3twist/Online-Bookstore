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
				document.getElementById("barLink-profile").text=doc.data().FirstName+"'s Profile";
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
			var docRef = db.collection("billingingaddress").doc(user.uid);

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
		db.collection("billingingaddress").doc(user.uid).set({
			number: document.getElementById("billingnumber").value,
			street: document.getElementById("billingstreet").value,
			city: document.getElementById("billingcity").value,
			state: document.getElementById("billingstate").value,
			zip: document.getElementById("billingzip").value,
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