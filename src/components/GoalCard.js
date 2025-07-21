import React from "react";

function GoalCard({ goal, onDelete, onEdit }) {
  const {
    id,
    name,
    targetAmount,
    savedAmount,
    category,
    deadline,
  } = goal;

  const progress = Math.min((savedAmount / targetAmount) * 100, 100).toFixed(2);
  const remaining = targetAmount - savedAmount;

  const deadlineDate = new Date(deadline);
  const today = new Date();
  const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

  const isOverdue = today > deadlineDate && savedAmount < targetAmount;
  const isWarning = daysLeft <= 30 && !isOverdue && savedAmount < targetAmount;
  const isComplete = savedAmount >= targetAmount;

  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "10px",
    backgroundColor: isComplete
      ? "#e6ffe6"
      : isOverdue
      ? "#ffe6e6"
      : isWarning
      ? "#fff3cd"
      : "#f9f9f9",
  };

  return (
    <div style={cardStyle}>
      <h3>{name}</h3>
      <p>Category: {category}</p>
      <p>
        Deadline: {deadline} ({daysLeft} days left){" "}
        {isOverdue && <span style={{color: "red"}}>⚠️ Overdue</span>}
        {isWarning && !isOverdue && <span style={{color: "orange"}}>⏰ Deadline soon</span>}
      </p>
      <p>Target: ${targetAmount.toLocaleString()}</p>
      <p>Saved: ${savedAmount.toLocaleString()}</p>
      <p>Remaining: ${remaining.toLocaleString()}</p>

      <progress value={progress} max="100" style={{ width: "100%" }} />
      <p>Progress: {progress}%</p>

      {isComplete && <p style={{ color: "green" }}>✅ Goal Completed</p>}

      <button onClick={() => onEdit(id)} style={{ marginRight: "10px" }}>
        Edit
      </button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

export default GoalCard;
