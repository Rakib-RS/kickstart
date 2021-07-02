import React, { Component } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import {Router} from '../routes';
class ContributeForm extends Component {
  state = {
    value: '',
    loading:false,
    errorMessage:''
  };
  onSubmit = async (event) => {
    event.preventDefault();
    const campaign = Campaign(this.props.address);
    try{
      this.setState({loading:true,errorMessage:''});
      const accounts = await web3.eth.getAccounts()
       await campaign.methods.contribute().send({
          from:accounts[0],
          value: web3.utils.toWei(this.state.value,'ether')
       });
       Router.replaceRoute(`/campaigns/${this.props.address}`);
    }catch(err){
      this.setState({errorMessage:err.message});
    }
    this.setState({loading:false});
   
  };
  render() {
    const {value,loading,errorMessage} = this.state;
    //console.log(loading);
    return (
      <Form onSubmit={this.onSubmit} error={!!errorMessage} >
        <Form.Field>
          <label>Ampunt to Contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            value={value}
            onChange={event => this.setState({value:event.target.value})}
          />
        </Form.Field>
       <Message error header="Ooops!" content={errorMessage}/>
        <Button primary loading={loading} >
          contribute
        </Button>
      </Form>
    );
  }
}
export default ContributeForm;
