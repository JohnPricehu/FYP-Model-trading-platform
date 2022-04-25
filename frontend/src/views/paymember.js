import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import { payMember } from '../actions/userActions'


const PaymemberScreen = ({ history }) => {

  const dispatch = useDispatch()

  const payHandler = () => {
    dispatch(payMember())
    history.push('/')
  }


  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <h3>Join us now! Get more for just $10</h3>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='Credit'
              id='Credit'
              name='paymentMethod'
              value='Credit'
              checked
            //   onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              type='radio'
              label='PayPal'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
            //   onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button
                      type='button'
                      className='btn btn-block'
                      onClick={payHandler}
                    >
          Pay Membership Fee
        </Button>
    </FormContainer>
  )
}

export default PaymemberScreen