import React from "react";

function GoalCard({ goal, onEdit, onDelete }) {
  const {
    name,
    targetAmount,
    savedAmount,
    category,
    deadline,
    createdAt,
  } = goal;

  const percentage = ((savedAmount / targetAmount) * 100).toFixed(1);
  const progress = Math.min(percentage, 100);

  const now = new Date();
  const deadlineDate = new Date(deadline);
  const createdDate = new Date(createdAt);
  const daysLeft = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));

  const isOverdue = daysLeft < 0;
  const isWarning = daysLeft <= 30 && daysLeft >= 0;
  const isCompleted = savedAmount >= targetAmount;

  return (
    <div
      style={{
        backgroundColor: isOverdue ? "#ffe6e6" : "#ffffff",
        border: `1px solid ${isOverdue ? "#e74c3c" : "#cbd5e1"}`,
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "24px",
        maxWidth: "800px",
        width: "100%",
      }}
    >
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: "1.3rem", marginBottom: "8px", color: "#2c3e50" }}>{name}</h3>
        <p style={{ margin: "4px 0", color: "#4a5568" }}><strong>Category:</strong> {category}</p>
        <p style={{ margin: "4px 0", color: "#4a5568" }}>
          <strong>Saved:</strong> KES {savedAmount} / {targetAmount} ({percentage}%)
        </p>

        <div
          style={{
            height: "10px",
            backgroundColor: "#e0e0e0",
            borderRadius: "6px",
            overflow: "hidden",
            margin: "10px 0",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: isCompleted ? "#27ae60" : "#1976d2",
              transition: "width 0.3s ease",
            }}
          ></div>
        </div>

        <p style={{ margin: "4px 0", color: "#4a5568" }}>
          <strong>Deadline:</strong> {deadline} ({daysLeft} days left)
          {isOverdue && (
            <span style={{ color: "#e74c3c", fontWeight: "bold", marginLeft: "6px" }}>
              Overdue!
            </span>
          )}
          {!isOverdue && isWarning && (
            <span style={{ color: "orange", fontWeight: "bold", marginLeft: "6px" }}>
              Deadline Soon!
            </span>
          )}
        </p>
        <p style={{ margin: "4px 0", color: "#4a5568" }}>
          <strong>Created:</strong> {new Date(createdDate).toLocaleDateString()}
        </p>
        {isCompleted && (
          <p style={{ color: "#27ae60", fontWeight: "bold", marginTop: "6px" }}>
             Goal Completed!
          </p>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          onClick={() => onEdit(goal)}
          style={{
            backgroundColor: "#1976d2",
            color: "#fff",
            padding: "8px 12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.95rem",
          }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(goal.id)}
          style={{
            backgroundColor: "#e74c3c",
            color: "#fff",
            padding: "8px 12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.95rem",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default GoalCard;
