import web3 from "./web3";
import campaign from "./build/Campaign.json";

const Campaign = (address) => {
  return new web3.eth.Contract(JSON.parse(campaign.interface), address);
};
export default Campaign;
