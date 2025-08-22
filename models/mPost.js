import db from '../config/db.js'

const mCommission = {
  async getAll() {
    try {
      const query = `
        SELECT c.*, p.* 
        FROM commissions c 
        LEFT JOIN posts p ON c.exampleId = p.postId 
        ORDER BY c.createdAt DESC
      `;
      const [res] = await db.query(query);
      return res;
    } catch (err) {
      throw ({ status: 500, message: "Error al obtener las comisiones." });
    }
  },

  async getById(id) {
    try {
      const query = `
        SELECT c.*, p.* 
        FROM commissions c 
        LEFT JOIN posts p ON c.exampleId = p.postId 
        WHERE c.commissionId = ?
      `;
      const [rows] = await db.query(query, [id]);
      return rows[0] || null;
    } catch (err) {
      throw ({ status: 500, message: "Error al obtener comisión por ID." });
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

  async filter(options) {
    try {
      let query = "SELECT c.*, p.* FROM commissions c LEFT JOIN posts p ON c.exampleId = p.postId WHERE 1=1";
      const params = [];

      if (options.title) {
        query += " AND c.title LIKE ?";
        params.push(`%${options.title}%`);
      }

      if (options.details) {
        query += " AND c.details LIKE ?";
        params.push(`%${options.details}%`);
      }

      if (options.typePostId) {
        query += " AND p.typePostId = ?";
        params.push(options.typePostId);
      }

      if (options.minPrice && options.maxPrice) {
        query += " AND c.price BETWEEN ? AND ?";
        params.push(options.minPrice, options.maxPrice);
      }

      if (options.startDate && options.endDate) {
        query += " AND c.createdAt BETWEEN ? AND ?";
        params.push(options.startDate, options.endDate);
      }

      query += " ORDER BY c.createdAt DESC";

      if (options.limit) {
        query += " LIMIT ? OFFSET ?";
        params.push(options.limit, options.offset || 0);
      }

      const [res] = await db.query(query, params);
      return res;
    } catch (err) {
      throw ({ status: 500, message: "Error al filtrar comisiones." });
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


/* 
crear
grt id
get all
get paginated
get total
get date
filter title - dscription
filter type post
filter commission 
delete
update
*/