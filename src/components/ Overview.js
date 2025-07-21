import React from "react";

function Overview({ goals }) {
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const completedGoals = goals.filter(g => g.savedAmount >= g.targetAmount).length;
  const totalGoals = goals.length;

  const now = new Date();

  function daysLeft(deadline) {
    const dl = new Date(deadline);
    return Math.ceil((dl - now) / (1000 * 60 * 60 * 24));
  }

  return (
    <div className="overview">
      <h2>Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: KES {totalSaved}</p>
      <p>Goals Completed: {completedGoals}</p>

      <h3>Deadlines:</h3>
      <ul>
        {goals.map(goal => {
          const left = daysLeft(goal.deadline);
          const isComplete = goal.savedAmount >= goal.targetAmount;
          return (
            <li key={goal.id}>
              {goal.name}: {left} days left{" "}
              {!isComplete && left <= 30 && left >= 0 && (
                <strong style={{ color: "orange" }}>Deadline approaching!</strong>
              )}
              {!isComplete && left < 0 && (
                <strong style={{ color: "red" }}>Overdue!</strong>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Overview;
