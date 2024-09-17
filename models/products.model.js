module.exports = (sequelize, Sequelize) => {
  const products = sequelize.define("products", {
    id:{
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    price:{
      type: Sequelize.INTEGER,
    },
    description: {
      type: Sequelize.STRING,
    },
    is_displayed: {
      type: Sequelize.ENUM('1', '0'),
      defaultValue: '1',
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
  return products;
};