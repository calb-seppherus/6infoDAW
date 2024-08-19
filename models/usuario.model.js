module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("loja", {
        nome: { type: Sequelize.string },
        email: { type: Sequelize.string },
        senha: { type: Sequelize.string },
    },


    { freezeTableName: True}
    );
    return Usuario
}