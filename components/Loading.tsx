import { Spinner } from '@chakra-ui/react';
import React, {  ReactNode } from 'react'
import  styles  from '../styles/components/Loading.module.css';

const Loading = ({ message }: { message: string }) => {
    return (
        <div className={styles.screen }>
            {/*  */}
            <h2 className={ styles.text }>
                { message }
                <Spinner color='orange.300' size='xl' className={ styles.hello }/>
                <Spinner color='yellow.400' className={ styles.world }/>
            </h2>
        </div>
    )
}

export default Loading