import { JoinRoomClient } from "./JoinRoomClient";

interface Props {
  params: Promise<{ room: string }>;
}

export default async function JoinRoomPage({ params }: Props) {
  const { room } = await params;
  return <JoinRoomClient roomId={room} />;
}
