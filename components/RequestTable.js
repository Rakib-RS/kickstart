import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";

class RequestTable extends Component {
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
          <Button color="green" basic>
            approve
          </Button>
        </Cell>
        <Cell>
          <Button color="teal" basic>
            finalize
          </Button>
        </Cell>
      </Row>
    );
  }
}

export default RequestTable;
