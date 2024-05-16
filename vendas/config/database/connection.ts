import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const DbConnect = async () => {

    const conection = await prisma.$connect()


    return conection
}