import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from 'react-bootstrap/Modal';

const Filter = ({ make = [], model = [], year = [], onApplyFilter }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [filters, setFilters] = useState({
        make: "",
        model: "",
        year: "",
        priceSort: "",
        dateSort: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleClear = () => {
        setFilters({
            make: "",
            model: "",
            year: "",
            priceSort: "",
            dateSort: "",
        });
    };

    const handleApply = () => {
        console.log("filters--------------->", filters);
        onApplyFilter(filters);
        handleClose(); // Close modal after applying filter
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow} size="sm" style={{width:'6rem',marginLeft:'8px'}}>
            Filter 
            <span style={{marginLeft:'5px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/>
                </svg>
            </span>
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{fontSize:'1rem'}}>Filter Options</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="g-2">
                        <Col xs={12} sm={6} md={4}>
                            <Form.Select name="make" value={filters.make} onChange={handleChange} size="sm">
                                <option value="">Make</option>
                                {make.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>

                        <Col xs={12} sm={6} md={4}>
                            <Form.Select name="model" value={filters.model} onChange={handleChange} size="sm">
                                <option value="">Model</option>
                                {model.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>

                        <Col xs={12} sm={6} md={4}>
                            <Form.Select name="year" value={filters.year} onChange={handleChange} size="sm">
                                <option value="">Year</option>
                                {year.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>

                        <Col xs={12} sm={6} md={6}>
                            <Form.Select name="priceSort" value={filters.priceSort} onChange={handleChange} size="sm">
                                <option value="">Sort by Price</option>
                                <option value="ascending">Ascending</option>
                                <option value="descending">Descending</option>
                            </Form.Select>
                        </Col>

                        <Col xs={12} sm={6} md={6}>
                            <Form.Select name="dateSort" value={filters.dateSort} onChange={handleChange} size="sm">
                                <option value="">Sort by Date</option>
                                <option value="ascending">Ascending</option>
                                <option value="descending">Descending</option>
                            </Form.Select>
                        </Col>

                        {/* <Col xs={12} sm={6} md={6}>
                            <ButtonGroup className="w-100">
                                <Button variant="outline-secondary" size="sm" onClick={handleClear}>
                                    Clear Filter
                                </Button>
                                <Button variant="primary" size="sm" onClick={handleApply}>
                                    Apply Filter
                                </Button>
                            </ButtonGroup>
                        </Col> */}

                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup className="w-100">
                        <Button variant="outline-secondary" size="sm" onClick={handleClear}>
                            Clear Filter
                        </Button>
                        <Button variant="primary" size="sm" onClick={handleApply}>
                            Apply Filter
                        </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Filter;
