import React, { useState, useEffect } from "react";
import GoalList from "./components/GoalList";
import GoalForm from "./components/GoalForm";
import DepositForm from "./components/DepositForm";
import Overview from "./components/Overview";

const API_URL = "http://localhost:3001/goals"; // Update port here if needed

function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  async function fetchGoals() {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setGoals(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setLoading(false);
    }
  }

  if (loading) return <div>Loading goals...</div>;

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1>Smart Goal Planner</h1>

      <Overview goals={goals} />

      <h2>Add New Goal</h2>
      <GoalForm addGoal={(goal) => setGoals((prev) => [...prev, goal])} />

      <h2>Make a Deposit</h2>
      <DepositForm
        goals={goals}
        onUpdateGoal={(updatedGoal) => {
          setGoals((prev) =>
            prev.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal))
          );
        }}
      />

      <h2>All Goals</h2>
      <GoalList goals={goals} deleteGoal={(id) => {
        setGoals((prev) => prev.filter((goal) => goal.id !== id));
      }} />
    </div>
  );
}

export default App;
