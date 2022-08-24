import { useCallback, useEffect, useState } from "react";
import usePlatziPunks from "../usePlatziPunks";

const getPunksData = async ({ platziPunks, tokenId }) => {

    const [tokenURI, dna, owner, accessoriesType, clotheColor,
        clotheType, eyeType, eyeBrowType, facialHairColor, facialHairType,
        hairColor, hatColor, graphicType, mouthType, skinColor, topType] = await Promise.all([
            platziPunks.methods.tokenURI(tokenId).call(),
            platziPunks.methods.tokenDNA(tokenId).call(),
            platziPunks.methods.ownerOf(tokenId).call(),
            platziPunks.methods.getAccessoriesType(tokenId).call(),
            platziPunks.methods.getClotheColor(tokenId).call(),
            platziPunks.methods.getClotheType(tokenId).call(),
            platziPunks.methods.getEyeType(tokenId).call(),
            platziPunks.methods.getEyeBrowType(tokenId).call(),
            platziPunks.methods.getFacialHairColor(tokenId).call(),
            platziPunks.methods.getFacialHairType(tokenId).call(),
            platziPunks.methods.getHairColor(tokenId).call(),
            platziPunks.methods.getHatColor(tokenId).call(),
            platziPunks.methods.getGraphicType(tokenId).call(),
            platziPunks.methods.getMouthType(tokenId).call(),
            platziPunks.methods.getSkinColor(tokenId).call(),
            platziPunks.methods.getTopType(tokenId).call()
        ]);

    const responseMetada = await fetch(tokenURI);
    console.log(responseMetada)
    const metadata = await responseMetada.json();

    return {
        tokenId, attributes: {
            accessoriesType, clotheColor,
            clotheType, eyeType, eyeBrowType, facialHairColor, facialHairType,
            hairColor, hatColor, graphicType, mouthType, skinColor, topType
        }, tokenURI, dna, owner, ...metadata
    };
};


const usePlatziPunksData = () => {
    const [punks, setPunks] = useState([]);
    const [loading, setLoading] = useState(true);

    const platziPunks = usePlatziPunks();

    const update = useCallback(async () => {
        if (platziPunks) {
            setLoading(true);

            const totalSupply = await platziPunks.methods.totalSupply().call();
            let tokenIds = new Array(totalSupply).fill().map((_, index) => index);

            const punksPromise = tokenIds.map((tokenId) => getPunksData({ platziPunks, tokenId }));

            let receivedPunks = await Promise.all(punksPromise);
            setPunks(receivedPunks);

            setLoading(false);
        }
        setLoading(false);
    }, [platziPunks]);

    useEffect(() => {
        update();
    }, [update]);

    return { loading, punks, update };
};

const usePlatziPunkData = (tokenId = null) => {
    const [punk, setPunk] = useState([]);
    const [loading, setLoading] = useState(true);

    const platziPunks = usePlatziPunks();

    const update = useCallback(async () => {
        if (platziPunks && tokenId) {
            setLoading(true);
            const punkPromise = getPunksData({ platziPunks, tokenId });

            let receivedPunk = await punkPromise;
            setPunk(receivedPunk);

            setLoading(false);
        }
        setLoading(false);
    }, [platziPunks, tokenId]);

    useEffect(() => {
        update();
    }, [update]);

    return { loading, punk, update };

};

export { usePlatziPunksData, usePlatziPunkData };