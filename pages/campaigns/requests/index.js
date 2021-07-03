import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import RequestTable from "../../../components/RequestTable";
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
    const approversCount = await campaign.methods.approversCount().call();
    return { address, length, requests, approversCount };
  }
  renderRow() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestTable
          key={index}
          id={index}
          request={request}
          approversCount={this.props.approversCount}
          address={this.props.address}
        />
      );
    });
  }
  render() {
    const { address } = this.props;
    const { HeaderCell, Body, Row, Header } = Table;
    //console.log(requests);
    return (
      <Layout>
        <Link route={`/campaigns/${address}/requests/new`}>
          <Button floated="right" primary style={{ marginBottom: "10px" }}>
            Add request
          </Button>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>Id</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount(Ether)</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRow()}</Body>
        </Table>
      </Layout>
    );
  }
}
export default RequestIndex;
