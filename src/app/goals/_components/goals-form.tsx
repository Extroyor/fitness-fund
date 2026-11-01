"use client";

import { useActionState } from "react";
import { saveGoals } from "../actions";

type GoalsFormProps = {
  goalSet: {
    goal1: string;
    goal1Fine: number;
    goal2: string | null;
    goal2Fine: number | null;
    fitnessFine: number;
  } | null;
};

export default function GoalsForm({ goalSet }: GoalsFormProps) {
  const locked = goalSet !== null;
  const [state, formAction, pending] = useActionState(saveGoals, {
    error: "",
  });
  return (
    <>
      <form action={formAction}>
        <label htmlFor="goal1">Goal 1</label>
        <input
          type="text"
          id="goal1"
          name="goal1"
          defaultValue={goalSet?.goal1 ?? ""}
          placeholder="Enter Goal 1..."
          disabled={locked}
        />
        <label htmlFor="goal1-fine">Goal 1 Fine (Daily)</label>
        <input
          type="number"
          id="goal1-fine"
          name="goal1-fine"
          defaultValue={goalSet?.goal1Fine ?? 0.5}
          step="0.5"
          min="0"
          disabled
        />

        <label htmlFor="goal2">Goal 2</label>
        <input
          type="text"
          id="goal2"
          name="goal2"
          defaultValue={goalSet?.goal2 ?? ""}
          placeholder="Enter Goal 2..."
          disabled={locked}
        />
        <label htmlFor="goal2-fine">Goal 2 Fine (Daily)</label>
        <input
          type="number"
          id="goal2-fine"
          name="goal2-fine"
          defaultValue={goalSet?.goal2Fine ?? 0}
          step="0.5"
          min="0"
          disabled
        />

        <label htmlFor="fitness-fine">Fitness Fine (Daily)</label>
        <input
          type="number"
          id="fitness-fine"
          name="fitness-fine"
          defaultValue={goalSet?.fitnessFine ?? 2}
          step="0.5"
          min="0"
          disabled
        />

        {!locked && (
          <button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Lock Goals"}
          </button>
        )}
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </>
  );
}
