// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
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
