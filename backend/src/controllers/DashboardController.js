module.exports = {
    async show(req, res) {
        const { user_id } = req.headers;

        return res.json({ message: 'ok' });
    }
}