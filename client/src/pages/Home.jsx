/* eslint-disable no-unused-vars */

import { Link, useLoaderData } from 'react-router-dom';
import User from '../components/user';

const Home = () => {

  const {user} = useLoaderData();

  return (

    <>

<User user = {user}/>
    

{user.role === 'admin' && (
        <div className="flex items-center justify-center mt-4">
          <Link to= "/dashboard/all-users">
          <button className="btn btn-primary mr-2" >See All Users</button>
          </Link>
         
          <Link to= "/dashboard/create-admin">
          <button className="btn btn-secondary mr-2" >Create admin account</button>
          </Link>
        </div>
      )}


    </>
  



  )
}

export default Home