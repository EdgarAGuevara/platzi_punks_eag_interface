import { Grid, InputGroup, InputLeftElement, InputRightElement, ButtonSpinner, FormHelperText, FormControl, Input, Button } from '@chakra-ui/react';
import { SearchIcon } from "@chakra-ui/icons";
import PunkCard from '../../components/punk-card';
import Loading from '../../components/loading';
import RequestAccess from '../../components/request-access';
import { useWeb3React } from '@web3-react/core';
import { usePlatziPunksData } from '../../hooks/usePlatziPunksData';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const Punks = () => {
  const { search } = useLocation();
  const { active, library } = useWeb3React();
  const [address, setAddress] = useState(new URLSearchParams(search).get('address'));
  const [submitted, setSubmitted] = useState(true);
  const [validAddress, setValidAddress] = useState(true);

  const navigate = useNavigate();

  const { punks, loading } = usePlatziPunksData({ owner: submitted && validAddress ? address : null });

  const handleAddressChange = ({ target: { value } }) => {
    console.log(value);
    setAddress(value);
    setSubmitted(false);
    setValidAddress(false);
  };

  const submit = (event) => {
    event.preventDefault();

    if (address) {
      const isValid = library.utils.isAddress(address);
      setValidAddress(isValid);
      setSubmitted(true);
      if (isValid) navigate(`/punks?address=${address}`);
    } else {
      navigate('/punks');
    }
  }


  if (!active) return <RequestAccess />;

  return (
    <>
      <form onSubmit={submit}>
        <FormControl>
          <InputGroup mb={3}>
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
            <Input isInvalid={false}
              value={address ?? ''}
              onChange={handleAddressChange}
              placeholder="Buscar por dirección"
            />
            <InputRightElement width="5.5rem">
              <Button type="submit" h="1.75rem" size="sm">Buscar</Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        {
          submitted && !validAddress && <FormHelperText>Dirección invalidad</FormHelperText>
        }
      </form>
      {loading ?
        <Loading /> :
        <Grid templateColumns="repeat(auto-fill,minmax(250p, 1fr)" gap={6}>
          {punks.map(({ name, image, tokenId }) =>
            <Link key={tokenId} to={`/punk/${tokenId}`}>
              <PunkCard image={image} name={name} />
            </Link>
          )}
        </Grid>
      }
    </>
  );
};

export default Punks;