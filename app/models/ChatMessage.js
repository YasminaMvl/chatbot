const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class ChatMessage extends Model {
    static associate(models) {
        // Définir les associations avec d'autres modèles, le cas échéant
    }
}

ChatMessage.init(
    {
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'ChatMessage',
    }
);

module.exports = ChatMessage;
