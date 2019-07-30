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
	});
	return false;
	
}

function getUID(){
	var firebase;
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
				var home=document.getElementById("barLink-home");
				home.setAttribute('href', 'homeReg.html');
				home.id="barLink";
				//dynamic profile
				var profile=document.getElementById("barLink-profile");
				profile.text=doc.data().FirstName+"'s Profile";
				profile.setAttribute('href','profile.html');
				document.getElementById("barLink-logout").id="barLink";
				var cart=document.getElementById("cart");
				var cicon=document.createElement("img");
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
			
			var home=document.getElementById("barLink-home");
			home.setAttribute('href', 'home.html');
			home.id="barLink";
			var signup=document.getElementById("barLink-profile");
			signup.text="Sign up";
			signup.setAttribute('href','register.html');
			var nocart=document.getElementById("cart");
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
					document.getElementById("price").innerHTML="Price: $"+(doc.data().SellingPrice$ / 1).toFixed(2);
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
	//var loggedIn=checkLoggedin();
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
			sellpriceper.innerHTML="Price: <strong>$"+(doc.data().SellingPrice$ / 1).toFixed(2)+"</strong> each";
			
			var buypriceper=document.createElement("p");
			buypriceper.innerHTML="Buying Price: <strong>$"+doc.data().BuyingPrice$+"</strong> each";
			
			shoppingCartItemsDetails.appendChild(atitle);
			shoppingCartItemsDetails.appendChild(author);
			shoppingCartItemsDetails.appendChild(condition);
			shoppingCartItemsDetails.appendChild(sellpriceper);
			
			
			var shoppingCartItemsQuantity=document.createElement("div");
			shoppingCartItemsQuantity.setAttribute("style", "float:right");
			var price=document.createElement("p");
			price.innerHTML="Price: <strong>$"+(doc.data().SellingPrice$ / 1).toFixed(2)+"</strong>";
			var editbtn=document.createElement("button");
			
			var stock=document.createElement("p");
			stock.innerHTML="Quantity in Stock: <strong>"+doc.data().Stock+"</strong>";
			var active=document.createElement("p");
			active.innerHTML="Active: <strong>"+doc.data().status+"</strong>";
			var br=document.createElement("br");
			var addtocart=document.createElement("button");
			addtocart.setAttribute("class", "btn btn-primary");
			//addtocart.setAttribute("href", "addToCart(isbn)");
			addtocart.addEventListener("click", function(){addToCart(doc.id)},false);
			addtocart.innerHTML="Add to Cart";
			//shoppingCartItemsQuantity.appendChild(addtocart);
			shoppingCartItemsQuantity.appendChild(price);
			//console.log("user add to cart logged in: "+checkLoggedin());
			
			
			firebase.auth().onAuthStateChanged(function(user) {//checks if user is signed in.
			  if (user) {//user is signed in.
				console.log("Logged in User uid:"+ user.uid);
				shoppingCartItemsQuantity.appendChild(addtocart);
			  } else {
				  
				// No user is signed in.
			  }
			});
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
}//showBooks


function showPromotions(){
	promo=document.getElementsByClassName("promos");
	var db = firebase.firestore();
	db.collection("promotions").get().then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
			var promoItemsContainer = document.createElement("DIV");
			var promodesc=doc.data().PromoDesc;
			var promocode="\""+doc.data().PromoCode+"\"";
			promoItemsContainer.innerHTML=promodesc +"<span class=\"code\">" + promocode+"</span>";
			li=document.createElement("LI");
			li.appendChild(promoItemsContainer);
			promo[0].appendChild(li);
			
			
		});
	});
}//showPromotions

function addToCart(isbn){
	console.log(" logged in user: "+firebase.auth().currentUser.uid);
	var price;
	//var number=0;
	firebase.auth().onAuthStateChanged(function(user){
	  if (user) {
		  var number=1;
		var userID= user.uid;
		console.log("userID: "+ userID);
	  
	
	var db = firebase.firestore();
			var docRef = db.collection("books").doc(isbn);
			/*
			docRef.get().then(function(doc) {
			if (doc.exists) {
				console.log("Document data:", doc.data());
					price=doc.data().SellingPrice$;
				
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
			}).catch(function(error) {
				console.log("Error getting document:", error);
			});
			//console.log(user.uid);
			// User is signed in.
			*/
			var docRef2 = db.collection("cart").doc(firebase.auth().currentUser.uid);
			docRef2.get().then(function(doc) {
				if (doc.exists) {
					for(var x=0; x<doc.data().book.length; x++){
						if(doc.data().book[x].bookid==isbn){
							number=doc.data().book[x].number+1;
							console.log("book already in cart"+ number);
								db.collection("cart").doc(firebase.auth().currentUser.uid).set({
								book: firebase.firestore.FieldValue.arrayRemove({bookid: isbn, number:number-1}),
								
								//book: firebase.firestore.FieldValue.arrayUnion({Price: price}),
								//book: firebase.firestore.FieldValue.arrayUnion({number: 1}),
								//book:[isbn, price, 1],
									
								},{merge:true})
								.then(function() {
									
									console.log("Book Added to cart!");
									//window.open("./booklist.html", "_self");
									//successfully written to db
									
								})
								.catch(function(error) {
									console.error("Error writing document: ", error);
								});
							//cartAddDB(isbn,number,true);
							break;
						}
						else{
							//cartAddDB(isbn,1,false);
							number=1;
						}
						/*
						if(x==doc.data().book.length-1){
								console.log("book already in cart"+ number);
								db.collection("cart").doc(firebase.auth().currentUser.uid).set({
								//book: firebase.firestore.FieldValue.arrayRemove({bookid: isbn, number:number-1}),
								book: firebase.firestore.FieldValue.arrayUnion({bookid: isbn, number:number}),
								//book: firebase.firestore.FieldValue.arrayUnion({Price: price}),
								//book: firebase.firestore.FieldValue.arrayUnion({number: 1}),
								//book:[isbn, price, 1],
									
								},{merge:true})
								.then(function() {
									
									console.log("Book Added to cart!");
									window.open("./booklist.html", "_self");
									//successfully written to db
									
								})
								.catch(function(error) {
									console.error("Error writing document: ", error);
								});
						}
						*/
					}
					db.collection("cart").doc(firebase.auth().currentUser.uid).set({
		
					book: firebase.firestore.FieldValue.arrayUnion({bookid: isbn, number:number}),
					//book: firebase.firestore.FieldValue.arrayUnion({Price: price}),
					//book: firebase.firestore.FieldValue.arrayUnion({number: 1}),
					//book:[isbn, price, 1],
						
					},{merge:true})
					.then(function() {
						
						console.log("Book Added to cart!");
						window.alert("Book Added To Cart");
						window.open("./booklist.html", "_self");
						//successfully written to db
						
					})
					.catch(function(error) {
						console.error("Error writing document: ", error);
					});
				//console.log("output from for loop: " + doc.data().book[0].bookid);
			//if(doc.data().ISBN==isbn)
				//number=
				}else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
			}).catch(function(error) {
				console.log("Error getting document:", error);
			});
			//console.log(user.uid);
			// User is signed in.
			//*/
	
	
			/*
			//console.log("Number: "+ getNumber(isbn));
			db.collection("cart").doc(firebase.auth().currentUser.uid).set({
		
				book: firebase.firestore.FieldValue.arrayUnion({bookid: isbn, number:1}),
				//book: firebase.firestore.FieldValue.arrayUnion({Price: price}),
				//book: firebase.firestore.FieldValue.arrayUnion({number: 1}),
				//book:[isbn, price, 1],
					
			},{merge:true})
			.then(function() {
				
				console.log("Book Added to cart!");
				window.open("./booklist.html", "_self");
				//successfully written to db
				
			})
			.catch(function(error) {
				console.error("Error writing document: ", error);
			});
			*/
			
			//window.open("./booklist.html", "_self");
	  }
	});
}//addToCart



function removeFromCart(isbn){//test this
	var db = firebase.firestore();
	var docRef2 = db.collection("cart").doc(firebase.auth().currentUser.uid);
	docRef2.get().then(function(doc) {
		if (doc.exists) {
			for(var x=0; x<doc.data().book.length; x++){
				if(doc.data().book[x].bookid==isbn){
					number=doc.data().book[x].number;
					console.log("book already in cart"+ number);
					db.collection("cart").doc(firebase.auth().currentUser.uid).update({
						book: firebase.firestore.FieldValue.arrayRemove({bookid: doc.data().book[x].bookid, number: number}),
					})//,{merge:true})
					.then(function() {
						console.log("Book removed from cart!");
						window.open("./cart.html", "_self");
						//successfully written to db		
					})
					.catch(function(error) {
						console.error("Error writing document: ", error);
					});
						//cartAddDB(isbn,number,true);
					break;
				}//if
			}
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});
}


function removeCart(){
	firebase.auth().onAuthStateChanged(function(user) {//checks if user is signed in.
	  if (user) {//user is signed in.
		console.log("Logged in User uid:"+ user.uid);
		
	  } else {
		  var buttons=document.getElementsByClassName("cartbtn");
		  for (i = 0; i < buttons.length; i++) {
			buttons[i].style.display = "none";
		  }
		// No user is signed in.
	  }
	});
}//removeCart


function showCart(){
	var totalPrice=0;
	var totalItems=0;
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log("show cart UID:  "+user.uid);
		// User is signed in.
		mainCheckoutContainer=document.createElement("DIV");
		mainCheckoutContainer.setAttribute("id","mainCheckoutContainer");
		col=document.getElementsByClassName("col-md-7");
		
		console.log("show cart UID:  "+user.uid);
		var db = firebase.firestore();
		var docRef2 = db.collection("cart").doc(user.uid);
		docRef2.get().then(function(doc) {
			
			if (doc.exists) {
				for(var x=0; x<doc.data().book.length; x++){
					var number=doc.data().book[x].number;
					var docRef = db.collection("books").doc(doc.data().book[x].bookid);

					docRef.get().then(function(doc) {
		
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
						sellpriceper.innerHTML="Price: <strong>$"+(doc.data().SellingPrice$ / 1).toFixed(2)+"</strong> each";
						
						var buypriceper=document.createElement("p");
						buypriceper.innerHTML="Buying Price: <strong>$"+doc.data().BuyingPrice$+"</strong> each";
						
						shoppingCartItemsDetails.appendChild(atitle);
						shoppingCartItemsDetails.appendChild(author);
						shoppingCartItemsDetails.appendChild(condition);
						shoppingCartItemsDetails.appendChild(sellpriceper);
						
						
						var shoppingCartItemsQuantity=document.createElement("div");
						shoppingCartItemsQuantity.setAttribute("style", "float:right");
						var price=document.createElement("p");
						//console.log("type: " + typeof(number));
						var subtotal=parseFloat((doc.data().SellingPrice$*number/1).toFixed(2));
						console.log(typeof(subtotal));
						price.innerHTML="Subtotal: <strong>$"+ (subtotal/1).toFixed(2)+"</strong>";
						totalPrice= parseFloat(totalPrice)+parseFloat(subtotal);
						console.log("totalPrice: "+ totalPrice);
						var removebtn=document.createElement("button");
						removebtn.setAttribute("class", "btn btn-primary")
						removebtn.addEventListener("click", function(){removeFromCart(doc.data().ISBN)},false);
						removebtn.innerHTML="Remove";
						
						var stock=document.createElement("p");
						stock.innerHTML="Quantity in Stock: <strong>"+doc.data().Stock+"</strong>";
						
						var active=document.createElement("p");
						active.innerHTML="Active: <strong>"+doc.data().status+"</strong>";
						
						var br=document.createElement("br");
						var addtocart=document.createElement("a");
						
						addtocart.innerHTML="Number in cart: <strong>"+number+"</strong>";
						totalItems+=number;
						//shoppingCartItemsQuantity.appendChild(addtocart);
						
						shoppingCartItemsQuantity.appendChild(price);
						shoppingCartItemsQuantity.appendChild(addtocart);
						//shoppingCartItemsQuantity.appendChild(br);
						shoppingCartItemsQuantity.appendChild(stock);
						shoppingCartItemsQuantity.appendChild(removebtn);
						
						
						
						shoppingCartItemsContainer.appendChild(div1);
						shoppingCartItemsContainer.appendChild(shoppingCartItemsDetails);
						shoppingCartItemsContainer.appendChild(shoppingCartItemsQuantity);
						
						col[0].appendChild(shoppingCartItemsContainer);
						if(totalItems!=0){
							document.getElementById("cart total").innerHTML="Cart subtotal ("+totalItems+" items): $"+(totalPrice / 1).toFixed(2)+ " (USD)";
							document.getElementById("tditems").innerHTML="Items ("+totalItems+")";
							document.getElementById("tdprice").innerHTML="$<strong>"+(totalPrice / 1).toFixed(2);+"</strong>";
							document.getElementById("tdpricetotal").innerHTML="$<strong>"+(totalPrice / 1).toFixed(2)+"</strong>";
							setCartDetails(user.uid, (totalPrice / 1).toFixed(2));
						}else{
							document.getElementById("cart total").innerHTML="The cart is empty";
							setCartDetails(user.uid, 0.00);
						}
						
					}).catch(function(error) {
						console.log("Error getting document:", error);
					});	
					
				}
				if(doc.data().book.length==0){
						document.getElementById("cart total").innerHTML="The cart is empty";
						document.getElementById("tditems").innerHTML="Items (0)";
						document.getElementById("tdprice").innerHTML="$<strong>0.00</strong>";
						document.getElementById("tdpricetotal").innerHTML="$<strong>0.00</strong>";
						setCartDetails(user.uid, (totalPrice / 1).toFixed(2));
				}
				
			}
		}).catch(function(error) {
			console.log("Error getting document:", error);
		}).then(function(){
			//console.log(totalPrice);
			//setCartDetails(user.uid, (totalPrice / 1).toFixed(2));
			//setCartDetails(userID);
		});
  
  } else {
    // No user is signed in.
  }
});
	
}

function setCartDetails(cartID, price){
	var db = firebase.firestore();
	db.collection("cart").doc(cartID).update({
		TotalPrice: price,
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});
	
}

function applyPromo(){
	var inputcode=document.getElementById("promoinput").value;
	console.log()
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log("input code: "+ inputcode);
				
				var db = firebase.firestore();
				var docRef = db.collection("promotions").doc(inputcode);
				docRef.get().then(function(doc) {
					//var totalPrice=parseFloat(doc.data().TotalPrice);
					
					var total=document.getElementById("tdpricetotal").innerHTML.split("<strong>");
					total=total[1].split("</strong>");
					total=total[0];
					//console.log("totalPrice discount: "+doc.data().PromoDiscount);
					var price=parseFloat(total)*parseFloat(doc.data().PromoDiscount) / parseFloat(1);
					console.log("totalPrice: "+price);
					var totalItems=document.getElementById("tditems").innerHTML.split("(");
					totalItems=totalItems[1].split(")");
					console.log("totalItems: "+totalItems[0]);
					
					document.getElementById("cart total").innerHTML="Cart subtotal ("+totalItems[0]+" items): $"+(parseFloat(total)*parseFloat(doc.data().PromoDiscount) / 1).toFixed(2)+ " (USD)";
					document.getElementById("tdpromo").innerHTML="-$<strong>"+(parseFloat(total)*parseFloat(doc.data().PromoDiscount) / 1).toFixed(2)+"</strong>";
					document.getElementById("tdprice").innerHTML="$<strong>"+(parseFloat(total)*parseFloat(doc.data().PromoDiscount) / 1).toFixed(2)+"</strong>";
					document.getElementById("tdpricetotal").innerHTML="$<strong>"+(parseFloat(total)*parseFloat(doc.data().PromoDiscount) / 1).toFixed(2)+"</strong>";
					//*/
					
					db.collection("cart").doc(user.uid).update({
						TotalPrice: (parseFloat(total)*parseFloat(doc.data().PromoDiscount) / 1).toFixed(2),
						PromoApplied: inputcode,
					}).catch(function(error) {
						console.log("Error getting document:", error);
					});	
					window.alert("Promotional Code Applied!");
				}).catch(function(error) {
					window.alert("Invalid Promotional Code. Please try another.");
						console.log("Error getting document:", error);
				});
	} else {
    // No user is signed in.
  }
});		
	
}//applyPromo













