import { Project } from "../classes/Project";
import { getAllProjects } from "../model/ProjectCRUD";
import { useEffect ,useState} from "react";
import ProjectCard from "./ProjectCard";

export function Projects() {
  let [neoemployees, setArray] = useState<Project[]>([]);

  async function getEmps() {
    console.log("inside getEmp")
    const data = await getAllProjects();
    console.log("data", data);
  }

  useEffect(() => {
    getEmps();
  }, []);
  return (
    <div>
      <h1>Projects</h1>
      {/* {cards} */}
      <ul>
        {neoemployees.map((project) => (
          <li key={project._id}>{project.Project_Name}</li>  
        ))}
      </ul>
    </div>
  );
}

