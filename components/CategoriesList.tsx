// prettier-ignore
import {Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious} from "@/components/ui/carousel";
// prettier-ignore
import {Code2,  Cpu,  Music,Palette,Popcorn,SquareStack,Utensils,Volleyball} from "lucide-react";
import Link from "next/link";

export default function CategoriesList() {
  const carItemClass = "grid  grid-cols-4 sm:grid-cols-5";
  const iconClass = "text-primary size-8 sm:size-12";

  return (
    <Carousel
      opts={{ align: "start", containScroll: "trimSnaps" }}
      className="container-box py-12 lg:py-8 mt-2 "
    >
      <CarouselContent className="py-1.5">
        <CarouselItem className={`${carItemClass}`}>
          <Category to={`/events?category=music`} name="Music">
            <Music className={iconClass} />
          </Category>

          <Category to="/events?category=sport" name="Sports">
            <Volleyball className={iconClass} />
          </Category>

          <Category to="/events?category=art" name="Art">
            <Palette className={iconClass} />
          </Category>

          <Category name="Movies" to="/events?category=movies">
            <Popcorn className={iconClass} />
          </Category>

          <Category
            className="hidden sm:flex"
            name="Programming"
            to="/events?category=programming"
          >
            <Code2 className={iconClass} />
          </Category>
        </CarouselItem>

        <CarouselItem className={`${carItemClass}`}>
          <Category
            className="flex sm:hidden"
            name="Programming"
            to="/events?category=programming"
          >
            <Code2 className={iconClass} />
          </Category>

          <Category name="Food" to="/events?category=food">
            <Utensils className={iconClass} />
          </Category>

          <Category name="Technology" to="/events?category=technology">
            <Cpu className={iconClass} />
          </Category>

          <Category name="Other" to="/events?category=other">
            <SquareStack className={iconClass} />
          </Category>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="absolute top-[98%] -translate-y-full left-1/2 -translate-x-[110%] lg:translate-y-0 lg:top-1/2  lg:-left-0 lg:translate-x-0" />
      <CarouselNext className="absolute top-[98%] -translate-y-full right-1/2 translate-x-[110%] lg:translate-y-0  lg:-right-0 lg:top-1/2 lg:translate-x-0" />
    </Carousel>
  );
}

function Category({
  name,
  children,
  to,
  className,
}: {
  name: string;
  to?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={to || "/"}
      className={`flex flex-col items-center group hover:scale-105 add-transition-500 ${className}`}
    >
      <div className="size-16 sm:size-20 bg-primary flex items-center justify-center rounded-full   shadow-none shadow-primary group-hover:shadow-md group-hover:shadow-primary add-transition-500">
        <div className="p-[11px] bg-white rounded-full">{children}</div>
      </div>
      <p className="text-xs sm:text-base leading-3 mt-2 font-semibold text-primary ">
        {name}
      </p>
    </Link>
  );
}
