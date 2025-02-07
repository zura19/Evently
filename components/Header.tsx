import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GlowEffectButton } from "./GlowBtn";

export default function Header() {
  return (
    <>
      <header className="container-box grid md:grid-cols-[1fr_1fr] items-center  justify-between gap-y-8 md:gap-y-0 ">
        <div className="space-y-8">
          <h1 className="text-3xl lg:text-5xl md:text-3xl sm:text-4xl text-center md:text-start leading-tight font-black">
            Host, Connect, Celebrate: Your Events, Our Platform!
          </h1>
          <p className="lg:text-lg text-center md:text-start">
            Evently is a platform that connects event organizers with attendees,
            making it easy for you to host and manage your events.
          </p>

          <div className="flex justify-center md:justify-start">
            <GlowEffectButton className="">
              <Button
                asChild
                size={"lg"}
                className="w-full md:w-auto rounded-full "
              >
                <Link href={"/events"} className="relative">
                  Explore now
                </Link>
              </Button>
            </GlowEffectButton>
          </div>
        </div>
        <div className="relative mx-auto sm:w-[80%] md:ml-auto md:w-[70%]">
          <img src="./hero (1).png" alt="hero" />
        </div>
      </header>
    </>
  );
}
