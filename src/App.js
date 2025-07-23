import React, { useState, useEffect } from "react";
import GoalList from "./components/GoalList";
import GoalForm from "./components/GoalForm";
import DepositForm from "./components/DepositForm";
import Overview from "./components/Overview";

const API_PORT = 3002;
const API_URL = `http://localhost:${API_PORT}/goals`;

function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  async function fetchGoals() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`API returned status ${res.status}`);
      const data = await res.json();
      setGoals(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load goals. Please check if json-server is running.");
    } finally {
      setLoading(false);
    }
  }

  async function addGoal(goal) {
    if (editingGoal) {
      const res = await fetch(`${API_URL}/${editingGoal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editingGoal, ...goal }),
      });
      const updated = await res.json();
      updateGoalInState(updated);
      setEditingGoal(null);
    } else {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goal),
      });
      const newGoal = await res.json();
      setGoals((prev) => [...prev, newGoal]);
    }
  }

  function updateGoalInState(updatedGoal) {
    setGoals((prev) =>
      prev.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal))
    );
  }

  async function deleteGoal(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  }

  function handleEdit(goal) {
    setEditingGoal(goal);
  }

  function cancelEdit() {
    setEditingGoal(null);
  }

  if (loading) return <div>Loading goals...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <header style={{
        backgroundColor: "#4A90E2",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        textAlign: "center",
        marginBottom: "20px"
      }}>
        <h1 style={{ margin: 0 }}>🎯 Smart Goal Planner</h1>
        <p style={{ marginTop: "8px", fontSize: "16px" }}>
          Plan, track, and crush your financial goals!
        </p>
      </header>

      <div style={{
        backgroundColor: "#f0f4f8",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <Overview goals={goals} />
      </div>

      <h2>{editingGoal ? "Edit Goal" : "Add New Goal"}</h2>
      <GoalForm
        addGoal={addGoal}
        goal={editingGoal}
        cancelEdit={cancelEdit}
        isEdit={!!editingGoal}
      />

      <h2>Make a Deposit</h2>
      <DepositForm
        goals={goals}
        onUpdateGoal={updateGoalInState}
        apiUrl={API_URL}
      />

      <h2>All Goals</h2>
      <GoalList
        goals={goals}
        deleteGoal={deleteGoal}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
