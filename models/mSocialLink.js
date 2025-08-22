const db = require('../config/db');

const mSocialLink = {
    async getAll() {
        try {
            const query = 'SELECT socialLinksId, title, icon FROM socialLinks ORDER BY createdAt DESC';
            const [res] = await db.execute(query);
            return res;
        } catch (err) {
            throw ({ status: 500, message: "Error al obtener los social link." });
        }
    },

    async getById(id) {
        try {
            const query = 'SELECT * FROM socialLinks WHERE socialLinksId = ?';
            const [rows] = await db.execute(query, [id]);
            return rows[0] || null;
        } catch (error) {
            throw ({ status: 500, message: "Error al obtener social link por ID." });
        }
    },

    async create(data) {
        try {
            const { title, icon } = data;
            const query = 'INSERT INTO socialLinks (title, icon) VALUES (?, ?)';
            const [res] = await db.execute(query, [title, icon]);
            return { id: res.insertId, title, icon };
        } catch (err) {
            throw (
                err.code === 'ER_DUP_ENTRY'
                    ? { status: 409, message: "Este social link ya está registrado." }
                    : { status: 500, message: "Error al crear el social link." }
            )
        }
    },

    async update(id, data) {
        try {
            const query = 'UPDATE socialLinks ? WHERE socialLinksId = ?';
            const [res] = await db.execute(query, [data, id]);
            return { id, ...data, affectedRows: res.affectedRows };
        } catch (err) {
            throw ({ status: 500, message: "Error al actualizar el social link." });
        }
    },

    async delete(id) {
        try {
            const query = 'DELETE FROM socialLinks WHERE socialLinksId = ?';
            const [res] = await db.execute(query, [id]);
            return { id, affectedRows: res.affectedRows };
        } catch (err) {
            throw ({ status: 500, message: "Error al eliminar el rol." });
        }
    }
}

export default mSocialLink;
