import { contractAddress, contractAbi } from "./constants";

//This makes contract accessible from frontend
const createLotteryContract = (web3) => {
  return new web3.eth.Contract(contractAbi, contractAddress);
};

export default createLotteryContract;
