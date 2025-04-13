export interface Expense {
  id: string;
  amount: number;
  category: string;
  subCategory: string;
  date: Date;
  description?: string;
}

export const dummyExpenses: Expense[] = [
  {
    id: "1",
    amount: 45.99,
    category: "Food",
    subCategory: "Groceries",
    date: new Date("2024-04-13T10:30:00"),
    description: "Weekly grocery shopping",
  },
  {
    id: "2",
    amount: 12.5,
    category: "Food",
    subCategory: "Restaurant",
    date: new Date("2024-04-12T19:15:00"),
    description: "Lunch with friends",
  },
  {
    id: "3",
    amount: 65.0,
    category: "Transportation",
    subCategory: "Fuel",
    date: new Date("2024-04-11T08:45:00"),
    description: "Gas fill-up",
  },
  {
    id: "4",
    amount: 29.99,
    category: "Entertainment",
    subCategory: "Streaming",
    date: new Date("2024-04-10T15:20:00"),
    description: "Netflix subscription",
  },
  {
    id: "5",
    amount: 120.0,
    category: "Shopping",
    subCategory: "Clothing",
    date: new Date("2024-04-09T14:30:00"),
    description: "New shoes",
  },
];
