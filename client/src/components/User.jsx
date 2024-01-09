/* eslint-disable react/prop-types */
import { Link, redirect } from "react-router-dom";
import { customFetch } from "../utils/helper";
import { toast } from "react-toastify";
import { useEffect } from "react";


const User = ({user}) => {


  useEffect 


  const deleteAction = async(_id) => {
    try {
       await customFetch.delete(`users/delete-user/${_id}`);
       toast.success("user deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect("/dashboard")
  };




  const {_id, name, avatar, email, number, role } = user;
  return (
    <Link className="card card-side bg-base-100">
        <figure className="px-10 pt-10">
      {avatar ? (
        <img src={avatar} alt="User's Profile" className="rounded-xl" />
      ) : (
       <img src='https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg' className='w-[10rem] rounded-xl'/>
      )}
    </figure>
    <div className="card-body">
      <h2 className="card-title">{name}</h2>
      <p>{email}</p>
      <p>{number}</p>
      <p>{role}</p>
      <div className="card-actions justify-end">

      <Link to={`/dashboard/update-user/${_id}`} className='btn edit-btn'>Edit</Link>
        
            <button type='submit' className='btn btn-primary' onClick={() => deleteAction(_id)}>
              Delete
            </button>
        
      </div>
    </div>
  </Link>
  )
}

export default User