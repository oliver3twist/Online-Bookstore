const functions = require('firebase-functions');
const admin = require("firebase-admin");
//admin.initializeApp(functions.config().firebase);

const algoliasearch = require('algoliasearch');
const algolia = algoliasearch("08BYO8BOIP", "a8011f94c7d1237a61bde6a1c184bd0b");


/*
exports.updateIndex = functions.database.ref('/books/{ISBN}').onWrite(event => {

  const index = algolia.initIndex('dev_book');

  const bookId = event.params.ISBN
  const data = event.data.val()


  if (!data) {
    return index.deleteObject(bookId, (err) => {
      if (err) throw err
      console.log('Book Removed from Algolia Index', bookId)
    })
    
  }

  data['objectID'] = bookId

  return index.saveObject(data, (err, content) => {
    if (err) throw err
    console.log('Book Updated in Algolia Index', data.objectID)
  })


});
*/
//import * as functions from 'firebase-functions';
//import * as admin from 'firebase-admin';
//import * as algoliasearch from 'algoliasearch';

admin.initializeApp();
//const db = firebase.firestore();
//var docRef = functions.firestore.collection("books");
const records = [];
const index = algolia.initIndex('dev_book');
exports.updateBooksID = functions.firestore
    .document('books/{ISBN}')
    .onUpdate((change, context) => {
	
	const bookId = event.params.ISBN; 
    
    // ref to the parent document
    const docRef = admin.firestore().collection('books').doc(bookId)
    
    // get all comments and aggregate
    return docRef.collection('books').orderBy('ISBN', 'Title')
         .get()
         .then(querySnapshot => {

            // get the total comment count
            //const commentCount = querySnapshot.size

            const booksarr = []

            // add data from the 5 most recent comments to the array
            querySnapshot.forEach(doc => {
                booksarr.push( doc.data() )
            });

            booksarr.splice(5)

            // record last comment timestamp
            //const lastActivity = recentComments[0].createdAt

            // data to update on the document
            const data = { booksarr }
            
            // run update
            return docRef.update(data)
         })
         .catch(err => console.log(err) )
});
/*
const index = algolia.initIndex('dev_book');

exports.updateBooksID = functions.firestore
    .document('books/{ISBN}/books/{Title}/books/{Author}/books/{Publisher}/books/{Category}')
    .onUpdate((change, context) => {
        const newData = change.after.data();
        const object = [{
            objectID: context.params.ISBN,
			title: context.params.Title,
			author: context.params.Author,
			publisher: context.params.Publisher,
			category: context.params.Category,
            //...newData
        }];

        return index.partialUpdateObject(object);
    });
*/



