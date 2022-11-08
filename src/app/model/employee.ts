import { Team } from "./team";

export interface Employee {
  profileId: number;
  email: string;
  name: string;
  role: string;
  username: string;
  imageUrl: string;
  hiringDate: string;
  birthdate: string;
  teams: Team[];
  departmentName: string;
  managerName: string;
}
