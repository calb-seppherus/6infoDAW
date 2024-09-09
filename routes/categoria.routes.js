module.exports = (app) => {
    const categorias = require("../controllers/categoria.controller");
    var router = require("express").Router();

    // Rota que cria uma categorias
    router.post("/", categorias.create);
    // Rota que retorna todas as categoria
    router.get("/", categorias.findAll);
    // Rota que retorna uma categorias pelo id
    router.get("/:id", categorias.findOne,);
    // Rota que atualiza uma categorias pelo id
    router.put("/:id", categorias.update);
    // Rota para deletar uma categorias pelo id
    router.delete("/:id", categorias.delete);
    // Rota para deletar todas as categoria
    router.delete("/", categorias.deleteAll);

    app.use("/categorias", router);
};