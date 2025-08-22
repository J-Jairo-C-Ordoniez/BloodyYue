import db from '../config/db.js';

const mRol = {
  async getAll() {
    try {
      const query = 'SELECT rolId, title, description FROM roles';
      const [res] = await db.query(query);
      return res || [];
    } catch (err) {
      throw ({ status: 500, message: "Error al obtener roles." });
    }
  },

  async getById(id) {
    try {
      const query = 'SELECT * FROM roles WHERE rolId = ?';
      const [res] = await db.query(query, [id]);
      return res[0] || null;
    } catch (err) {
      throw ({ status: 500, message: "Error al obtener rol por ID." });
    }
  },

  async create(data) {
    try {
      const { title, description, permissions } = data;
      const query = 'INSERT INTO roles (title, description, permissions) VALUES (?, ?, ?)';
      const [res] = await db.query(query, [title, description, permissions]);
      return { id: res.insertId, title, description, permissions };

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
      const query = 'UPDATE roles SET ? WHERE rolId = ?';
      const [res] = await db.query(query, [data, id]);
      return { id, ...data, affectedRows: res.affectedRows };
    } catch (err) {
      throw ({ status: 500, message: "Error al actualizar el rol." });
    }
  },

  async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM roles WHERE rolId = ?', [id]);
      return { id, affectedRows: res.affectedRows };
    } catch (err) {
      throw ({ status: 500, message: "Error al eliminar el rol." });
    }
  }
};

export default mRol;
