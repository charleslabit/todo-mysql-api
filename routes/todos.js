import express from "express";
import connection from "../db.js"; // Import MySQL connection
const router = express.Router();

// ✅ Create a new todo
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const query = "INSERT INTO todos (title) VALUES (?)";
    const [results] = await connection
      .promise()
      .query(query, [title, status || false]);

    res.status(201).json({ id: results.insertId, title, status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all todos
router.get("/", async (req, res) => {
  try {
    const [results] = await connection.promise().query("SELECT * FROM todos");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get a single todo by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await connection
      .promise()
      .query("SELECT * FROM todos WHERE id = ?", [id]);

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

    const query = "UPDATE todos SET title = ?, status = ? WHERE id = ?";
    const [results] = await connection
      .promise()
      .query(query, [title, status, id]);

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
    const [results] = await connection
      .promise()
      .query("DELETE FROM todos WHERE id = ?", [id]);

    if (results.affectedRows === 0)
      return res.status(404).json({ error: "Todo not found" });

    res.sendStatus(204); // 204 No Content (better for DELETE)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
