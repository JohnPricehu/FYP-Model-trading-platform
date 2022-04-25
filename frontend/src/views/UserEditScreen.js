import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [wallet, setWallet] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [isMember, setIsMember] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setPhone(user.email)
        setWallet(user.wallet)
        setIsAdmin(user.isAdmin)
        setIsMember(user.isMember)
      }
    }
  }, [
    dispatch,
    history,
    successUpdate,
    user._id,
    user.email,
    user.isAdmin,
    user.isMember,
    user.name,
    user.phone,
    userId,
    user.wallet
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, phone, wallet, isAdmin, isMember }))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loading />}
        {errorUpdate && <ErrorMessage variant='danger'>{errorUpdate}</ErrorMessage>}
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage variant='danger'>{error}</ErrorMessage>
        ) : (
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

            <Form.Group controlId='phone'>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type='phone'
                placeholder='Enter Phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='wallet'>
              <Form.Label>wallet</Form.Label>
              <Form.Control
                type='text'
                placeholder='Change wallet'
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='ismember'>
              <Form.Check
                type='checkbox'
                label='Is Member'
                checked={isMember}
                onChange={(e) => setIsMember(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
