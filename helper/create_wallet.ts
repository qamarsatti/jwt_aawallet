const { Contract, Wallet } = require('ethers')
const { getZeroDevSigner } = require('@zerodevapp/sdk')

const projectId = process.env.PROJECT_ID
const wallet = new Wallet(process.env.PRIVATE_KEY)



export  async function CreateAddress() {
  const signer = await getZeroDevSigner({
    projectId,
    owner: wallet,
  })

  const address = await signer.getAddress()
  console.log('My address:', address)


}

