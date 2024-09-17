function returnSuccess(data, req, res, next) {
    res.status(data.statusCode || 200);
    res.json(data);
}

module.exports = { returnSuccess };
