import React from 'react';
import './../css/App.css';
import firebase from '../database/Firebase.js';
import { Link } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('productos');
    this.unsubscribe = null;
    this.state = {
      items: []
    };
  }

  TimeReal = (querySnapshot) => {
    const items = [];
    querySnapshot.forEach((doc) => {
      const { name, price } = doc.data();
      items.push({
        key: doc.id,
        doc,
        name,
        price,
      });
    });
    this.setState({
      items
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.TimeReal);
  }

  delete(id) {
    firebase.firestore().collection('productos').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }



  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              List Products
            </h3>
          </div>
          <div className="panel-body">
            <br />
            <h4><a className="btn btn-success" href="/create">Add Products</a></h4>
            <br />
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map(item =>
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <div className="btn-group btn-group-justified">
                  
                        <Link className="btn btn-secondary"  to={`/update/${item.key}`}>Edit</Link>
                        <button className="btn btn-danger" onClick={this.delete.bind(this, item.key)}>Delete</button>
                      </div>
                    </td>
                  </tr>

                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }


}

export default App;
