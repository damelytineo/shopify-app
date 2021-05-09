import React, { Component } from "react";
import { Col, Row, Container, Image, Card, Button, InputGroup, FormControl, Form } from 'react-bootstrap';


class Home extends Component {
    state = {
        products: [],
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = () => {
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
        })
            .then((response) => {
                this.fetchProducts();
            });
    }

    onUpdate = (e, id) => {
        e.preventDefault();
        const form = new FormData(e.target);
        fetch('http://localhost:3000/products/' + id, {
            method: "PATCH",
            body: form
        })
            .then((response) => {
                if (response.ok) {
                    this.fetchProducts();
                } else {
                    throw new Error('Invalid input');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onDelete = (e, id) => {
        e.preventDefault();
        fetch('http://localhost:3000/products/' + id, {
            method: "DELETE"
        })
            .then((response) => {
                this.fetchProducts();
            });
    }


    render() {
        return (
            <Container>
                <Row className="mt-3">
                    <Col>
                        <Form onSubmit={this.onCreate}>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>Upload File</Form.Label>
                                <Col sm={4}><Form.Control type="file" id="image" name="image" placeholder="Description" /></Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>Description</Form.Label>
                                <Col sm={4}><Form.Control type="text" id="description" name="description" placeholder="Description" /></Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm={2}>Price</Form.Label>

                                <Col sm={4}><Form.Control type="text" id="price" name="price" placeholder="Price" /></Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm={{ span: 5}}><Button type="submit">Submit</Button></Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="my-3">
                    {this.state.products.map((product) => (
                        <Col sm={3} key={product.id} className="my-3">
                            <Form onSubmit={(e) => this.onUpdate(e, product.id)} >
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={product.image} className="Product-img"/>
                                    <Card.Body>
                                        <Card.Title>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Prepend>
                                                <InputGroup.Text id="addon">$</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl
                                                id="price"
                                                name="price"
                                                defaultValue={product.price}
                                                aria-label="price addon"
                                                aria-describedby="addon"
                                                />
                                            </InputGroup>
                                        </Card.Title>
                                        <Card.Text>{product.description}</Card.Text>
                                        <Button variant="outline-primary" as="input" type="submit" />{' '}
                                        <Button variant="outline-danger" onClick={(e) => this.onDelete(e, product.id)}>DELETE</Button>
                                    </Card.Body>
                                </Card>
                            </Form>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}

export default Home;
