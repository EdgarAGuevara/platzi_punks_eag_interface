import {
  Badge, Button, Flex,
  Heading, Image, Stack, Text, useToast
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usePlatziPunks from "../../hooks/usePlatziPunks";

const Home = () => {
  const [isMinting, setIsMinting] = useState(false);
  const { active, account } = useWeb3React();
  const [imageSrc, setImageSrc] = useState("");

  const toast = useToast();

  const platziPunks = usePlatziPunks();

  const getPlatziPunksData = useCallback(async () => {
    if (platziPunks) {
      //call is only to methods that not doing a transaction
      const totalSypply = await platziPunks.methods.totalSupply().call();
      const dnaPreview = await platziPunks.methods
        .deterministicPseudoRandomDNA(totalSypply, account)
        .call();
      const image = await platziPunks.methods
        .imageByDNA(dnaPreview).call();
      setImageSrc(image);
    }
  }, [platziPunks, account]);

  const mint = () => {
    setIsMinting(true);

    platziPunks.methods.mint(/*if your mint need a specific account here is where you need put down*/)
      .send({
        from: account,
        // value: 1e18 // If you wanna put cost when they use mint function
      })
      .on("transactionHash", (txHash) => {
        toast({
          title: 'Transacción enviada',
          description: txHash,
          status: 'info'
        });
      })
      .on("receipt", () => {
        setIsMinting(false);
        toast({
          title: 'Transacción confirmada',
          description: 'Nunca pares de aprender',
          status: 'success'
        });
      })
      .on("error", (error) => {
        setIsMinting(false);
        toast({
          title: 'Transacción fallida',
          description: error.message,
          status: 'error'
        });
      });

  };

  useEffect(() => {
    getPlatziPunksData();
  }, [getPlatziPunksData]);

  return (
    <Stack
      align={"center"}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
        >
          <Text
            as={"span"}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "green.400",
              zIndex: -1,
            }}
          >
            Un Platzi Punk
          </Text>
          <br />
          <Text as={"span"} color={"green.400"}>
            nunca para de aprender
          </Text>
        </Heading>
        <Text color={"gray.500"}>
          Platzi Punks es una colección de Avatares randomizados cuya metadata
          es almacenada on-chain. Poseen características únicas y sólo hay 10000
          en existencia.
        </Text>
        <Text color={"green.500"}>
          Cada Platzi Punk se genera de forma secuencial basado en tu address,
          usa el previsualizador para averiguar cuál sería tu Platzi Punk si
          minteas en este momento
        </Text>
        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: "column", sm: "row" }}
        >
          <Button
            rounded={"full"}
            size={"lg"}
            fontWeight={"normal"}
            px={6}
            colorScheme={"green"}
            bg={"green.400"}
            _hover={{ bg: "green.500" }}
            disabled={!platziPunks}
            onClick={mint}
            isLoading={isMinting}
          >
            Obtén tu punk
          </Button>
          <Link to="/punks">
            <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
              Galería
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Flex
        flex={1}
        direction="column"
        justify={"center"}
        align={"center"}
        position={"relative"}
        w={"full"}
      >
        <Image src={active ? imageSrc : "https://avataaars.io/"} />
        {active ? (
          <>
            <Flex mt={2}>
              <Badge>
                Next ID:
                <Badge ml={1} colorScheme="green">
                  1
                </Badge>
              </Badge>
              <Badge ml={2}>
                Address:
                <Badge ml={1} colorScheme="green">
                  0x0000...0000
                </Badge>
              </Badge>
            </Flex>
            <Button
              onClick={getPlatziPunksData}
              mt={4}
              size="xs"
              colorScheme="green"
            >
              Actualizar
            </Button>
          </>
        ) : (
          <Badge mt={2}>Wallet desconectado</Badge>
        )}
      </Flex>
    </Stack>
  );
}

export default Home;