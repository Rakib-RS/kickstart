import React, { Component } from 'react'
import{Form} from 'semantic-ui-react';
import RequestForm from '../../../components/RequestForm';

class CreateRequest extends Component {
    static getInitialProps(props){
        const {address} = props.query;
        return{address};
    }
    render() {
        const {address} = this.props;
        return (
            <RequestForm address={address}/>
        )
    }
}
export default CreateRequest;
