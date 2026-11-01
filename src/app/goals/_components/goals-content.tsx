import GoalsForm from "./goals-form";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function GoalsContent() {
  const session = await getSession();

  const now = new Date();
  const monthStart = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
  );
  const goalSet = await prisma.goalSet.findFirst({
    where: {
      userId: session.user.id,
      effectiveFrom: monthStart,
    },
  });

  const formData = goalSet
    ? {
        goal1: goalSet.goal1,
        goal1Fine: goalSet.goal1Fine.toNumber(),
        goal2: goalSet.goal2 ?? null,
        goal2Fine: goalSet.goal2Fine?.toNumber() ?? null,
        fitnessFine: goalSet.fitnessFine.toNumber(),
      }
    : null;

  return <GoalsForm goalSet={formData} />;
}
