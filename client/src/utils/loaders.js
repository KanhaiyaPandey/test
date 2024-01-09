import { redirect } from "react-router-dom";
import { customFetch } from "./helper";
import { toast } from "react-toastify";

export const dashboardLoader = async () =>{
    try {
      const {data} = await customFetch.get("users/current-user");
      return data;
    } catch (error) {
      const errorMessage =
      (error?.response?.data?.msg)
      toast.error(errorMessage);
     return redirect("/");
    }
 }

 export const AllUsersLoader = async () =>{
    try {
      const {data} = await customFetch.get("users/all-users");
      return data;
    } catch (error) {
      const errorMessage =
      (error?.response?.data?.msg)
      toast.error(errorMessage);
     return redirect("/dashboard");
    }
 }