import type { UserData } from "../../typescript/interface/interface"
export const taskList: UserData[] = JSON.parse(localStorage.getItem("taskList") as string) || [];