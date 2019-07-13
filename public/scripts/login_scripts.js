function init()
{
    //If there is already a user signed in, navigate to the home page
    var user = firebase.auth().currentUser
    if(user)
    {
        window.open("../public/home.html", "_self")
    }
}

function loginWithEmailAndPassword()
{
    var email = document.getElementById("login_username").value
    var password = document.getElementById("login_password").value

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
        window.open("../public/home.html", "_self")
    }).catch(function(error) {
        alert(error.message)
    })
}