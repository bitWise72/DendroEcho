import { RoomExperience } from "@/components/room/RoomExperience";

export default function RoomPage({ params }: { params: { id: string } }) {
  return <RoomExperience roomId={params.id} />;
}
