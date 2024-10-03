import axios from "axios";

const url1="http://localhost:3000/employees";

export async function getAllEmployees(){
  axios.get(url1);
   const res=await axios.get(`${url1}/getall`) // back end req
  console.log(res);
   return res.data;
}