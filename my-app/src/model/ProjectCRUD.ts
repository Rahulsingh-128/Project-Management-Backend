import axios from "axios";
import { getToken } from "./authCrud"; 

const url2 = "http://localhost:5000/projects";
const url1 = "http://localhost:5000";

interface IProject{
  _id: number;
  Project_Name: string;
  Details: string;
  Demo_Link: string;
  Github_repository: string;
}
export async function addProject(project:object) {
  const token = getToken(); 
  try {
    const response = await axios.post(`${url2}/add`,project, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log("added response",response);
    return response;
  } catch (error) {
    console.error("Error adding projects:", error);
    throw error; 
  }
}

export async function getAllProjects() {
  const token = getToken(); 

  try {
    const response = await axios.get(url2 + "/getall", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error; 
  }
}

export async function deleteProjectById(_id:Number) {
  const token = getToken(); 
  try {
    const response = await axios.delete(`${url2}/delete/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log("delete response",response);
    return response;
  } catch (error) {
    console.error("Error deleting projects:", error);
    throw error; 
  }
}

export async function loginUser(username:string,password:string) {
  const token = getToken(); 
  try {
    const response = await axios.post(`${url1}/auth/login`,{ username, password }, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error; 
  }
}
export async function register(project:object){
  console.log("in register");
    const res=await axios.post(`${url1}/auth/register`,project);
    console.log("res",res);
    return res;
}
export async function getProjectById(_id: number): Promise<IProject> {
  const token = getToken(); 
  try {
    const response = await axios.get<IProject>(`${url2}/get/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    throw error; 
}
}
export async function updateProject(project: IProject): Promise<IProject> {
  const token = getToken(); // Get the token from session storage

  try {
    const response = await axios.put<IProject>(`${url2}/update/${project._id}`, project, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}