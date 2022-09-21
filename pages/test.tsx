import Link from 'next/link';
import React from 'react';
import { Header } from '../components/layouts/Header/Header';

const test = () => {
  return (
    <>
        <Header/>
        <div>test</div>
        <Link  href="/">Home</Link>
    </>
  )
}

export default test