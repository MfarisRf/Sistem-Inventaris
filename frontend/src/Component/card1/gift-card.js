import React from 'react';
import { Elevation, H1, H5, H6, Card } from '@blueprintjs/core';
import classNames from 'classnames';
import styles from './gift-card.module.scss';

const defaultPhotoURL =
    'https://static.wixstatic.com/media/610b66_d0b7a2ef26934253bfb4830813411f02~mv2.jpg'; //img-1.jpg (800x776)

const GiftCard = ({
    className,
    photoURL = defaultPhotoURL,
    full = false,
    children,
}) => {
    return (
        <Card
            className={classNames(styles.card, className, {
                [styles.full]: full,
            })}
            elevation={Elevation.FOUR}
        >
            <img src={photoURL} alt="" />
            <div className={styles['card-body']}>
                <H1 className={styles.title}>LASHES & HAIR EXTENTIONS</H1>
                <H5 className={styles.desc}>
                    Donec faucibus, ante ut ultrices commodo, magna ex maximus, sodales neque dolor
                    vitae arcu. Nam euismod, neque quis laoreet interdum. Sed magna est, dictum at
                    faucibus.
                </H5>
                <div>{children}</div>
                <div className={styles.promo}>
                    <H6 className={styles.email}>
                        EMAIL | <br /> INFO@MYSITE.COM
                    </H6>
                    <H1 className={styles.price}>$50</H1>
                </div>
            </div>
        </Card>
    );
};

export default GiftCard;
