import type { LapData } from "../../typescript/interface/interface";

export const bestLaps:LapData[] = JSON.parse(sessionStorage.getItem("bestLaps") as string) || [];