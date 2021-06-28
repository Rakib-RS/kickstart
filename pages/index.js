import React, { Component } from 'react'
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import {Card,Button} from 'semantic-ui-react'

class index extends Component {
    static async getInitialProps(){
        const campaigns = await factory.methods.getDeployedCampaign().call();
        console.log(campaigns);
        return {campaigns};
        
    }
    renderCampaign () {
        const items = this.props.campaigns.map( address =>{
           return{
               header:address,
               description:<a>view campaign</a>,
               fluid:true
           };

        })
        return <Card.Group items={items}/>;
    }
    render() {
        return (
           <Layout>
               <h3>Open Campaigns</h3>
               <Button content="create campaign" icon="add circle" primary floated="right"/>
               {this.renderCampaign()}
           </Layout>
        )
    }
}

export default  index;
