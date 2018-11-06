import React from 'react';
import { ReactComponent as NotFoundPic } from './not-found.svg';

const NotFound = () => {
    return (
        <div className='w-100 h-100 flex justify-center items-center'>
			<NotFoundPic />
        </div>
    );
};

NotFound.displayName = 'NotFound';

export default NotFound;
