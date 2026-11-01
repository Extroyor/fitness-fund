"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const GoalSetSchema = z.object({
  goal1: z.string().trim().min(1, "Goal 1 is required"),
  goal2: z.string().trim(),
});

type GoalsState = { error: string };

export async function saveGoals(
  prevState: GoalsState,
  formData: FormData,
): Promise<GoalsState> {
  const session = await getSession();

  const parsed = GoalSetSchema.safeParse({
    goal1: formData.get("goal1"),
    goal2: formData.get("goal2"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { goal1, goal2 } = parsed.data;
  const hasGoal2 = goal2 !== "";

  const fitnessFine = hasGoal2 ? 1.5 : 2;

  const goalFine = 0.5;

  const now = new Date();

  const monthStart = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
  );

  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );

  const season = await prisma.season.findFirst({
    where: {
      startDate: { lte: today },
      endDate: { gte: today },
    },
  });

  if (!season) {
    return { error: "No active season found for the current month." };
  }

  const existingGoalSet = await prisma.goalSet.findFirst({
    where: {
      userId: session.user.id,
      effectiveFrom: monthStart,
    },
  });

  if (existingGoalSet) {
    return { error: "Goals for this month have already been set." };
  }

  await prisma.goalSet.create({
    data: {
      userId: session.user.id,
      seasonId: season.id,
      effectiveFrom: monthStart,
      goal1,
      goal1Fine: goalFine,
      goal2: hasGoal2 ? goal2 : null,
      goal2Fine: hasGoal2 ? goalFine : null,
      fitnessFine,
      lockedAt: new Date(),
    },
  });

  revalidatePath("/goals");
  return { error: "" };
}
