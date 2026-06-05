// scripts/initDB.js
const pool = require('../config/database');

const createTables = async () => {
  try {
    // Tabla de miembros
    await pool.query(`
      CREATE TABLE IF NOT EXISTS miembros (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        numero_whatsapp VARCHAR(20) UNIQUE NOT NULL,
        tipo_precursor VARCHAR(20) DEFAULT 'Ninguno',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Tabla "miembros" lista');

    // Tabla de informes
    await pool.query(`
      CREATE TABLE IF NOT EXISTS informes (
        id SERIAL PRIMARY KEY,
        miembro_id INTEGER REFERENCES miembros(id) ON DELETE CASCADE,
        mes INTEGER NOT NULL, -- 1-12
        año INTEGER NOT NULL,
        predico BOOLEAN DEFAULT false,
        tipo_precursor VARCHAR(20),
        horas INTEGER DEFAULT 0,
        estudios INTEGER DEFAULT 0,
        texto_original TEXT,
        fecha_procesamiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(miembro_id, mes, año)
      );
    `);
    console.log('✅ Tabla "informes" lista');

    console.log('🎉 Base de datos inicializada correctamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creando tablas:', error);
    process.exit(1);
  }
};

createTables();