import React, { useState, useEffect } from "react";

function GoalForm({ addGoal, goal, cancelEdit, isEdit }) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (goal) {
      setName(goal.name);
      setTargetAmount(goal.targetAmount);
      setCategory(goal.category);
      setDeadline(goal.deadline);
    }
  }, [goal]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !targetAmount || !category || !deadline) return;

    const newGoal = {
      name,
      targetAmount: Number(targetAmount),
      category,
      deadline,
      savedAmount: goal?.savedAmount || 0,
      createdAt: goal?.createdAt || new Date().toISOString().split("T")[0],
    };

    addGoal(newGoal);

    if (!isEdit) {
      setName("");
      setTargetAmount("");
      setCategory("");
      setDeadline("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Goal Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Target Amount"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        required
        min="1"
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />

      <button type="submit">{isEdit ? "Update Goal" : "Add Goal"}</button>
      {isEdit && <button type="button" onClick={cancelEdit}>Cancel</button>}
    </form>
  );
}

export default GoalForm;
