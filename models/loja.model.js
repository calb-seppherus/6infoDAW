module.exports = (sequelize, Sequelize) => {
    const Loja = sequelize.define("loja", {
        nome: { type: Sequelize.string},
        endereco: { type: Sequelize.string},
        foto: { type: Sequelize.string},
    },
    

    { freezeTableName: True}
    );
    return Loja
}
