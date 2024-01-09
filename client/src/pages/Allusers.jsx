import {  useLoaderData } from "react-router-dom"
import User from "../components/UserSingle";


const Allusers = () => {
    const {users} = useLoaderData();
  return (

    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-2 '>
    {users.map((user) => {
      
      return (
            <User key = {user._id} user = {user}/>
      );
    })}
  </div>


  )
}

export default Allusers