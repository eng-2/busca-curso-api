const {prisma} = require("../Prisma/PrismaClient");
const {hash} = require("bcryptjs")

module.exports ={
   async create(req,res){

      const {name, username, password} = req.body
       const userAlreadExists = await prisma.user.findFirst({
           where :{
               username
           }
       })

       if(userAlreadExists){
           throw new Error("User already exists!")
       }
    
       const passwordHash = await hash(password,8)
       const user = await prisma.user.create({
           data:{
               name,
               username,
               password : passwordHash
           }
       })

       return res.status(201).json(user)
   } 
   
}
