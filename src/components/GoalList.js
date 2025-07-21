import React from "react";
import GoalCard from "./GoalCard";

function GoalList({ goals, deleteGoal, onEdit }) {
  if (goals.length === 0) return <p>No goals found. Add one!</p>;

  return (
    <div>
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onDelete={deleteGoal}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default GoalList;
