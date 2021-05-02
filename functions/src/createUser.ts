import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user) => {
    if (user) {
      db.doc(`users/${user.uid}`).set({
        bookCount: 0,
      });
    }
  });
