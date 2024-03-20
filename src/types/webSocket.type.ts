export type TSocketMessageOrder = {
  ingredients: string[];
  _id: string;
  status: "done" | "created" | "pending";
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type TSocketMessage = {
  success: boolean;
  orders: TSocketMessageOrder[];
  total: number;
  totalToday: number;
};
