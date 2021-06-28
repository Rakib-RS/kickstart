import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input } from "semantic-ui-react";
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";

class createCampaign extends Component {
  state = {
    minimumContribution: "",
  };
  onSubmit = async event =>{
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();

      await factory.methods.createCampaign(this.state.minimumContribution).send({
          from :accounts[0]
      })


  }
  render() {
    return (
      <Layout>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Minimun Contribution </label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <Button primary>create</Button>
          </Form.Field>
        </Form>
      </Layout>
    );
  }
}
export default createCampaign;
