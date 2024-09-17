module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("user", {
    id:{
      type: Sequelize.INTEGER,
    },
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
   
    role: {
      type: Sequelize.ENUM('admin', 'user'),
      defaultValue: 'user',
    },
    status: {
      type: Sequelize.ENUM('1', '0'),
      defaultValue: '1',
    },
  },
    {
      freezeTableName: true,
      underscored: true,
    });
  return user;
};