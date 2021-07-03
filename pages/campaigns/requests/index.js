import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import { element } from "prop-types";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);

    const length = await campaign.methods.getRequestsCount().call();
    const requests = await Promise.all(
      Array(length)
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );
    return { address, length, requests };
  }
  render() {
      const {address,length,requests} = this.props;
      console.log(requests);
    return (
      <Layout>
        <Link route={`/campaigns/${address}/requests/new`}>
          <Button>create request</Button>
        </Link>
      </Layout>
    );
  }
}
export default RequestIndex;
