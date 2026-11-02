export default function GoalsSkeleton() {
  return (
    <>
      <form>
        <label htmlFor="goal1">Goal 1</label>
        <input type="text" id="goal1" name="goal1" disabled />
        <label htmlFor="goal1-fine">Goal 1 Fine (Daily)</label>
        <input type="number" id="goal1-fine" name="goal1-fine" disabled />

        <label htmlFor="goal2">Goal 2</label>
        <input type="text" id="goal2" name="goal2" disabled />
        <label htmlFor="goal2-fine">Goal 2 Fine (Daily)</label>
        <input type="number" id="goal2-fine" name="goal2-fine" disabled />

        <label htmlFor="fitness-fine">Fitness Fine (Daily)</label>
        <input type="number" id="fitness-fine" name="fitness-fine" disabled />
      </form>
    </>
  );
}
