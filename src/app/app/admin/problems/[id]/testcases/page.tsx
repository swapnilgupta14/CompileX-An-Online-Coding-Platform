import { TestcaseEditorClient } from "./TestcaseEditorClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TestcasesPage({ params }: Props) {
  const { id } = await params;
  return <TestcaseEditorClient problemId={id} />;
}
