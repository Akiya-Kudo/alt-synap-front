import React from 'react';
import styles from '../../../styles/components/layouts/Header.module.css';


const Header = () => {
    return (
    <div className={styles.header}>
        <div className={ styles.headerBox }>
            <div className={ styles.logo }>logo</div>
            <div className={ styles.dig }>dig</div>
            <div className={ styles.nav }>
                <div className={ styles.add }>add</div>
                <div className={ styles.myIcon }>icon</div>
            </div>

        </div>
    </div>
    )
}

export default Header