import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';

import PlatziPunksEAGArtifact from '../../config/web3/artifacts/PlatziPunksEAGArtifact';

const { address, abi } = PlatziPunksEAGArtifact;

const usePlatziPunks = () => {
    const { active, library, chainId } = useWeb3React();

    const platziPunks = useMemo(() => {
        if (active) return new library.eth.Contract(abi, address[chainId]);
    }, [active, chainId, library?.eth?.Contract]);

    return platziPunks;
};

export default usePlatziPunks;