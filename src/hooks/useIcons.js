import {useState, useEffect} from 'react';

export const useIcons = () => {
    const [icons, setIcons] = useState([]);

    const iconsArray = [
    "eye",
    "eye",
    "eye",
    "eye",
    "star",
    "star",
    "star",
    "star",
    "heart",
    "heart",
    "heart",
    "heart",
    "diamond",
    "diamond",
    "diamond",
    "diamond"
    ];

    useEffect(() => {
        let isMounted = true;

       setIcons( shuffleArray(iconsArray) );

        return () => {
        isMounted = false;
        return isMounted;
        };
    }, [])

    const shuffleArray = (inputArray) => {
        let t, j; 

        for ( let i = 0; i < inputArray.length; i++) {
            j = Math.floor(Math.random() * (i + 1));
            t = inputArray[i];
            inputArray[i] = inputArray[j];
            inputArray[j] = t;
        }

        return inputArray;
    }

    return {icons};
}

