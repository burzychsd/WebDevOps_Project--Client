import React from 'react';
import styles from './ChartContainer.module.scss';

const ChartContainer = (props) => {
    return (
        <div className={`${styles.ChartContainer} flex flex-column justify-center items-center`}>
        	{props.children}
        </div>
    );
};

ChartContainer.displayName = 'ChartContainer';

export default ChartContainer;
