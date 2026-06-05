const { Pool } = require('pg');
require('dotenv').config();

const Pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 10, // Número máximo de conexiones en el pool
  idleTimeoutMillis: 30000, // Tiempo de espera antes de cerrar una conexión inactiva
})

pool.connect((err,client,release) => {
  if (err){
    console.error('❌ Error conectando a PostgreSQL:', err.stack);
  } else {
    console.log('✅ Conectado a PostgreSQL correctamente');
    release();
  }

});

module.exports = pool;