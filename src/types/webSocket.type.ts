export type TSocketMessageOrders = {
  ingredients: string[];
  _id: string;
  status: "done" | "created" | "pending";
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TSocketMessage = {
  success: boolean;
  orders: TSocketMessageOrders[];
  total: number;
  totalToday: number;
};
