/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";
import { customFetch } from "./helper";
import { redirect } from "react-router-dom";

export const RegisterAction = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post('/auth/register', data);
      toast.success("Registerd successfully");
      return redirect('/login');
    } catch (error) {
      const errorMessage =
      (error?.response?.data?.msg)
      toast.error(errorMessage);
      return null;
    }
  };

  export const loginAction = async ({request}) =>{
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    
    try {
        await customFetch.post('/auth/login', data);
        toast.success('Logged in successful');
        return redirect('/dashboard');
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg);
        return error;
      }
  };

  export const profileAction = async ({ request, params }) =>{
    const formData = await request.formData();

    console.log(params.id);
  
    const file = formData.get("avatar");
     if(file && file.size > 500000){
      toast.error("please choose file of size in range 500kb");
      return null;
     }
  
     try {
      await customFetch.patch(`/users/update-user/${params.id}`, formData);
      toast.success('Profile updated successfully');
      return redirect('/dashboard');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    }
    return null;
  }
