const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const algoliasearch = require('algoliasearch');
const algolia = algoliasearch("08BYO8BOIP", "a8011f94c7d1237a61bde6a1c184bd0b");



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