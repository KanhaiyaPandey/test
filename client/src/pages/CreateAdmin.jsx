
import { Form} from "react-router-dom"
import FormInput from "../components/FormInput"
import SubmitBtn from "../components/SubmitBtn"

const CreateAdmin = () => {
  return (
    <section className='h-screen grid place-items-center'>
    <Form
      method='POST'
      className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
    >
      <h4 className='text-center text-3xl font-bold'>Create Admin</h4>
      <FormInput type='file' label='avatar' name='avatar'
       accept = "image/*" 
       size = "pt-2"/>
      <FormInput type='text' label='name' name='name' />
      <FormInput type='email' label='email' name='email' />
      <FormInput type='text' label='number' name='number' />
      <FormInput type='password' label='password' name='password' />
      <div className='mt-4'>
        <SubmitBtn text='Create' />
      </div>
    </Form>
  </section>
  )
}

export default CreateAdmin