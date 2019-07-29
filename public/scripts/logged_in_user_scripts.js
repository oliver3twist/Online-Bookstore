function checkAdminBool(){
	firebase.auth().onAuthStateChanged(function(user) {//checks if user is signed in.
	  if (user) {//user is signed in.
		var db = firebase.firestore();
			var docRef = db.collection("users").doc(user.uid);

			docRef.get().then(function(doc) {
			if (doc.exists) {
				if(doc.data().Admin==true){
					//window.open("./homeReg.html", "_self");
					return true;
				}
				console.log("Document data:", doc.data());
			} else {
				return false;//window.open("./index.html", "_self");// refresh page
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
			}).catch(function(error) {
				console.log("Error getting document:", error);
			});
		console.log("Logged in User uid:"+ user.uid);
		//return true;
	  } else {
		  //window.open("./index.html", "_self");// refresh page
		  console.log("User is not logged in");
		  return false;
		// No user is signed in.
	  }
	});
	return false
}

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
		window.open("./home.html", "_self");//redirect to index page
		// Sign-out successful.
	}).catch(function(error) {
		// An error happened.
	});
}

function bookDetails(ISBN){
	var db = firebase.firestore();
	var docRef = db.collection("books").doc(ISBN);

			docRef.get().then(function(doc) {
			if (doc.exists) {
				//console.log("Document data:", doc.data());
				
					document.getElementById("booktitle").innerHTML="Title: "+doc.data().Title;
					document.getElementById("author").innerHTML="Author: "+doc.data().Author;
					document.getElementById("publisher").innerHTML="Publisher: "+doc.data().Publisher;
					document.getElementById("category").innerHTML="Category: "+doc.data().Category;
					document.getElementById("cover").setAttribute("src",doc.data().Cover);
					
					document.getElementById("ISBN").innerHTML="ISBN: "+doc.data().ISBN;
				
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
			}).catch(function(error) {
				console.log("Error getting document:", error);
			});
			//console.log(user.uid);
		
			//console.log(user.uid);//test if user is logged in.
}//bookdetails

function showBooks(){
	
	list=document.getElementById("booklist");
	var db = firebase.firestore();
	db.collection("books").get().then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
			
			var book=document.getElementById("booklist");
			
			var shoppingCartItemsContainer = document.createElement("DIV");
			shoppingCartItemsContainer.className = "shoppingCartItemsContainer";
			var br=document.createElement("br");
			
			var div1 = document.createElement("div");
			div1.setAttribute("style", "width: 100px; height: 100px; float: left")
			var a=document.createElement("a");
			a.addEventListener("click", function(){
				var statement="./bookdetails.html?ISBN="+doc.data().ISBN;
				window.location.href=statement;
				//window.open(statement, "_self");
			},false);
			var imgsrc=document.createElement("img");
			imgsrc.src=doc.data().Cover;
			imgsrc.setAttribute("alt", "placeholder");
			imgsrc.setAttribute("style", "width: 100px; height: 100px; float: left");
			a.appendChild(imgsrc);
			div1.appendChild(a);
			
			var shoppingCartItemsDetails=document.createElement("div");
			shoppingCartItemsDetails.className="shoppingCartItemsDetails";
			var atitle=document.createElement("a");
			var statement="./bookdetails.html?ISBN="+doc.data().ISBN;
				
			atitle.setAttribute("href","window.location.href=statement");
			atitle.innerHTML=doc.data().Title;
			var author=document.createElement("p");
			author.innerHTML="By: <strong>"+doc.data().Author+"</strong>";
			
			var condition=document.createElement("p");
			condition.innerHTML="Condition: <strong>"+doc.data().Condition+"</strong>";
			
			var sellpriceper=document.createElement("p");
			sellpriceper.innerHTML="Price: <strong>$"+doc.data().SellingPrice$+"</strong> each";
			
			var buypriceper=document.createElement("p");
			buypriceper.innerHTML="Buying Price: <strong>$"+doc.data().BuyingPrice$+"</strong> each";
			
			shoppingCartItemsDetails.appendChild(atitle);
			shoppingCartItemsDetails.appendChild(author);
			shoppingCartItemsDetails.appendChild(condition);
			shoppingCartItemsDetails.appendChild(sellpriceper);
			
			
			var shoppingCartItemsQuantity=document.createElement("div");
			shoppingCartItemsQuantity.setAttribute("style", "float:right");
			var price=document.createElement("p");
			price.innerHTML="Price: <strong>$"+doc.data().SellingPrice$+"</strong>";
			var editbtn=document.createElement("button");
			
			var stock=document.createElement("p");
			stock.innerHTML="Quantity in Stock: <strong>"+doc.data().Stock+"</strong>";
			var active=document.createElement("p");
			active.innerHTML="Active: <strong>"+doc.data().status+"</strong>";
			var br=document.createElement("br");
			var addtocart=document.createElement("a");
			addtocart.setAttribute("href", "#");
			addtocart.innerHTML="Add to Cart";
			//shoppingCartItemsQuantity.appendChild(addtocart);
			shoppingCartItemsQuantity.appendChild(price);
			shoppingCartItemsQuantity.appendChild(addtocart);
			//shoppingCartItemsQuantity.appendChild(br);
			shoppingCartItemsQuantity.appendChild(stock);
			
			
			
			
			shoppingCartItemsContainer.appendChild(div1);
			shoppingCartItemsContainer.appendChild(shoppingCartItemsDetails);
			shoppingCartItemsContainer.appendChild(shoppingCartItemsQuantity);
			li=document.createElement("LI");
			li.appendChild(shoppingCartItemsContainer);
			book.appendChild(li);
		});
	});
	/*
	<div class="shoppingCartItemsContainer">
            <div style="width: 100px; height: 100px; float: left">
              <!--Book Image-->
              <a href="#"><img src="https://dummyimage.com/100x100/000/fff" alt="placeholder"></a>
            </div>
            <div>
              <!-- Details -->
              <div class="shoppingCartItemsDetails">
                <!-- Book Details -->
                <a href="#">Book Title</a>
                <p>By John Smith</p>
                <p>Condition: <strong>Acceptable</strong></p>
                <p>Format: <strong>Paperback</strong></p>
                <p><strong>3.99</strong> each</p>
              </div>
              <div class="shoppingCartItemsQuantity" style="float: right">
                <!-- Totals -->
                <p>Price: <strong>$3.99</strong></p>
                <a href="#">Add to Cart</a>
              </div>
            </div>
        </div>
	*/
	
	
}