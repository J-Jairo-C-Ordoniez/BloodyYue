import db from "../config/db.js";

const mUser = {
  async getAll() {
    try {
      const query = 'SELECT userId, name, avatar, details, rolId, country, isVerified, createdAt FROM users ORDER BY createdAt DESC';
      const [res] = await db.query(query);

      return res || [];
    } catch (err) {
      throw ({ status: 500, message: "Error al obtener usuarios." });
    }
  },

  async getById(id) {
    try {
      const query = 'SELECT userId, name, email, avatar, pitchVideo, biography, details, rolId, country, isVerified, createdAt FROM users WHERE userId = ?';
      const [res] = await db.query(query, [id]);

      return res[0] || null;
    } catch (err) {
      throw ({ status: 500, message: "Error al obtener usuario por ID." });
    }
  },

  async getByEmail(email) {
    try {
      const query = 'SELECT * FROM users WHERE email = ?';
      const [res] = await db.query(query, [email]);

      return res[0] || null;
    } catch (err) {
      throw ({ status: 500, message: "Error al obtener usuario por email." });
    }
  },

  async search(term) {
    try {
      const query = 'SELECT userId, name, email, avatar, pitchVideo, biography, details, rolId, country, isVerified, createdAt FROM users WHERE name LIKE ? OR email LIKE ?';
      const [rows] = await db.query(query, [`%${term}%`, `%${term}%`]);

      return rows || [];
    } catch (err) {
      throw ({ status: 500, message: "Error al buscar usuarios." });
    }
  },

  async create(data) {
    try {
      const { name, email, password, rolId, code } = data;
      const query = 'INSERT INTO users (name, email, password, rolId, code) VALUES (?, ?, ?, ?, ?)';
      const [res] = await db.execute(query, [name, email, password, rolId, code]);

      return { userId: res.insertId, name, email, password, rolId, code };
    } catch (err) {
      throw (
        err.code === 'ER_DUP_ENTRY'
          ? { status: 409, message: "Este email ya está registrado." }
          : { status: 500, message: "Error al crear el usuario." }
      )
    }
  },

  async update(id, data) {
    try {
      const query = 'UPDATE users SET ? WHERE userId = ?';
      const [res] = await db.query(query, [data, id]);

      return { id, ...data, affectedRows: res.affectedRows };
    } catch (err) {
      throw ({ status: 500, message: "Error al actualizar el usuario." });
    }
  },

  async remove(id) {
    try {
      const query = 'DELETE FROM users WHERE userId = ?';
      const [res] = await db.query(query, [id]);

      return { id, affectedRows: res.affectedRows };
    } catch (err) {
      throw ({ status: 500, message: "Error al eliminar el usuario." });
    }
  }
};

export default mUser;