import React, { Component } from "react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Card, Button } from "semantic-ui-react";
import { Link } from "../routes";

class index extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaign().call();
    
    return { campaigns };
  }
  renderCampaign() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>view campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Layout>
        <h3>Open Campaigns</h3>
        <Link route="/campaigns/new">
          <a>
            <Button
              content="create campaign"
              icon="add circle"
              primary
              floated="right"
            />
          </a>
        </Link>
        {this.renderCampaign()}
      </Layout>
    );
  }
}

export default index;
