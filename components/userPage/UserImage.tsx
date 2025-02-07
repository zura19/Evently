import { User2Icon } from "lucide-react";
import Image from "next/image";
import UploaderIcon from "./UploaderIcon";

export default function UserImage({
  image,
  username,
  iconSize = 52,
  userId,
}: {
  image?: string;
  iconSize?: number;
  username: string;
  userId: string;
}) {
  if (image) {
    return (
      <div
        className={`flex items-center justify-center relative size-36  rounded-full   group`}
      >
        <Image
          fill
          src={image}
          alt={username}
          className="object-cover rounded-full"
        />
        <UploaderIcon userId={userId} iconSize={iconSize || 52} />
      </div>
    );
  }
  return (
    <div
      className={`relative size-36 bg-secondary rounded-full flex items-center justify-center group  add-transition-500  `}
    >
      <User2Icon
        className="group-hover:opacity-0 opacity-100   add-transition-500 "
        size={iconSize}
      />
      <UploaderIcon userId={userId} iconSize={iconSize || 52} />
    </div>
  );
}
