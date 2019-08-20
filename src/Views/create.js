import React from 'react';
import './../css/App.css';
import firebase from '../database/Firebase.js';

class create extends React.Component {

    constructor() {
        super();
        this.ref = firebase.firestore().collection('productos');
        this.state = {
            name: '',
            price: 0
        };
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { name, price } = this.state;

        this.ref.add({
            name,
            price          
        }).then((docRef) => {
            this.setState({
                name: '',
                price: 0
            });
            this.props.history.push("/")
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }




    render() {
        const { name, price } = this.state;
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <br />
                        <h3 className="panel-title">
                            ADD
                        </h3>
                        <br />

                    </div>
                    <div className="panel-body">
                        <h4><a href="/" className="btn btn-success">Products List</a></h4>
                        <br />
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} placeholder="name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="author">Price:</label>
                                <input type="text" className="form-control" name="price" value={price} onChange={this.onChange} placeholder="price" />
                            </div>
                            <button type="submit" className="btn btn-success">Add product</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default create;
