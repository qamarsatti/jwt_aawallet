import {  sha256 } from "ethers/lib/utils";
import type { NextApiRequest, NextApiResponse } from 'next'
// import prisma client
import { PrismaClient } from "@prisma/client";
const hash = require('hash-converter');
const hashAlgorithm = 'sha256';
const jwt = require('jsonwebtoken');














const prisma = new PrismaClient();
export default async function handle(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === "POST") {
    //login uer
    await loginUserHandler(req, res);
  } else {
    return res.status(405);
  }
}
async function loginUserHandler(req:NextApiRequest, res:NextApiResponse) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "invalid inputs" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
    if (user && user.password === hash.SHA256(password).toString()) {
      // exclude password from json response


      

      const payload = {
        userId: user.id,
        email: 'email'
      };
      const secretKey = process.env.jwtkey;
      const options = {
        expiresIn: '120s' // Token expires in 5 hour
      };
      const token = jwt.sign(payload, secretKey, options);
      // return res.status(200).json(exclude(user, ["password"]));
      return res.status(200).json({"token":token});
    } else {
      return res.status(401).json({ message: "invalid credentials" });
    }
  } catch (e:any) {
    return res.status(401).json({ message:e.message });
  }
}
// Function to exclude user password returned from prisma
function exclude(user:any, keys:any) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}