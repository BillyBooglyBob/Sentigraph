import { User } from "@/types/user";

const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "password123",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
    permission: "admin",
  },
];

export default users;
