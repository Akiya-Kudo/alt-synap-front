import React from 'react';
import {Header} from '../components/layouts/Header/Header';
import CardContainer from '../components/CardContainer';
import Top from '../components/Top';
import { NextPage } from 'next';
import TagHeader from '../components/layouts/Header/TagHeader';


const index: NextPage  = () => {

  return (
    <>
      <Header/>
      <TagHeader/>
      <div className="page">
        <Top/>
        <CardContainer/>
      </div>
    </>
  )
}

export default index