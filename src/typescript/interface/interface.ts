export interface LapData {
    time: string;
}

export interface UserData  {
    task: string;
    completed: boolean;
}

export interface ErrorData {
    error?: string;
}

export interface Product {
        item: string;
        price: number
    } 