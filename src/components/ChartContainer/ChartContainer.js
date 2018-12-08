import React from 'react';
import styles from './ChartContainer.module.scss';

const ChartContainer = (props) => {
    return (
        <canvas className={styles.ChartContainer}>
        	{props.children}
        </canvas>
    );
};

ChartContainer.displayName = 'ChartContainer';

export default ChartContainer;
