import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xdCdF27cE8044880bd32E04Bd620AAe65566088A5"
);

export default instance;
