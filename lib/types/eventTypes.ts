export interface Ievent {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
  location: string;
  author: { _id: string; username: string };
  startDate: Date;
  endDate: Date;
  tickets: { date: Date; remainingTickets: number; _id: string }[];
}

export interface IsearchParamsFilter {
  query?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
  location?: string;
  page?: string;
  limit?: string;
}
