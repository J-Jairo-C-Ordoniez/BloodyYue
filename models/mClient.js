import db from "../config/db.js";

const mClient = {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM clients");
    return rows;
  },
  async getById(id) {
    const [rows] = await db.query("SELECT * FROM clients WHERE id = ?", [id]);
    return rows[0] || null;
  },
  async create(data) {
    const [result] = await db.query("INSERT INTO clients SET ?", [data]);
    return { id: result.insertId, ...data };
  },
  async search(term) {
    const [rows] = await db.query(
      "SELECT * FROM clients WHERE name LIKE ? OR email LIKE ?",
      [`%${term}%`, `%${term}%`]
    );
    return rows;
  },
  async update(id, data) {
    await db.query("UPDATE clients SET ? WHERE id = ?", [data, id]);
    return { id, ...data };
  },
  async remove(id) {
    await db.query("DELETE FROM clients WHERE id = ?", [id]);
    return { success: true };
  },
};

export default mClient;
