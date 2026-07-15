import { BattlegroundPlayClient } from "./BattlegroundPlayClient";

interface Props {
  params: Promise<{ room: string; user: string }>;
}

export default async function BattlegroundPlayPage({ params }: Props) {
  const { room, user } = await params;
  return <BattlegroundPlayClient roomId={room} userId={user} />;
}
