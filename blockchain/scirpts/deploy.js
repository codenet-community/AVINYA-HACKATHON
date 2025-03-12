async function main() {
    // Get the deployer account details
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    // Get the Sentinel contract factory and deploy
    const Sentinel = await ethers.getContractFactory("Sentinel");
    const sentinel = await Sentinel.deploy();
    await sentinel.deployed();
  
    console.log("Sentinel deployed to:", sentinel.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
  