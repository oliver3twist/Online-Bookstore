function checkAdmin(){
	firebase.auth().onAuthStateChanged(function(user) {//checks if user is signed in.
	  if (user) {//user is signed in.
		var db = firebase.firestore();
			var docRef = db.collection("users").doc(user.uid);

			docRef.get().then(function(doc) {
			if (doc.exists) {
				if(doc.data().Admin==false){
					window.open("./homeReg.html", "_self");
				}
				console.log("Document data:", doc.data());
			} else {
				window.open("./index.html", "_self");// refresh page
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
			}).catch(function(error) {
				console.log("Error getting document:", error);
			});
		console.log("Logged in User uid:"+ user.uid);
		return true;
	  } else {
		  window.open("./index.html", "_self");// refresh page
		  console.log("User is not logged in");
		  return false;
		// No user is signed in.
	  }
	});
	
}

function checkAdminBool(){
	firebase.auth().onAuthStateChanged(function(user) {//checks if user is signed in.
	  if (user) {//user is signed in.
		var db = firebase.firestore();
			var docRef = db.collection("users").doc(user.uid);

			docRef.get().then(function(doc) {
			if (doc.exists) {
				if(doc.data().Admin==false){
					//window.open("./homeReg.html", "_self");
					false;
				}
				console.log("Document data:", doc.data());
			} else {
				false;//window.open("./index.html", "_self");// refresh page
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
			}).catch(function(error) {
				console.log("Error getting document:", error);
			});
		console.log("Logged in User uid:"+ user.uid);
		return true;
	  } else {
		  //window.open("./index.html", "_self");// refresh page
		  console.log("User is not logged in");
		  return false;
		// No user is signed in.
	  }
	});
	
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

function promoteUser(userid){
	firebase.auth().onAuthStateChanged(function(user){
		if (user) {
			var db = firebase.firestore();
			
		db.collection("users").doc(userid).update({
		Admin: true ,
		})
		.then(function() {
			window.open("./promoteAdmin.html", "_self");// refresh page
			console.log("User successfully promoted!");
			//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
		
			//console.log(user.uid);//test if user is logged in.
		}//if(user)
	});
	//console.log("user id promote: "+userid);//for testing
}//promote user
function demoteUser(userid){
	firebase.auth().onAuthStateChanged(function(user){
		if (user) {
			var db = firebase.firestore();
			
		db.collection("users").doc(userid).update({
		Admin: false ,
		})
		.then(function() {
			window.open("./promoteAdmin.html", "_self");// refresh page
			console.log("User successfully promoted!");
			//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
		
			//console.log(user.uid);//test if user is logged in.
		}//if(user)
	});
	//console.log("user id promote: "+userid);//for testing
}//demote user

function suspendUser(userid){
	firebase.auth().onAuthStateChanged(function(user){
		if (user) {
			var db = firebase.firestore();
			
		db.collection("users").doc(userid).update({
		status: false ,
		})
		.then(function() {
			window.open("./promoteAdmin.html", "_self");// refresh page
			console.log("User successfully Suspended!");
			//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
			//console.log(user.uid);//test if user is logged in.
		}//if(user)
	});
	//console.log("user id promote: "+userid);//for testing
}//suspend user

function unsuspendUser(userid){
	firebase.auth().onAuthStateChanged(function(user){
		if (user) {
			var db = firebase.firestore();
			
		db.collection("users").doc(userid).update({
		status: true ,
		})
		.then(function() {
			window.open("./promoteAdmin.html", "_self");// refresh page
			console.log("User successfully Suspended!");
			//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
			//console.log(user.uid);//test if user is logged in.
		}//if(user)
	});
	//console.log("user id promote: "+userid);//for testing
}//unsuspend user

function showAllUsers(){
	
	  var user=document.getElementById("userlist");
	var db = firebase.firestore();
	db.collection("users").get().then(function(querySnapshot) {
		//var table = document.getElementById("usertable");
    querySnapshot.forEach(function(doc) {
		
		var user=document.getElementById("userlist");
			
			var shoppingCartItemsContainer = document.createElement("DIV");
			shoppingCartItemsContainer.className = "shoppingCartItemsContainer";
			var br=document.createElement("br");
			
			var div1 = document.createElement("div");
			div1.setAttribute("style", "width: 100px; height: 100px; float: left")
			/*
			var a=document.createElement("a");
			a.setAttribute("href","#");
			a.addEventListener("click", function(){
				var statement="./bookdetails.html?ISBN="+doc.data().ISBN;
				window.location.href=statement;
				//window.open(statement, "_self");
			},false);
			var imgsrc=document.createElement("img");
			imgsrc.src=doc.data().Cover;
			imgsrc.addEventListener("click", function(){
				var statement="./bookdetails.html?ISBN="+doc.data().ISBN;
				window.location.href=statement;
				//window.open(statement, "_self");
			},false);
			//imgsrc.setAttribute("href", )
			imgsrc.setAttribute("alt", "placeholder");
			imgsrc.setAttribute("style", "width: 100px; height: 100px; float: left");
			a.appendChild(imgsrc);
			*/
			//div1.appendChild(a);
			
			var shoppingCartItemsDetails=document.createElement("div");
			shoppingCartItemsDetails.className="shoppingCartItemsDetails";
			var atitle=document.createElement("a");
			//atitle.setAttribute("href","#");
			//atitle.innerHTML=doc.data().Title;
			var name=document.createElement("p");
			name.innerHTML="Name: <strong>"+doc.data().FirstName +" "+ doc.data().LastName +"</strong>";
			
			var condition=document.createElement("p");
			condition.innerHTML="Condition: <strong>"+doc.data().Condition+"</strong>";
			
			var sellpriceper=document.createElement("p");
			//sellpriceper.innerHTML="Selling Price: <strong>$"+doc.data().SellingPrice$+"</strong> each";
			
			var buypriceper=document.createElement("p");
			//buypriceper.innerHTML="Buying Price: <strong>$"+doc.data().BuyingPrice$+"</strong> each";
			
			//shoppingCartItemsDetails.appendChild(atitle);
			shoppingCartItemsDetails.appendChild(name);
			//shoppingCartItemsDetails.appendChild(condition);
			//shoppingCartItemsDetails.appendChild(sellpriceper);
			//shoppingCartItemsDetails.appendChild(buypriceper);
			
			var shoppingCartItemsQuantity=document.createElement("div");
			shoppingCartItemsQuantity.setAttribute("style", "float:right");
			//var price=document.createElement("p");
			//price.innerHTML="Price: <strong>$"+doc.data().SellingPrice$+"</strong>";
			/*
			var editbtn=document.createElement("button");
			editbtn.addEventListener("click", function(){
				var statement="./editbookform.html?ISBN="+doc.data().ISBN;
				window.location.href=statement;
				//window.open(statement, "_self");
			},false);
			//editbtn.addEventListener("click", function(){editBook(doc.data().ISBN)},false);
			//setAttribute("onclick", editBook(doc.data().ISBN));
			editbtn.innerHTML="Edit Book";
			*/
			//start of modal
			
			//end of modal
			if(doc.data().Admin==true){
				var promotebtn=document.createElement("button");
				promotebtn.addEventListener("click", function(){demoteUser(doc.id)},false);
				//setAttribute("onclick", deleteBook(doc.data().ISBN));
				promotebtn.innerHTML="Demote User";
			}
			else{
				var promotebtn=document.createElement("button");
				promotebtn.addEventListener("click", function(){promoteUser(doc.id)},false);
				//setAttribute("onclick", deleteBook(doc.data().ISBN));
				promotebtn.innerHTML="Unsuspend User";
			}
			
			if(doc.data().status==true){
				var deletebtn=document.createElement("button");
				deletebtn.addEventListener("click", function(){suspendUser(doc.id)},false);
				//setAttribute("onclick", deleteBook(doc.data().ISBN));
				deletebtn.innerHTML="Suspend User";
			}
			else{
				var deletebtn=document.createElement("button");
				deletebtn.addEventListener("click", function(){unsuspendUser(doc.id)},false);
				//setAttribute("onclick", deleteBook(doc.data().ISBN));
				deletebtn.innerHTML="Unsuspend User";
			}
			/*
			var deletebtn=document.createElement("button");
			deletebtn.addEventListener("click", function(){deleteBook(doc.data().ISBN)},false);
			//setAttribute("onclick", deleteBook(doc.data().ISBN));
			deletebtn.innerHTML="Delete Book";
			*/
			//var stock=document.createElement("p");
			//stock.innerHTML="Quantity on Hand: <strong>"+doc.data().Stock+"</strong>";
			var active=document.createElement("p");
			active.innerHTML="Suspended: <strong>"+!doc.data().status+"</strong>";
			var admin=document.createElement("p");
			admin.innerHTML="Admin Status: <strong>"+doc.data().Admin+"</strong>";
			var br=document.createElement("br");
			//shoppingCartItemsQuantity.appendChild(price);
			//shoppingCartItemsQuantity.appendChild(editbtn);
			shoppingCartItemsQuantity.appendChild(br);
			shoppingCartItemsQuantity.appendChild(deletebtn);
			//shoppingCartItemsQuantity.appendChild(br);
			//shoppingCartItemsQuantity.appendChild(stock);
			
			shoppingCartItemsQuantity.appendChild(active);
			shoppingCartItemsQuantity.appendChild(br);
			shoppingCartItemsQuantity.appendChild(br);
			shoppingCartItemsQuantity.appendChild(promotebtn);
			shoppingCartItemsQuantity.appendChild(admin);
			shoppingCartItemsContainer.appendChild(div1);
			shoppingCartItemsContainer.appendChild(shoppingCartItemsDetails);
			shoppingCartItemsContainer.appendChild(shoppingCartItemsQuantity);
			li=document.createElement("LI");
			li.appendChild(shoppingCartItemsContainer);
			user.appendChild(li);
		});
	});
	
}//showAllUsers

function addBook(url){
	
		//console.log(url);
		var isbn=document.getElementById("ISBN").value;
		var db = firebase.firestore();
		db.collection("books").doc(isbn).set({
				Title: document.getElementById("booktitle").value,
				Author: document.getElementById("author").value ,
				Edition: document.getElementById("edition").value ,
				ISBN: document.getElementById("ISBN").value ,
				Cover:url,
				BuyingPrice$: document.getElementById("buyingprice").value ,
				SellingPrice$: document.getElementById("sellingprice").value ,
				Stock: document.getElementById("stock").value ,
				Condition: document.getElementById("condition").value,
				Publisher: document.getElementById("publisher").value ,
				Category: document.getElementById("category").value,
				status: true,//book active?
			})
			.then(function() {
				onFileSelected(event);
				window.open("./editbookAdmin.html", "_self");
				console.log("Book Added!");
				//successfully written to db
				
			})
			.catch(function(error) {
				console.error("Error writing document: ", error);
			});
		
}//addbook

function addPromotion(){
		//console.log(url);
		promocode=document.getElementById("promocode").value
		if(document.getElementById("specificISBN").checked==true){
			var isbn=document.getElementById("ISBN").value;
		}
		else{
			var isbn=null;
		}
		
		var db = firebase.firestore();
		db.collection("promotions").doc(promocode).set({
				PromoCode: promocode,
				PromoDesc: document.getElementById("promodesc").value ,
				StartDate: firebase.firestore.Timestamp.fromDate(new Date(document.getElementById("datestart").value)),
				//StartDate: document.getElementById("datestart").value ,
				//EndDate: document.getElementById("dateend").value ,
				EndDate: firebase.firestore.Timestamp.fromDate(new Date(document.getElementById("dateend").value)),
				Active: document.getElementById("status").value ,
				ISBN: isbn ,
				SentToUsers: false,
			})
			.then(function() {
				//console.log("time"+ firebase.firestore.Timestamp.fromDate(new Date(document.getElementById("datestart").value)));
				window.open("./editpromotionsAdmin.html", "_self");
				console.log("Promo Added!");
				//successfully written to db
			})
			.catch(function(error) {
				console.error("Error writing document: ", error);
			});
}//addbook

function showAllBooksOriginal(){
	//var book=document.getElementById("bookentry");
	//var copy=book.cloneNode(true);
	//copy.setAttribute("display", show);
	//document.getElementById("booklist").appendChild(copy);
	list=document.getElementById("booklist");
	var db = firebase.firestore();
	db.collection("books").get().then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
			var book=document.getElementById("bookentry");
			var copy=book.cloneNode(true);
			copy.setAttribute("display", true);
			document.getElementById("booktitle").innerHTML=doc.data().Title;
			document.getElementById("condition").innerHTML=doc.data().Condition;
			document.getElementById("sellingprice").innerHTML="<strong> $"+doc.data().SellingPrice$+"</strong> each";
			document.getElementById("sellingprice2").innerHTML="Price: <strong> $"+doc.data().SellingPrice$+"</strong>";
			if(doc.data().Cover!=null){
				document.getElementById("coverpic").src=doc.data().Cover;
				
			}
			else if(doc.data().Cover.length=0){
				document.getElementById("coverpic").src="https://dummyimage.com/100x100/000/fff";
			}
			else{
				document.getElementById("coverpic").src="https://dummyimage.com/100x100/000/fff";
			}
			
			//copy.setAttribute("onclick",deleteBook(doc.data().ISBN));
			list.appendChild(copy);
			
			// doc.data() is never undefined for query doc snapshots
			//console.log(doc.id, " => ", doc.data());
		});
	});
	
	
	
	
}//showAllUsers


function showAllBooks(){
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
			a.setAttribute("href","#");
			a.addEventListener("click", function(){
				var statement="./bookdetails.html?ISBN="+doc.data().ISBN;
				window.location.href=statement;
				//window.open(statement, "_self");
			},false);
			var imgsrc=document.createElement("img");
			imgsrc.src=doc.data().Cover;
			imgsrc.addEventListener("click", function(){
				var statement="./bookdetails.html?ISBN="+doc.data().ISBN;
				window.location.href=statement;
				//window.open(statement, "_self");
			},false);
			//imgsrc.setAttribute("href", )
			imgsrc.setAttribute("alt", "placeholder");
			imgsrc.setAttribute("style", "width: 100px; height: 100px; float: left");
			a.appendChild(imgsrc);
			div1.appendChild(a);
			
			var shoppingCartItemsDetails=document.createElement("div");
			shoppingCartItemsDetails.className="shoppingCartItemsDetails";
			var atitle=document.createElement("a");
			atitle.setAttribute("href","#");
			atitle.innerHTML=doc.data().Title;
			var author=document.createElement("p");
			author.innerHTML="By: <strong>"+doc.data().Author+"</strong>";
			
			var condition=document.createElement("p");
			condition.innerHTML="Condition: <strong>"+doc.data().Condition+"</strong>";
			
			var sellpriceper=document.createElement("p");
			sellpriceper.innerHTML="Selling Price: <strong>$"+doc.data().SellingPrice$+"</strong> each";
			
			var buypriceper=document.createElement("p");
			buypriceper.innerHTML="Buying Price: <strong>$"+doc.data().BuyingPrice$+"</strong> each";
			
			shoppingCartItemsDetails.appendChild(atitle);
			shoppingCartItemsDetails.appendChild(author);
			shoppingCartItemsDetails.appendChild(condition);
			shoppingCartItemsDetails.appendChild(sellpriceper);
			shoppingCartItemsDetails.appendChild(buypriceper);
			
			var shoppingCartItemsQuantity=document.createElement("div");
			shoppingCartItemsQuantity.setAttribute("style", "float:right");
			var price=document.createElement("p");
			price.innerHTML="Price: <strong>$"+doc.data().SellingPrice$+"</strong>";
			var editbtn=document.createElement("button");
			editbtn.addEventListener("click", function(){
				var statement="./editbookform.html?ISBN="+doc.data().ISBN;
				window.location.href=statement;
				//window.open(statement, "_self");
			},false);
			//editbtn.addEventListener("click", function(){editBook(doc.data().ISBN)},false);
			//setAttribute("onclick", editBook(doc.data().ISBN));
			editbtn.innerHTML="Edit Book";
			
			//start of modal
			
			//end of modal
			var deletebtn=document.createElement("button");
			deletebtn.addEventListener("click", function(){deleteBook(doc.data().ISBN)},false);
			//setAttribute("onclick", deleteBook(doc.data().ISBN));
			deletebtn.innerHTML="Delete Book";
			var stock=document.createElement("p");
			stock.innerHTML="Quantity on Hand: <strong>"+doc.data().Stock+"</strong>";
			var active=document.createElement("p");
			active.innerHTML="Active: <strong>"+doc.data().status+"</strong>";
			var br=document.createElement("br");
			shoppingCartItemsQuantity.appendChild(price);
			shoppingCartItemsQuantity.appendChild(editbtn);
			shoppingCartItemsQuantity.appendChild(br);
			shoppingCartItemsQuantity.appendChild(deletebtn);
			//shoppingCartItemsQuantity.appendChild(br);
			shoppingCartItemsQuantity.appendChild(stock);
			
			shoppingCartItemsQuantity.appendChild(active);
			
			
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
function onFileSelected(){
	
    //var selectedFile = event.target.files[0];
	var selectedFile = document.getElementById("coverlocal").files[0];
    if (selectedFile) {
        //console.log(firebase.auth().currentUser)
        var fileName = Date.now().toString(36) + Math.random().toString(36).substr(2,9);
			//return new Promise(function(resolve,reject){
			var storage = firebase.storage();
			var storageRef = storage.ref();
			var picImagesRef = storageRef.child('images/' + fileName);

			var uploadTask = picImagesRef.put(selectedFile);

			uploadTask.on('state_changed', function(snapshot)
			{
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');
				switch (snapshot.state) {
				  case firebase.storage.TaskState.PAUSED: // or 'paused'
					console.log('Upload is paused');
					break;
				  case firebase.storage.TaskState.RUNNING: // or 'running'
					console.log('Upload is running');
					break;
				}
			  }, function(error) {
					// Handle unsuccessful uploads
			  }, function() {
				  
					uploadTask.snapshot.ref.getDownloadURL().then(function(url)
					{
						//document.getElementById("cover").innerHTML=url;
						addBook(url);
						
					})
			})
		//});

    }
	
}//onfileselect


function deleteBook(ISBN){
	var db = firebase.firestore();
	db.collection("books").doc(ISBN).delete().then(function() {
		
		console.log("Document successfully deleted!");
		window.open("./editbookAdmin.html", "_self");
	}).catch(function(error) {
		console.error("Error removing document: ", error);
	});
	
}

function fillForm(ISBN){
	console.log(ISBN);
	var db = firebase.firestore();
	var docRef = db.collection("books").doc(ISBN);
	console.log()
	docRef.get().then(function(doc) {
	if (doc.exists) {
		console.log("Document data:", doc.data().Title);
		document.getElementById("booktitle").value=doc.data().Title;
		
		
		document.getElementById("author").value=doc.data().Author;
		document.getElementById("edition").value=doc.data().Edition;
		document.getElementById("ISBN").value=doc.data().ISBN;
		document.getElementById("cover").value=doc.data().Cover;
		document.getElementById("buyingprice").value=doc.data().BuyingPrice$;
		document.getElementById("sellingprice").value=doc.data().SellingPrice$;
		document.getElementById("stock").value=doc.data().Stock;
		document.getElementById("condition").value=doc.data().Condition;
		document.getElementById("publisher").value=doc.data().Publisher;
		document.getElementById("category").value=doc.data().Category;
	} else {
				// doc.data() will be undefined in this case
		console.log("No such document!");
	}
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});

}

function editBook(){
	var db = firebase.firestore();
		ISBN=document.getElementById("ISBN").value;
		
		db.collection("books").doc(ISBN).update({
		Title: document.getElementById("booktitle").value,
		Author: document.getElementById("author").value ,
		Edition: document.getElementById("edition").value ,
		ISBN: document.getElementById("ISBN").value ,
		Cover:document.getElementById("cover").value,//need to enhance this
		BuyingPrice$: document.getElementById("buyingprice").value ,
		SellingPrice$: document.getElementById("sellingprice").value ,
		Stock: document.getElementById("stock").value ,
		Condition: document.getElementById("condition").value,
		Publisher: document.getElementById("publisher").value ,
		Category: document.getElementById("category").value,
		status: true,//book active?
		})
		.then(function() {
			console.log("Book successfully Updated!");
			window.open("./editbookAdmin.html", "_self");
			//successfully written to db, new send email verification
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});//end add to db
		
			//console.log(user.uid);//test if user is logged in.
		
	
	
	
}