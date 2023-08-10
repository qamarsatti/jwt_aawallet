
import type { NextApiRequest, NextApiResponse } from 'next'
// We impot our prisma client
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
// Prisma will help handle and catch errors
const { Contract, Wallet } = require('ethers')
const { getZeroDevSigner } = require('@zerodevapp/sdk')

const projectId = process.env.PROJECT_ID




export  async function CreateAddress() {
  const wallet = new Wallet(process.env.PRIVATE_KEY)
  const signer = await getZeroDevSigner({
    projectId,
    owner: wallet,
  })

  const address = await signer.getAddress()
  return address


}



const hash = require('hash-converter');
 
// const sha256 = hash.SHA256('hello-world');


const hashAlgorithm = 'sha256';
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handle(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === "POST") {
    // create user
    await createUserHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}


// We hash the user entered password using crypto.js
export function HashPassword (string:string)  {
  return hash.SHA256(string).toString()
};
// function to create user in our database
async function createUserHandler(req:NextApiRequest, res:NextApiResponse) {
  let errors = [];
  const { name, email, password } = req.body;
 ``
  if (password.length < 6) {
    errors.push("password length should be more than 6 characters");
    return res.status(400).json({ errors });
  }
  try {
    
    const checkemail=await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    if (checkemail){
      errors.push("email already exist");
    return res.status(400).json({ errors });
    }
    const randomKey = crypto.randomBytes(32).toString("hex");
    const address= await CreateAddress()
    const user = await prisma.user.create({
      // data: { ...req.body, password: hashPassword(req.body.password) },
      data: {email:email,name:name,address:address,privatekey:randomKey,password:HashPassword(req.body.password) },
    });
    return res.status(201).json({ user });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({ message: e.message });
      }
      return res.status(400).json({ message: e.message });
    }
  }
}