/* import { firebaseDB } from '../articles/firestore';
import React from 'react';
import { firestore } from 'firebase';

interface IState {
  [propName: string]: string;
}

export class MyList extends React.Component<{}, IState> {
  public state: Readonly<IState> = {
    key: '',
    name: ''
  };

  private handleInputChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const db = firebaseDB.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const userRef = db.collection('list').add({
      key: this.state.key,
      name: this.state.name
    });
    this.setState({
      key: '',
      name: ''
    });

    e.preventDefault();
  };

  private updateData = (snapshot: firestore.QuerySnapshot) => {
    const docs = snapshot.docs.map((docSnapshot: firestore.QueryDocumentSnapshot) => ({
      id: docSnapshot.id,
      data: docSnapshot.data()
    }));

    this.setState(docs[1].data);
    console.log(docs);
  }

  private handleGetData = () => {
    const db = firebaseDB.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection("list").onSnapshot(this.updateData)
  }

  public render() {
    return (
      <div>
        <button onClick={this.handleGetData}>get data</button>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="key" placeholder="key" onChange={this.handleInputChange} value={this.state.key} />
          <input type="text" name="name" placeholder="name" onChange={this.handleInputChange} value={this.state.name} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
 */
