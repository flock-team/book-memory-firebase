import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { shouldEventRun, markEventTried } from './utils/should-util';

const db = admin.firestore();

export const countUpBook = functions
  .region('asia-northeast1')
  .firestore.document('users/{userId}/books/{bookId}')
  .onCreate(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then((should) => {
      if (should) {
        db.doc(`users/${context.params.userId}`).update(
          'bookCount',
          admin.firestore.FieldValue.increment(1)
        );
        return markEventTried(eventId);
      }
      return;
    });
  });

export const countDownBook = functions
  .region('asia-northeast1')
  .firestore.document('users/{userId}/books/{bookId}')
  .onDelete(async (snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then((should) => {
      if (should) {
        db.doc(`users/${context.params.userId}`).update(
          'bookCount',
          admin.firestore.FieldValue.increment(-1)
        );
        return markEventTried(eventId);
      }
      return;
    });
  });
