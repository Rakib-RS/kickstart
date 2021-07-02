import React, { Component } from "react";
import Campaign from "../../ethereum/campaign";
import { Card } from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    //console.log(summary)
    const balance = summary[0];
    const minimumContribution = summary[1];
    const requestsLength = summary[2];
    const approversCount = summary[3];
    const manager = summary[4];
    return {
      balance,
      minimumContribution,
      requestsLength,
      approversCount,
      manager,
    };
  }
  renderSummary() {
    const {
      balance,
      minimumContribution,
      requestsLength,
      approversCount,
      manager,
    } = this.props;
    const items = [
      {
        header: manager,
        meta: "manager Address",
        description: "manager who creates contract and request for money",
        style:{overflowWrap : 'break-word'}
      },
      {
          header:minimumContribution,
          meta:'minimum wei that needs for contribution',
          description:'you have to pay this minimim wei to become a approvers',
          style:{overflowWrap: 'break-word'}
      },
      {
        header:approversCount,
        meta:'contributor',
        description:'number of people who contributed already in this campaign'

      },
      {
          header:requestsLength,
          meta:'number of requests',
          description:'made request by manager to withdraw money and send to a person'
      },
      {
          header:web3.utils.fromWei(balance,'ether'),
          meta:'balance of this campaign(ether)',
          description:'total amount of ether this campaign has left to spend'
      }
    ];
    return <Card.Group items={items} />;
  }
  render() {
    return <Layout>
        <h3>Campaign Details</h3>
        {this.renderSummary()}</Layout>;
  }
}

export default CampaignShow;
