import React, { Component } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import Layout from "./Layout";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

class RequestForm extends Component {
  state = {
    description: "",
    value: "",
    recipient: "",
    loading: false,
    errorMessage: "",
  };
  onSubmit = async (event) => {
    event.preventDefault();
    const campaign = Campaign(this.props.address);
    const { description, value, recipient } = this.state;
    try {
      this.setState({ loading: true, errorMessage: "" });
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
        });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };
  render() {
    const { description, value, recipient, loading, errorMessage } = this.state;
    return (
      <Layout>
        <Form onSubmit={this.onSubmit} error={!!errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Value(in Ether)</label>
            <Input
              label="ether"
              labelPosition="right"
              value={value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient(address)</label>
            <Input
              value={recipient}
              onChange={(event) =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Ooops" content={errorMessage} />
          <Button primary loading={loading}>
            create
          </Button>
        </Form>
      </Layout>
    );
  }
}
export default RequestForm;
