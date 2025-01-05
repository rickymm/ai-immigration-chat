import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function UserAvatar() {
  return (
    <Avatar className="order-last">
      {/* TODO: Get name initials and profile picture */}
      <span className="sr-only">Profile picture</span>
      <AvatarFallback>You</AvatarFallback>
      <AvatarImage src="https://i.pravatar.cc/300?img=5" />
    </Avatar>
  );
}
