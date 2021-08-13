const mysqlPromise = require('../config/database');

const newsModel = {
  newsList: async function(params) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];

    try {
      res = await connection.execute(`SELECT * FROM \`Fastify-quasar\`.Products ORDER BY id ;`);
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
      return false
    }
    return res.length > 0 ? res : null;
  },

  newsSearch: async function(id) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];

    try {
      res = await connection.execute(`SELECT * FROM  \`Fastify-quasar\`.Products WHERE id LIKE ? OR color LIKE ? OR size LIKE ? OR quantity LIKE ? OR location_name LIKE ? OR del_flg LIKE ? OR catalog_name LIKE ?`, [id,id,id,id,id,id,id] );
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
      return false
    }
    return res.length > 0 ? res : null;
  },
  newsSearchCatalogColor: async function(ca,co) {
    const connection = await mysqlPromise.DATABASE.getConnection();
    var res = [{}];

    try {
      res = await connection.execute(`SELECT * FROM  \`Fastify-quasar\`.Products WHERE color LIKE ? AND catalog_name LIKE ?`, [co,ca] );
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
      return fals
    }
    return res.length > 0 ? res : null;
  },
  postProduct: async function(catalog,location,size,quantity,del,color) {
    const connection = await mysqlPromise.DATABASE.getConnection();
  
    try {
     await connection.query(`INSERT INTO \`Fastify-quasar\`.Products (catalog_name,location_name, size,quantity,del_flg,color) VALUES (?,?,?,?,?,?)`, [catalog,location,size,quantity,del,color] );
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
    }
  },
  updateProduct: async function(catalog,location,size,quantity,del,color,id) {
    const connection = await mysqlPromise.DATABASE.getConnection();
  
    console.log(id);
    try {
     await connection.query(`UPDATE \`Fastify-quasar\`.Products SET catalog_name = ?, location_name = ?, size = ?, quantity = ?, del_flg = ?, color = ? WHERE ( id = ?) `, [catalog,location,size,quantity,del,color,id] );
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
    }
  },
  deleteProduct: async function(id) {
    const connection = await mysqlPromise.DATABASE.getConnection();
  
    console.log(id);
    try {
     await connection.query(`DELETE FROM \`Fastify-quasar\`.Products WHERE id LIKE ?`, [id] );
      connection.release();
    }
    catch (err) {
      console.error(err)
      connection.release();
    }
  },
}

module.exports = newsModel;