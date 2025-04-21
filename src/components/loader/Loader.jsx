import { RotatingLines } from 'react-loader-spinner'

export function Loader() {
    return (
        <RotatingLines
            visible={true}
            height="70"
            width="70"
            color="grey"
            strokeWidth="5"
            strokeColor='orange'
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    );
};