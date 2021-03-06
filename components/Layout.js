import React from "react";
import Header from "./Header";
import Head from 'next/head'
import {Container} from 'semantic-ui-react'

const layout = (props) => {
  return (
    <Container style={{marginTop:'5px'}}>
      <Head>
      <link href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" rel="stylesheet" />
      </Head>
      <Header/>
      {props.children}
      
    </Container>
  );
};

export default layout;
