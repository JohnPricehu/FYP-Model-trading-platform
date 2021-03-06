import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import zxcvbn from 'zxcvbn';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    const reg =/^[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if(zxcvbn(password).guesses_log10  >= 8){
      if(reg.test(email)){
        if (password !== confirmPassword) {
          setMessage('Passwords do not match!')
          setPassword("")
          setConfirmPassword("")
        } else {
          dispatch(register(name, email, password))
        }
      }else {
        setMessage('Wrong email type!')}
        setEmail("")
        setPassword("")
        setConfirmPassword("")    
    }else{
      setMessage('The password strength is too weak, please reset the password!')
      setPassword("")
      setConfirmPassword("")
    }
    }


  return (
    <FormContainer>
      <h1 className='mt-5'>Register</h1>
      {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {loading && <Loading />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
        <Form.Label>Password Strength : </Form.Label>     
        <meter min="0" max="12" low="4" high="8" optimum="10" value={zxcvbn(password).guesses_log10}></meter>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
