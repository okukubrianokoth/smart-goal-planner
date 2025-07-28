import React, { useState } from "react";

function DepositForm({ goals, onUpdateGoal, apiUrl }) {
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const goalToUpdate = goals.find(
      (goal) => goal.id.toString() === selectedGoalId
    );
    if (!goalToUpdate) return;

    const deposit = Number(depositAmount);
    if (deposit <= 0 || isNaN(deposit)) {
      alert("Please enter a valid deposit amount.");
      return;
    }

    const newAmount = goalToUpdate.savedAmount + deposit;

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/${selectedGoalId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ savedAmount: newAmount }),
      });

      if (!response.ok) throw new Error("Server error");

      const updatedGoal = await response.json();
      onUpdateGoal(updatedGoal);
      setDepositAmount("");
      setSelectedGoalId("");
    } catch (error) {
      console.error("Failed to deposit:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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

        <button type="submit" disabled={!selectedGoalId || depositAmount <= 0 || loading}>
          {loading ? "Depositing..." : "Deposit"}
        </button>
      </form>
    </div>
  );
}

export default DepositForm;
