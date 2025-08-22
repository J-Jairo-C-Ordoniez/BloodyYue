import db from '../config/db.js'

const mCommission = {
  async getAll() {
    try {
      const query = 'SELECT c.*, p.* FROM commissions c LEFT JOIN posts p ON c.exampleId = p.postId ORDER BY c.createdAt DESC';
      const [res] = await db.query(query);
      return res;
    } catch (err) {
      throw ({ status: 500, message: "Error al obtener las comisiones." });
    }
  },

  async getById(id) {
    try {
      const query = 'SELECT c.*, p.* FROM commissions c LEFT JOIN posts p ON c.exampleId = p.postId WHERE c.commissionId = ?';

      const [rows] = await db.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      throw ({ status: 500, message: "Error al obtener comisión por ID." });
    }
  },

  async filterByPrice(minPrice, maxPrice) {
    try {
      const query = 'SELECT * FROM commissions WHERE price BETWEEN ? AND ? ORDER BY price ASC';
      const [res] = await db.query(query, [minPrice, maxPrice]);
      return res || [];
    } catch (err) {
      throw ({ status: 500, message: "Error al filtrar comisiones por precio." });
    }
  },

  async filterByDate(startDate, endDate) {
    try {
      const query = 'SELECT * FROM commissions WHERE createdAt BETWEEN ? AND ? ORDER BY createdAt DESC';
      const [res] = await db.query(query, [startDate, endDate]);
      return res || [];
    } catch (err) {
      throw ({ status: 500, message: "Error al filtrar comisiones por fecha." });
    }
  },

  async findAllPaginated(limit, offset) {
    try {
      const query = 'SELECT * FROM commissions ORDER BY createdAt DESC LIMIT ? OFFSET ?';
      const [res] = await db.query(query, [limit, offset]);
      return res || [];
    } catch (err) {
      throw ({ status: 500, message: "Error en la paginación de comisiones." });
    }
  },

  async getTotalCount() {
    try {
      const query = 'SELECT COUNT(*) as total FROM commissions';
      const [res] = await db.query(query);
      return res[0].total;
    } catch (err) {
      throw ({ status: 500, message: "Error al contar comisiones." });
    }
  },

  async getAveragePrice() {
    try {
      const query = 'SELECT AVG(price) as average FROM commissions';
      const [res] = await db.query(query);
      return res[0].average;
    } catch (err) {
      throw ({ status: 500, message: "Error al calcular promedio de precios." });
    }
  },

  async create(data) {
    try {
      const { title, details, exampleId, price } = data;
      const query = 'INSERT INTO commissions (title, details, exampleId, price) VALUES (?, ?, ?, ?)';
      const [res] = await db.query(query, [title, details, exampleId, price]);
      return { commissionId: res.insertId, title, details, exampleId, price };
    } catch (err) {
      throw (
        err.code === 'ER_DUP_ENTRY'
          ? { status: 409, message: "Esta comisión ya está registrada." }
          : { status: 500, message: "Error al crear la comisión." }
      );
    }
  },

  async update(id, data) {
    try {
      const query = 'UPDATE commissions SET ? WHERE commissionId = ?';
      const [res] = await db.query(query, [data, id]);
      return { commissionId: id, ...data, affectedRows: res.affectedRows };
    } catch (err) {
      throw ({ status: 500, message: "Error al actualizar la comisión." });
    }
  },

  async delete(id) {
    try {
      const query = 'DELETE FROM commissions WHERE commissionId = ?';
      const [res] = await db.query(query, [id]);

      return { id, affectedRows: res.affectedRows };
    } catch (err) {
      throw ({ status: 500, message: "Error al eliminar la comisión." });
    }
  }
}

export default mCommission;