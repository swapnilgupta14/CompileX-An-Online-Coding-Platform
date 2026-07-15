/**
 * WebSocket URL helper. Backend URL comes in over http(s); swap the scheme
 * to ws(s) and glue the path on.
 *
 * Django Channels routes here:
 *   /pg/code_execute
 *   /arena/code_execute
 *   /battle/code_execute/{room_id}/
 */
export function wsUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
  const scheme = base.startsWith("https") ? "wss" : "ws";
  const bare = base.replace(/^https?:\/\//, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${scheme}://${bare}${cleanPath}`;
}
