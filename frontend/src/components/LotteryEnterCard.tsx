import React from "react";
import { useAppContext } from "../../context/context";

const LotteryEnterCard = () => {
  const { enterLottery, lotteryPot } = useAppContext();
  return (
    <div className="d-flex justify-content-center align-items-center h100 ">
      <div className="card border-0 rounded-0">
        <div className="card-body custom_card">
          <p className="text-end m-0 card_header_text ">Lottery Id: 083nnd64b83-474b6</p>
          <p className="text-end  m-0  card_header_text">Lottery No: 4</p>
          <p>Lottery poy amount {lotteryPot} ETH </p>
          <h5 className="m-0 mt-3 card_heading text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h5>
          <small className="d-flex justify-content-center card_header_text">Lottery Entry fee is 0006Ethers</small>
          <button onClick={enterLottery} type="button" className="btn mt-3  col-12 custom_button rounded-1">
            Participate
          </button>
          <button type="button" className="btn mt-2 col-12 custom_button rounded-1 mt-2">
            Select Random Winner
          </button>

          <h5 className="m-0 mt-3 card_heading text-center">Congratulation</h5>
          <p className="m-0 card_footer_h2  card_heading text-center">And the winner of Lottery number 4 is </p>
          <p className="m-0 card_footer_h2  text-center">94857504-4-4745453</p>
        </div>
      </div>
    </div>
  );
};

export default LotteryEnterCard;
