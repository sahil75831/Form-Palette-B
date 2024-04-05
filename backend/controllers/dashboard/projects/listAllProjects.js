import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const listAllProjects = async (req, res) => {
    console.log("liast all project controller hit.. ", req.params)
    const  userID  = req.params.id
    console.log("..........")
    console.log(userID)
    console.log("..........")
    const listOfProjects = await db.project.findMany({where:{userId:userID}})
    return res.json({listOfProjects})
}

export { listAllProjects };
