import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const FormContainer = ({children}) => {
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={2} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
