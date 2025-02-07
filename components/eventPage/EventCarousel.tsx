import { getEvents } from "@/actions/EventActions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EventCard from "../EventList/EventCard";

export default async function EventCarousel() {
  const events = await getEvents({});

  return (
    <div className="relative py-4">
      <Carousel
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          axis: "x",
          dragFree: true,
        }}
        className="w-full h-full"
      >
        <CarouselContent>
          {events?.map((event) => (
            <CarouselItem
              key={event._id}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="py-4">
                <EventCard event={event} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute top-full -translate-y-[10px] left-1/2 -translate-x-[110%] lg:top-1/2 lg:-left-4  " />
        <CarouselNext className="absolute top-full -translate-y-[10px] right-1/2 translate-x-[110%] lg:top-1/2 lg:-right-4  lg:-translate-y-1/2" />
      </Carousel>
    </div>
  );
}
