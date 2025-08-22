const db = require('../config/db');

const mSocialUser = {
    async getAll() {
        try {
            const query = 'SELECT sxuId, userId, socialLinksId, socialUrl FROM socialXUser ORDER BY createdAt DESC';
            const [res] = await db.execute(query);
            return res;
        } catch (err) {
            throw ({ status: 500, message: "Error al obtener los social x user." });
        }
    },

    async getById(id) {
        try {
            const query = 'SELECT * FROM socialXUser WHERE sxuId = ?';
            const [rows] = await db.execute(query, [id]);
            return rows[0] || null;
        } catch (error) {
            throw ({ status: 500, message: "Error al obtener social x user por ID." });
        }
    },

    async create(data) {
        try {
            const { userId, socialLinksId, socialUrl } = data;
            const query = 'INSERT INTO socialXUser (userId, socialLinksId, socialUrl) VALUES (?, ?, ?)';
            const [res] = await db.execute(query, [userId, socialLinksId, socialUrl]);
            return { sxuId: res.insertId, userId, socialLinksId, socialUrl };
        } catch (err) {
            throw (
                err.code === 'ER_DUP_ENTRY'
                    ? { status: 409, message: "Este social x user ya está registrado." }
                    : { status: 500, message: "Error al crear el social x user." }
            )
        }
    },

    async update(id, data) {
        try {
            const query = 'UPDATE socialXUser ? WHERE socialLinksId = ?';
            const [res] = await db.execute(query, [data, id]);
            return { id, ...data, affectedRows: res.affectedRows };
        } catch (err) {
            throw ({ status: 500, message: "Error al actualizar el social link." });
        }
    },

    async delete(id) {
        try {
            const query = 'DELETE FROM socialXUser WHERE sxuId = ?';
            const [res] = await db.execute(query, [id]);
            return { sxuId: id, affectedRows: res.affectedRows };
        } catch (err) {
            throw ({ status: 500, message: "Error al eliminar el social x user." });
        }
    }
}

export default mSocialUser;