import * as functions from 'firebase-functions';
import { deleteCollectionByPath } from './utils/firebase-util';

export const deleteUserAccount = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async (user, _) => {
    const uid = user.uid;
    const deleteAllBooks = deleteCollectionByPath(`users/${uid}/books`); //パスを指定
    return Promise.all([deleteAllBooks]);
  });
