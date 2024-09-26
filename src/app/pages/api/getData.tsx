import pool from "./connect";

export default async function handler(req: any, res: any) {
try{

    const results = await pool.query("SELECT * FROM users");
    res.status(200).json(results.rows);
}catch(err){
    console.error("Getting Data Error", err)
    res.status(500).json({ error: "Error getting data" });
}
}