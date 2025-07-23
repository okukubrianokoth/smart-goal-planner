import React from "react";

function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const goalsCompleted = goals.filter((g) => g.savedAmount >= g.targetAmount).length;

  const today = new Date();

  function daysLeft(deadline) {
    const d = new Date(deadline);
    const diff = d - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  return (
    <div style={{ marginBottom: 30 }}>
      <h2>Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: ${totalSaved}</p>
      <p>Total Target: ${totalTarget}</p>
      <p>Goals Completed: {goalsCompleted}</p>

      <h3>Deadlines & Warnings:</h3>
      <ul>
        {goals.map((goal) => {
          const left = daysLeft(goal.deadline);
          const isComplete = goal.savedAmount >= goal.targetAmount;
          let warning = "";

          if (!isComplete) {
            if (left < 0) warning = " Overdue!";
            else if (left <= 30) warning = " Deadline approaching";
          }

          return (
            <li key={goal.id}>
              {goal.name} - Deadline: {goal.deadline} ({left} days left) {warning}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Overview;
