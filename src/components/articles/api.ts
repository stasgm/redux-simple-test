// tslint:disable:no-submodule-imports
import 'firebase/firestore';
import { firestore } from 'firebase/app';
// import 'firebase/auth';

import { firebaseDB } from '@src/firestore';
import { IArticle } from '@src/models';

const mapToObject = (res: any) => res;
const collectionName = 'list';

export const firestoreApi = {
  load: (): Promise<any> => {
    return mapToObject(
      firebaseDB
        .collection(collectionName)
        .get()
        .then((snapshot: firestore.QuerySnapshot) =>
          snapshot.docs.map((docSnapshot: firestore.QueryDocumentSnapshot) => docSnapshot.data())
        )
    );
  },
  save: (list: IArticle[]): Promise<any> => {
    console.log('save');
    try {
      list.forEach((itm: IArticle) => firebaseDB.collection(collectionName).add(itm));
      return Promise.resolve();
    } catch {
      return Promise.reject();
    }
  },
  deleteAll: (): Promise<any> => {
    // return Promise.resolve();
    try {
      deleteCollection(firebaseDB, collectionName);
      return Promise.resolve();
    } catch {
      return Promise.reject();
    }
  }
};

function deleteCollection(db: any, collectionPath: string) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__');

  deleteQueryBatch(db, query);
}

function deleteQueryBatch(db: any, query: any) {
  return query
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
        return;
      }
      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query);
      });
    })
    .catch((err: any) => new Error(err));
}
