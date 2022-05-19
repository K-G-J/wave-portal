const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log("Contract delployed to: ", waveContract.address);
  console.log("Contract delployed to: ", owner.address)

  // get contract balance 
  let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));

  // initial wave count 
  let waveCount;
  waveCount = await waveContract.totalWaves();
  console.log(waveCount.toNumber());

  // sending a wave (from owner)
  let waveTxn = await waveContract.wave("This is wave #1");
  await waveTxn.wait(); // wait for transaction to be mined

  // sending another wave transaction (from random person)
  waveTxn2 = await waveContract.connect(randomPerson).wave("This is wave #2");
  await waveTxn2.wait();
  // test for waving without waiting - passed
  // waveTxn3 = await waveContract.connect(randomPerson).wave("This is wave #3");
  // await waveTxn3.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);

};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();