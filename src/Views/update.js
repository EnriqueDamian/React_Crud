import React from 'react';
import './../css/App.css';
import firebase from '../database/Firebase.js';
import { Link } from 'react-router-dom';


class create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            name: '',
            price: ''
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('productos').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                const items = doc.data();
                this.setState({
                    key: doc.id,
                    name: items.name,
                    price: items.price
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({ items: state });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { name, price } = this.state;

        const updateRef = firebase.firestore().collection('productos').doc(this.state.key);
        updateRef.set({
            name,
            price
        }).then((docRef) => {
            this.setState({
                key: '',
                name: '',
                price: ''
            });
            this.props.history.push("/")
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            EDIT items
                  </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={`/`} className="btn btn-success">Product List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description:</label>
                                <input type="text" className="form-control" name="price" value={this.state.price} onChange={this.onChange} placeholder="price" />
                            </div>
                         
                            <button type="submit" className="btn btn-success">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default create;
