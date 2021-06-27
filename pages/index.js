import React, { Component } from 'react'
import factory from '../ethereum/factory';
import Layout from '../components/Layout';

class index extends Component {
    // static async getInitialProps(){
    //     const campaigns = await factory.methods.getDeployedCampaign().call();
    //     console.log(campaigns);
    //     return {campaigns};
        
    // }
    render() {
        return (
           <Layout>
               <div>
                  ok
               </div>
           </Layout>
        )
    }
}

export default  index;
