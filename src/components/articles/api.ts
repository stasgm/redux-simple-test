// tslint:disable:no-submodule-imports
import 'firebase/firestore';
import { firestore } from 'firebase/app';
// import 'firebase/auth';

import { firebaseDB } from '@src/firestore';
import { IArticle } from '@src/models';

const collectionName = 'list';

export const firestoreApi = {
  load: async (): Promise<any> => {
    try {
      const snapshot = await firebaseDB.collection(collectionName).orderBy('orderNum', 'desc'). get();
      return snapshot.docs.map((docSnapshot: firestore.QueryDocumentSnapshot) => docSnapshot.data());
    } catch (err) {
      return Promise.reject(err);
    }
  },
  save: async (list: IArticle[]): Promise<any> => {
    try {
      await list.forEach((itm: IArticle) => firebaseDB.collection(collectionName).add(itm));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  },
  add: async (record: IArticle): Promise<any> => {
    try {
      const snapshot = await firebaseDB.collection(collectionName).doc(record.key).set(record);
      // return snapshot.docs.map((docSnapshot: firestore.QueryDocumentSnapshot) => docSnapshot.data());
    } catch (err) {
      return Promise.reject(err);
    }
  },
  update: async (record: IArticle): Promise<any> => {
    try {
      const snapshot = await firebaseDB.collection(collectionName).doc(record.key).set(record);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  delete: async (record: IArticle): Promise<any> => {
    try {
      const snapshot = await firebaseDB.collection(collectionName).doc(record.key).delete();
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  },
  deleteAll: async (): Promise<any> => {
    try {
      await deleteCollection(firebaseDB, collectionName);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
};

function deleteCollection(db: any, collectionPath: string) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__');

  return new Promise((resolve, reject) => deleteQueryBatch(db, query, resolve, reject));
}

function deleteQueryBatch(db: any, query: any, resolve: any, reject: any) {
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
        resolve()
        return ;
      }
      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, resolve, reject);
      });
    })
    .catch((err: any) => reject(err));
}
