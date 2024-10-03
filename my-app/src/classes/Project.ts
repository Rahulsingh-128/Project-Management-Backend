
export class Project{
  _id: number;
  Project_Name: string;
  Details: string;
  Demo_Link: string;
  Github_repository: string;
  constructor(
    _id: number = 0,
    Project_Name: string = "",
    Details: string = "",
    Demo_Link: string = "",
    Github_repository: string = ""
  )
  {
      this._id=_id;
      this.Project_Name=Project_Name;
      this.Details=Details;
      this.Demo_Link=Demo_Link;
      this.Github_repository=Github_repository;
  }
}