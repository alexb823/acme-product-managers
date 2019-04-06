const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost/acme_product_managers_db', {
  logging: false,
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Product.belongsTo(User, { as: 'manager' });

const userNames = ['moe', 'larry', 'curly'];

const syncAndSeed = () => {
  return db
    .sync({ force: true })
    .then(() => Promise.all(userNames.map(name => User.create({ name }))))
    .then(([moe, larry, curly]) =>
      Promise.all([
        Product.create({ name: 'foo', managerId: moe.id }),
        Product.create({ name: 'bar', managerId: curly.id }),
        Product.create({ name: 'bazz' }),
      ])
    )
    .then(() => console.log('Database synced and seeded!'))
    .catch(err => console.error(err));
};

syncAndSeed();
