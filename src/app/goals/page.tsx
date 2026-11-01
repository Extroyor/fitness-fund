import SignOutButton from "@/components/sign-out-button";
import { Suspense } from "react";
import GoalsSkeleton from "./_components/goals-skeleton";
import GoalsContent from "./_components/goals-content";

export default function Goals() {
  return (
    <>
      <Suspense fallback={<GoalsSkeleton />}>
        <GoalsContent />
      </Suspense>
      <SignOutButton />
    </>
  );
}
