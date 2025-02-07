import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2 } from "lucide-react";
import Link from "next/link";

export function UserAvatar({ image, id }: { image?: string; id?: string }) {
  return (
    <Avatar asChild className="default-focus">
      <Link href={`/profile/${id}`}>
        <AvatarImage src={image} alt="user avatar." className="object-cover" />
        <AvatarFallback>
          <User2 />
        </AvatarFallback>
      </Link>
    </Avatar>
  );
}
