import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const MemberSearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/member/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline="false">
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Goods...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button
        // style={{ backgroundColor: 'red', borderRadius: '20%', color: 'white' }}
        type='submit'
        variant='outline-success'
        className='p-2'
      >
        Search
      </Button>
    </Form>
  )
}

export default MemberSearchBox 
