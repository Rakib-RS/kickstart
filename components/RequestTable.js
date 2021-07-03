import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { Router } from "../routes";

class RequestTable extends Component {
  state = {
    loading: false,
    loadingf:false
  };
  approveRequest = async () => {
    const campaign = Campaign(this.props.address);
    try {
      this.setState({ loading: true });
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0],
      });
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      console.log(err);
    }
    this.setState({ loading: false });
  };
  finalizeRequest = async () => {
    const campaign = Campaign(this.props.address);
    try {
      this.setState({ loadingf: true });
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(this.props.id).send({
        from: accounts[0],
      });
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      console.log(err);
    }
    this.setState({ loadingf: false });
  };
  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalsCount}/{approversCount}
        </Cell>
        <Cell>
          <Button
            color="green"
            basic
            onClick={this.approveRequest}
            loading={this.state.loading}
          >
            approve
          </Button>
        </Cell>
        <Cell>
          <Button
            color="teal"
            basic
            onClick={this.finalizeRequest}
            loading={this.state.loadingf}
          >
            finalize
          </Button>
        </Cell>
      </Row>
    );
  }
}

export default RequestTable;
