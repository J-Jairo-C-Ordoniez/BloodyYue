import db from '../config/db.js'

const mTypePost = {
    async getAll() {
        try {
            const query = 'SELECT * FROM typePost ORDER BY createdAt DESC';
            const [res] = await db.query(query);
            return res || [];
        } catch (err) {
            throw ({ status: 500, message: "Error al obtener los tipos de post." });
        }
    },

    async getById(id) {
        try {
            const query = 'SELECT * FROM typePost WHERE typePostId = ?';
            const [rows] = await db.query(query, [id]);
            return rows[0] || [];
        } catch (err) {
            throw ({ status: 500, message: "Error al obtener el tipo de post por ID." });
        }
    },

    async create(data) {
        try {
            const { title, description } = data;
            const query = 'INSERT INTO typePost (title, description) VALUES (?, ?)';
            const [res] = await db.query(query, [title, description]);
            return { typePostId: res.insertId, title, description };
        } catch (err) {
            throw (
                err.code === 'ER_DUP_ENTRY'
                    ? { status: 409, message: "Este tipo de post ya está registrado." }
                    : { status: 500, message: "Error al crear el tipo de post." }
            );
        }
    },

    async update(id, data) {
        try {
            const query = 'UPDATE typePost SET ? WHERE typePostId = ?';
            const [res] = await db.query(query, [data, id]);
            return { typePostId: id, ...data, affectedRows: res.affectedRows };
        } catch (err) {
            throw ({ status: 500, message: "Error al actualizar el tipo de post." });
        }
    },

    async delete(id) {
        try {
            const query = 'DELETE FROM typePost WHERE typePostId = ?';
            const [res] = await db.query(query, [id]);
            return { typePostId: id, affectedRows: res.affectedRows };
        } catch (err) {
            throw ({ status: 500, message: "Error al eliminar el tipo de post." });
        }
    }
}

export default mTypePost;