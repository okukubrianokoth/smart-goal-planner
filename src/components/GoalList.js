import React from "react";
import GoalCard from "./GoalCard";

function GoalList({ goals, onDeleteGoal, onUpdateGoal }) {
  return (
    <section>
      <h2>All Goals</h2>
      {goals.length === 0 ? (
        <p>No goals found. Add one!</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onDelete={onDeleteGoal}
              onEdit={onUpdateGoal} // ✅ Renamed this from `onUpdate` to `onEdit`
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default GoalList;
