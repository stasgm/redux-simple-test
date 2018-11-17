// tslint:disable:no-submodule-imports
import 'firebase/firestore';
import { firestore } from 'firebase/app';
// import 'firebase/auth';

import { firebaseDB } from '@src/firestore';
import { IArticle } from '@src/models';

const mapToObject = (res: any) => res;

export const firestoreApi = {
  load: (): Promise<IArticle[]> => {
    return mapToObject(
      firebaseDB
        .collection('list')
        .get()
        .then((snapshot: firestore.QuerySnapshot) =>
          snapshot.docs.map((docSnapshot: firestore.QueryDocumentSnapshot) => docSnapshot.data())
        )
    );
  },
  deleteAll: (): Promise<any> => {
    return deleteCollection(firebaseDB, 'list');
  },
  save: (list: any): Promise<any> => {
    return list.forEach((itm: any) => firebaseDB.collection('list').add(itm));
  }
};

function deleteCollection(db: any, collectionPath: string) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__');

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve, reject);
  });
}

function deleteQueryBatch(db: any, query: any, resolve: any, reject: any) {
  query
    .get()
    .then((snapshot: firestore.QuerySnapshot) => {
      // When there are no documents left, we are done
      if (snapshot.size === 0) {
        return 0;
      }

      // Delete documents in a batch
      const batch = db.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      return batch.commit().then(() => {
        return snapshot.size;
      });
    })
    .then((numDeleted: any) => {
      if (numDeleted === 0) {
        resolve();
        return;
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, resolve, reject);
      });
    })
    .catch(reject);
}
