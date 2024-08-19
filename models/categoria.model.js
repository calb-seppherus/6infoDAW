module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define("categoria", {
        nome: { type: Sequelize.string},
    },
    

    { freezeTableName: True }
    );
    return Categoria
}
