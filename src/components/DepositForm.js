import React, { useState } from "react";

function DepositForm({ goals, onUpdateGoal }) {
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [depositAmount, setDepositAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const goalToUpdate = goals.find(
      (goal) => goal.id.toString() === selectedGoalId
    );
    if (!goalToUpdate) return;

    const newAmount = goalToUpdate.savedAmount + Number(depositAmount);

    fetch(`http://localhost:3000/goals/${selectedGoalId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedAmount: newAmount }),
    })
      .then((res) => res.json())
      .then((updatedGoal) => {
        onUpdateGoal(updatedGoal);
        setDepositAmount("");
        setSelectedGoalId("");
      })
      .catch((err) => {
        console.error("Failed to deposit:", err);
        alert("Something went wrong. Please try again.");
      });
  }

  return (
    <div>
      <h2>Make a Deposit</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedGoalId}
          onChange={(e) => setSelectedGoalId(e.target.value)}
          required
        >
          <option value="">Select Goal</option>
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Amount to deposit"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          required
          min="1"
        />

        <button type="submit" disabled={!selectedGoalId || depositAmount <= 0}>
          Deposit
        </button>
      </form>
    </div>
  );
}

export default DepositForm;
