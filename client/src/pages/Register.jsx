/* eslint-disable no-unused-vars */
import React from "react"
import { Form, Link } from "react-router-dom"
import FormInput from "../components/FormInput"
import SubmitBtn from "../components/SubmitBtn"

const Register = () => {
  return (
    <section className='h-screen grid place-items-center'>
    <Form
      method='POST'
      className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
    >
      <h4 className='text-center text-3xl font-bold'>Register</h4>
      <FormInput type='file' label='avatar' name='avatar'
       accept = "image/*" 
       size = "pt-2"/>
      <FormInput type='text' label='name' name='name' />
      <FormInput type='email' label='email' name='email' />
      <FormInput type='text' label='number' name='number' />
      <FormInput type='password' label='password' name='password' />
      <div className='mt-4'>
        <SubmitBtn text='register' />
      </div>

      <p className='text-center'>
        Already a User?
        <Link
          to='/login'
          className='ml-2 link link-hover link-primary capitalize'
        >
          login
        </Link>
      </p>
    </Form>
  </section>
  )
}

export default Register