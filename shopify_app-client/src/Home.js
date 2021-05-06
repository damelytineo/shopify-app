import React, { Component } from "react";

class Home extends Component {
    state = {
        products: []
    }

    componentDidMount() {
        fetch("http://localhost:3000/products")
            .then((response) => response.json())
            .then((products) => {
                this.setState({ products: products });
            });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(document.querySelector('form'));
        fetch(`http://localhost:3000/products`, {
            method: "POST",
            body: form
        });
    }

    render() {
        return (
            <div>
                <form id="form" name="form" onSubmit={this.onSubmit}>
                    <label>Upload File</label>
                    <input type="file" id="image" name="image" />
                    <br />
                    <label>Description</label>
                    <input type="text" id="description" name="description" />
                    <br />
                    <label>Price</label>
                    <input type="text" id="price" name="price" />
                    <br />
                    <input type="submit" />
                </form>
                <div>
                    {this.state.products.map((product) => (
                        <div key={product.id}>
                            <img src={product.image} alt="" />
                            <p> {product.description}</p>
                            <p> {product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Home;
