import { useState } from 'react';
import { restoreSelection } from '../../../utils';

const useColorOptions = () => {
    const [showColorOptions, setShowColorOptions] = useState(false);

    const toggleColorOptions = (range?: Range) => {
        setShowColorOptions((prevOption) => !prevOption);
        if (range) restoreSelection(range);
    };

    return {
        showColorOptions,
        toggleColorOptions,
    };
};

export default useColorOptions;
