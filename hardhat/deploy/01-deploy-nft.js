const { network } = require("hardhat")
const { WHITELIST_CONTRACT_ADDRESS, METADATA_URL } = require("../constants")
const { verify } = require("../utils/verify")

const developmentChains = ["localhost", "hardhat"]

module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const whitelistContractAddress = WHITELIST_CONTRACT_ADDRESS
    const metadataURL = METADATA_URL

    const args = [metadataURL, whitelistContractAddress]

    const cryptoDevsContract = await deploy("CryptoDevs", {
        from: deployer,
        args: args,
        log: true,
    })

    log(`Crypto Devs Contract Address: ${cryptoDevsContract.address}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(cryptoDevsContract.address, args)
    }

    log("-------------------------------------")
}
