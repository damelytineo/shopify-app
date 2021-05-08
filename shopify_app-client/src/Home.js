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

    onCreate = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        fetch('http://localhost:3000/products', {
            method: "POST",
            body: form
        });
    }

    onUpdate = (e, id) => {
        e.preventDefault();
        const form = new FormData(e.target);
        fetch('http://localhost:3000/products/' + id, {
            method: "PATCH",
            body: form
        });
    }

    onDelete = (e, id) => {
        e.preventDefault();
        fetch('http://localhost:3000/products/' + id, {
            method: "DELETE"
        });
    }

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.onCreate}>
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

                    {this.state.products.map((product) => (
                        <form key={product.id} onSubmit={(e) => this.onUpdate(e, product.id)}  >
                            <img src={product.image} alt="" />
                            <p> {product.description}</p>
                            <label>Price</label>
                            <input type="text" id="price" name="price" defaultValue={product.price} />
                            <br />
                            <input type="submit" />
                            <button onClick={(e) => this.onDelete(e, product.id)}>DELETE</button>
                        </form>
                    ))}
                </div>
            </div>
        );
    }
}

export default Home;
