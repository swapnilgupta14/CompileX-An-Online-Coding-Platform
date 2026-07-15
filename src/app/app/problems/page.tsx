import type { Metadata } from "next";
import { ProblemsListClient } from "./ProblemsListClient";

export const metadata: Metadata = {
  title: "Arena — Problems",
};

export default function ProblemsPage() {
  return <ProblemsListClient />;
}
