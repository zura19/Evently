import { Button } from "../ui/button";

export default function TicketsCounter({
  tickets,
  setTickets,
  totalTickets,
}: {
  tickets: number;
  totalTickets: number;
  setTickets: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="flex mt-2">
      <Button
        onClick={() => setTickets(tickets - 1)}
        size={"icon"}
        disabled={tickets <= 1}
        className="size-8 rounded-md rounded-r-none"
      >
        -
      </Button>
      <Button size={"icon"} className="size-8 rounded-none">
        {tickets}
      </Button>

      <Button
        disabled={tickets >= totalTickets}
        onClick={() => setTickets(tickets + 1)}
        size={"icon"}
        className="size-8 rounded-md rounded-l-none"
      >
        +
      </Button>
    </div>
  );
}
