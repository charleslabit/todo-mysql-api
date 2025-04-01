import express from "express";
import pool from "../db.js"; // Import MySQL connection pool

const router = express.Router();

// ✅ Create a new todo
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const connection = await pool.getConnection();
    const query = "INSERT INTO todos (title) VALUES (?)";
    const [results] = await connection.execute(query, [title]);
    connection.release(); // Release connection back to the pool

    res.status(201).json({ id: results.insertId, title });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all todos
router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.execute("SELECT * FROM todos");
    connection.release(); // Release connection back to the pool

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get a single todo by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();
    const [results] = await connection.execute(
      "SELECT * FROM todos WHERE id = ?",
      [id]
    );
    connection.release(); // Release connection back to the pool

    if (results.length === 0)
      return res.status(404).json({ error: "Todo not found" });

    res.json(results[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update a todo by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;
    if (!title && status === undefined)
      return res.status(400).json({ error: "No fields to update" });

    const connection = await pool.getConnection();
    const query = "UPDATE todos SET title = ?, status = ? WHERE id = ?";
    const [results] = await connection.execute(query, [title, status, id]);
    connection.release(); // Release connection back to the pool

    if (results.affectedRows === 0)
      return res.status(404).json({ error: "Todo not found" });

    res.json({ id, title, status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete a todo by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();
    const [results] = await connection.execute(
      "DELETE FROM todos WHERE id = ?",
      [id]
    );
    connection.release(); // Release connection back to the pool

    if (results.affectedRows === 0)
      return res.status(404).json({ error: "Todo not found" });

    res.sendStatus(204); // 204 No Content (better for DELETE)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
