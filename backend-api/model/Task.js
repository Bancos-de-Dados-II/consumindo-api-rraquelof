import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const Task = sequelize.define('Task',{
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    type:{
        type: DataTypes.ENUM('Pessoal', 'Profissional'),
        allowNull: false,

    },
    date: {
        type: DataTypes.DATE,
        get() {
          const value = this.getDataValue('date');
          return value ? new Date(value).toLocaleDateString() : null;  // Formatação opcional
        },
      },
      
});

export default Task;