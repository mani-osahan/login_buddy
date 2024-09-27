import Pool from "pg-pool";
import {PrismaPg} from "@prisma/adapter-pg"
import {PrismaClient} from "@prisma/client"

const connectionString = process.env.PG_URI;

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({adapter})
export default prisma;
