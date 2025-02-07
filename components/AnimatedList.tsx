import { AnimatedGroup } from "@/components/ui/animated-group";

export default function AnimatedList({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatedGroup
      className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]  gap-8"
      variants={{
        container: {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05,
            },
          },
        },
        item: {
          hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
              duration: 1.2,
              type: "spring",
              bounce: 0.3,
            },
          },
        },
      }}
    >
      {children}
    </AnimatedGroup>
  );
}
