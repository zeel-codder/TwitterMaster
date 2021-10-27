import React from 'react';

/**
 * Loader of App. this FC is Load when any data will fetch from api.
 */

const Loading:React.FC<{}> = () => {
    return (
        <div className="place-load">
            <div className="Load">
            </div>
        </div>
    );
}

export default Loading;
