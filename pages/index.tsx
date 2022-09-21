import Link from 'next/link';
import React from 'react';
import Header from '../components/layouts/Header/Header';


const index = () => {
  return (
    <>
      <Header/>
      <div>index</div>
      <Link  href="/test">Test</Link>
    </>
  )
}

export default index