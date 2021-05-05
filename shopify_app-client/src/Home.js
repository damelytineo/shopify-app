import React, { Component } from "react";

class Home extends Component {
    state = {
        image: {},
        products: [],
    };

    componentDidMount() {
        fetch("http://localhost:3000/products")
            .then((response) => response.json())
            .then((products) => {
                this.setState({ products: products });
            });
    }

    onChange = (e) => {
        let name = e.target.name
        this.setState({ [name]: e.target.value })
    };

    onSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("image", this.state.image);
        fetch(`http://localhost:3000/products`, {
            method: "POST",
            body: form,
        });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>Upload File</label>
                    <input type="file" name="image" onChange={this.onChange} />
                    <br />
                    <input type="submit" />
                </form>
                <div>
                    {this.state.products.map((product) => (
                        <div key={product.id}>
                            <img src={product.image} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Home;
