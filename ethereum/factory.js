import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xcEE5c34B8D0093313370b0cAEdcB9A603fA5ae1D"
);

export default instance;
