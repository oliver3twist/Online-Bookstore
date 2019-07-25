const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const env = functions.config();

import * as algoliasearch from 'algoliasearch';

// Initialize the Algolia Client
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('dev_book');

exports.indexBooks = functions.firestore
  .document('books/{bookId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const objectID = snap.id;

    // Add the data to the algolia index
    return index.addObject({
      objectID,
      ...data
    });
});


exports.unindexBooks = functions.firestore
  .document('books/{bookId}')
  .onDelete((snap, context) => {
    const objectId = snap.id;

    // Delete an ID from the index
    return index.deleteObject(objectId);
});