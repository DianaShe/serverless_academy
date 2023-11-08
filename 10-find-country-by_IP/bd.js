const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: "db.gjwnarhrnrrhbvssyrla.supabase.co",
    database: 'postgres',
    password: "serverless0311",
    port: 5432
})



module.exports = pool