import { Spinner } from '@chakra-ui/react';
import React, { useState } from 'react'
import  styles  from '../style/components/Loading.module.css';

const Loading = ({ message }: { message: string }) => {

    const SmallLoading = () => <Spinner color='yellow.400' className={ styles.world }/>

    const [start, setStart] = useState(false);

    setTimeout(() => {
        setStart(true);
    },1);

    return (
        <div className={styles.screen }>
            {/*  */}
            <h2 className={ styles.text }>
                { message }
                <Spinner color='orange.300' size='xl' className={ styles.hello }/>
                {start && <SmallLoading/>}
            </h2>
        </div>
    )
}

export default Loading