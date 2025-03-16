const audminAuth = (req, res, next) => {
    const token = "xyz";
    const isAuthenticated = token === "xyz";

    if (!isAuthenticated) {
        res.status(402).send("authentication failed");
    } else {
        next()
    }
}

module.exports= {audminAuth};
