const mysql = require('mysql2/promise');

const { dbConfig }  = require('./config');

const postCaptionToDatabase = async (cid, author, caption) => {
  const database = await mysql.createConnection(dbConfig);
  
  await database.execute(
    `INSERT INTO tb_captions VALUES(?, ?, ?)`,
    [cid, author, caption]
  );
  
  database.end();
};

const getCaptionFromDatabase = async () => {
  const database = await mysql.createConnection(dbConfig);
  
  const [ rows ] = await database.query(`
    SELECT author, caption  
    FROM tb_captions 
    ORDER BY RAND() LIMIT 1`
  );
  
  database.end();
  return rows[0];
}

const deleteCaptions = async () => {
  const database = await mysql.createConnection(dbConfig);
  
  await database.execute(`DELETE FROM tb_captions`);
  
  database.end();
}


module.exports = { postCaptionToDatabase,  getCaptionFromDatabase, deleteCaptions }