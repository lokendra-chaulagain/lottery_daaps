import { createContext, useState, useEffect, useContext } from "react";
export const appContext = createContext();
import Web3 from "web3";
import createLotteryContract from "../utils/lotteryContract";

export const AppProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [web3, setWeb3] = useState();
  const [lotteryContract, setLotteryContract] = useState(); //lottery contract can gets updated
  const [lotteryPot, setLotteryPot] = useState(0);
  const [lotteryPlayers, setPlayers] = useState([]);
  const [lastWinner, setLastWinner] = useState([]);
  const [lotteryId, setLotteryId] = useState();

  const [etherscanUrl, setEtherscanUrl] = useState();
  //============================================================================>
  const connectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // create web3 instance & set to state
        const web3 = new Web3(window.ethereum);
        //set web3 instance in React state
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0]);
        setLotteryContract(createLotteryContract(web3));
        window.ethereum.on("accountsChanged", async () => {
          const accounts = await web3.eth.getAccounts();
          setAddress(accounts[0]);
        });
      } catch (err) {
        console.log(err, "connect Wallet");
      }
    } else {
      console.log("Please install MetaMask");
    }
  };
  //------------------------------------------------------------------------------>

  //===============================================================================>
  const enterLottery = async () => {
    try {
      console.log("entering lottery");
      //backend func from contract
      await lotteryContract.methods.enter().send({
        from: address,
        // 0.015 ETH in Wei
        // value: "15000000000000000",
        value: web3.utils.toWei("0.01", "ether"),
        // 0.0003 ETH in Gwei
        gas: 300000,
        gasPrice: null,
      });
      updateLottery();
    } catch (err) {
      console.log(err, "enter");
    }
  };
  //------------------------------------------------------------------------------>

  //===============================================================================>
  //update lottery pot dynamically using our contract
  useEffect(() => {
    updateLottery()
  }, [lotteryContract])

  const updateLottery = async () => {
    if (lotteryContract) {
      try {
        const pot = await lotteryContract.methods.getBalance().call();
        setLotteryPot(web3.utils.fromWei(pot, "ether"));//converting wei to ether

        //get players method
        setPlayers(await lotteryContract.methods.getPlayers().call());

        setLotteryId(await lotteryContract.methods.lotteryId().call());

        setLastWinner(await lotteryContract.methods.getWinners().call());

        console.log([...lastWinner], "Last Winners");
      } catch (error) {
        console.log(error, "updateLottery");
      }
    }
  };
  //------------------------------------------------------------------------------>





  //===============================================================================>

  const pickWinner = async () => {
    try {
      let tx = await lotteryContract.methods.pickWinner().send({
        from: address,
        gas: 300000,
        gasPrice: null,
      })

      console.log(tx)
      setEtherscanUrl('https://ropsten.etherscan.io/tx/' + tx.transactionHash)
      updateLottery()
    } catch (err) {
      console.log(err, 'pick Winner')
    }
  }
  //------------------------------------------------------------------------------>



  return (
    <appContext.Provider
      value={{
        connectWallet,
        address,
        enterLottery,
        lotteryPot,
        lotteryPlayers,
        lotteryId,
        lastWinner
      }}>
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};
