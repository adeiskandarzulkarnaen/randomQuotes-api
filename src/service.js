const mysql = require('mysql2/promise');

const dbConfiguration = {
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'db_random_captions',
};


const postCaptionToDatabase = async (cid, author, caption) => {
  const database = await mysql.createConnection(dbConfiguration);
  
  await database.execute(
    `INSERT INTO tb_captions VALUES(?, ?, ?)`,
    [cid, author, caption]
  );
  
  database.end();
};

const getCaptionFromDatabase = async () => {
  const database = await mysql.createConnection(dbConfiguration);
  
  const [ rows ] = await database.query(`
    SELECT author, caption  
    FROM tb_captions 
    ORDER BY RAND() LIMIT 1`
  );
  
  database.end();
  return rows[0];
}

const deleteCaptions = async () => {
  const database = await mysql.createConnection(dbConfiguration);
  
  await database.execute(`DELETE FROM tb_captions`);
  
  database.end();
}


module.exports = { postCaptionToDatabase,  getCaptionFromDatabase, deleteCaptions }