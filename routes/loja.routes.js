module.exports = (app) => {

    const multer = require("multer");
    const fs = require("fs");
    var path = require("path");
    var router = require("express").Router();
    

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/loja");
        },
        filename: function(req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({
        storage: storage,
    });

    router.post("/upload/", upload.single("file"), async (req,res) => {
        res.send({
            upload: true,
            file: req.file
        });
    });

    router.get("/upload/:arquivo", (req,res) => {
        const arquivo = path.dirname(__dirname)
        + `/uploads/loja/${req.params.arquivo}`;
        fs.readFile(arquivo, function (err, data) {
            res.contentType("png");
            res.send(data);
        });
    });

    const lojas = require("../controllers/loja.controller");

    // Rota que cria uma loja
    router.post("/", lojas.create);
    // Rota que retorna todas as lojas
    router.get("/", lojas.findAll);
    // Rota que retorna uma loja pelo id
    router.get("/:id", lojas.findOne,);
    // Rota que atualiza uma loja pelo id
    router.put("/:id", lojas.update);
    // Rota para deletar uma loja pelo id
    router.delete("/:id", lojas.delete);
    // Rota para deletar todas as lojas
    router.delete("/", lojas.deleteAll);

    app.use("/lojas", router);
};