"use strict";
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');
const ALGOLIA_APP_ID = '08BYO8BOIP';
const ALGOLIA_ADMIN_KEY = 'a8011f94c7d1237a61bde6a1c184bd0b';
const ALOGOLIA_INDEX_NAME = 'dev_book';
admin.initializeApp(functions.config().firebase);
exports.firestoreToAlgolia = functions.https.onRequest((req, res) => {
    const arr = [];
    admin.firestore().collection('books').get().then(docs => {
        docs.forEach(doc => {
            const verb = doc.data();
            verb.objectID = doc.id;
            arr.push(verb);
        });
        const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
        const index = client.initIndex(ALOGOLIA_INDEX_NAME);
        index.saveObjects(arr, (err, content) => {
            if (err)
                res.status(500);
            res.status(200).send(content);
        });
    });
});
//# sourceMappingURL=index.js.map