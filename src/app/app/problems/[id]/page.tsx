import { ProblemDetailClient } from "./ProblemDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProblemDetailPage({ params }: Props) {
  const { id } = await params;
  return <ProblemDetailClient problemId={id} />;
}
