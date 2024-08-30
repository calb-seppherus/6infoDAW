const db = require("../models");
const Produto = db.produtos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.nome) {
        res.status (400) .send ({
            message: "Conteudo não pode estar vazio!",
        });
        return;
    }


    const produto = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        foto: req.body.foto,
        lojaId: req.body.lojaId,
    };


    produto.create(produto)
        .then((data) => {
            res.send(data);
        })
        
        .catch((err) => {
            res.status (500).send({
                message: err.message || "Erro durante a criação do produto",
            });
        });
};

exports.findAll = (req, res) => {
    const nome = req.query.nome;
        var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

    Produto.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        
        .catch((err) => {
            res.status (500).send({
                message: err.message || "Erro durante a procura do produto",
            });
        });
};

exports.findOne = (req, res) => {
        const id = req.params.id;

    Produto.findByPk(id)
    .then((data) => {
        if (data) {
            res.send(data);
        } else {
            res.status (404).send({
                message: `Não é possivel achar o Produto com o id= ${id}.`,
            });
        }
    })
    .catch((err) => {
        res.status (500).send({
            message: "Erro na busca por produto pelo id=" + id,
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

   Produto.update (req.body, {
    where: { id: id },
   })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "produto foi atualizado com sucesso.",
                });
            } else {
                res.send({
                    message: `Não foi possível atualizar Produto com id= ${id}. Talvez o 
                    produto não tenha sido encontrada ou req.body está vazio!` ,
                });
            }
        })
        .catch((err) => {
            res.status (500).send ({
                message : "Erro em atualizar a Produto via id=" + id,
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id

    Produto.destroy({
        where: { id: id },
    })

        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Produto deletado com sucesso!",
                });
            }
            else {
                res.send({
                    message: `Não foi possivel deletar esse produto. ele não foi encontrado`
            })
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: "Não é possivel deletar produto com id=" +id,
        });

            
    });
};

exports.deleteAll = (req, res) => {
    Produto.destroy({
        where: {},
        truncate: false,
    })

        .then((nums) => {
            res.send({ message: `${nums} Produtos foram deletados com sucesso!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Erro enquanto deletava os produtos",
            });
        });
};