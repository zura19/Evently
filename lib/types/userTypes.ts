export interface Iuser {
  _id: string;
  username: string;
  email: string;
  image: string;
  role: "user" | "moderator" | "admin";
  createdAt: Date;
  updatedAt: Date;
}
