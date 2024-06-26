

import { PrismaClient } from "@prisma/client";
import { PrismaUserRepository, createUser } from "~/features/user";
import { IRole } from "~/interfaces";


// Crea una instancia de PrismaClient
const prisma = new PrismaClient();

// Define la función principal de semilla
async function main() {

  
 


  await createUser(new PrismaUserRepository(), {
    email: '8kdots@gmail.com',
    name: 'admin',
    password: '123456',  
    phone: '999999789',
    role: IRole.ADMIN
  });
 
  
}

// Ejecuta la función de semilla
main().catch(e => {
  console.log(e);
  process.exit(1)
}).finally(() => prisma.$disconnect());
