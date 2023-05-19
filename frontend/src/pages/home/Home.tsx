import React, {useEffect, useState}   from "react";
import {useForm}                      from "react-hook-form";
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Flex,
    Grid,
    GridItem,
    Heading,
    Image,
    Stack,
    Text,
    useToast
}                                     from "@chakra-ui/react";
import {FaMapMarkerAlt}               from "react-icons/fa";
import {FcSearch}                     from 'react-icons/fc';
import Typography
                                      from "../../core/components/CustomText/Typhography";
import {DateBox, ScrollView, TextBox} from "devextreme-react";
import {SimpleItem}                   from "devextreme-react/form";
import CategoryCarousel
                                      from "../../core/components/CarouselCategoryItem/Carousel";


export default function Home() {
    const {register, handleSubmit, setValue} = useForm();
    const toast = useToast();

    const [categories] = useState([
        {
            imageUrl: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/04/230418093558-01-new-lincoln-nautilus-suv.webp',
            title: 'SUV',
            id: 1
        },
        {
            imageUrl: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/04/230418093558-01-new-lincoln-nautilus-suv.webp',
            title: 'SUV',
            id: 1
        },
        {
            imageUrl: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/04/230418093558-01-new-lincoln-nautilus-suv.webp',
            title: 'SUV',
            id: 1
        },
        {
            imageUrl: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/04/230418093558-01-new-lincoln-nautilus-suv.webp',
            title: 'SUV',
            id: 1
        },
        {
            imageUrl: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/04/230418093558-01-new-lincoln-nautilus-suv.webp',
            title: 'SUV',
            id: 1
        }
    ]);

    const onSubmit = (data: any) => {
        toast({
            title: "Dados submetidos.",
            description: `Busca: ${data.search}, Data: ${data.date}`,
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    };

    useEffect(() => {
        register('date'); // manually register date
    }, [register]);

    return (
        <Box mt="4rem">
            <ScrollView>
                <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Heading as="h2" size="xl" mb={6}>O carro ideal em
                        todo lugar</Heading>
                    <Grid templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(4, 1fr)"
                    }} gap={6}>
                        <GridItem>
                            <Typography>Buscar Modelo</Typography>
                            <TextBox
                                placeholder="Qual carro você quer dirigir hoje?"/>
                        </GridItem>
                        <GridItem>
                            <Typography>Onde você está?</Typography>
                            <TextBox placeholder="Onde você está?">
                                <SimpleItem
                                    editorOptions={{readOnly: true}}>
                                    <FaMapMarkerAlt/>
                                </SimpleItem>
                            </TextBox>
                        </GridItem>
                        <GridItem>
                            <Typography>Data e Hora</Typography>
                            <DateBox id="date" type="datetime"
                                     defaultValue={new Date()}
                                     onValueChanged={(e) => setValue(
                                         'date', e.value)}/>
                        </GridItem>

                        <GridItem display="flex" alignItems="end">
                            <Button type="submit">
                                <FcSearch size={'1.5rem'}
                                          style={{paddingRight: '5px'}}/>Buscar
                            </Button>
                        </GridItem>
                    </Grid>
                </Box>
                <br/>
                <CategoryCarousel categories={categories}/>


                <Flex wrap="wrap" p={4}>
                    {/* Substitua isso com seu data fetch ou loop */}
                    {[1, 2, 3].map((card) => (
                        <Card maxW="sm" m={2} key={card}>
                            <CardBody>
                                <Image src={categories[0].imageUrl}
                                       alt="" borderRadius="lg"/>
                                <Stack mt="4" spacing="1">
                                    <Heading
                                        size="md">{categories[0].title}</Heading>
                                    <Text>
                                        O que é um SUV? A sigla SUV
                                        significa Sport Utility
                                        Vehicle --
                                        ou seja, veículo utilitário
                                        esportivo. As SUVs costumam
                                        ter porte
                                        avantajado, além de interior
                                        espaçoso e possibilidade de
                                        trafegar
                                        dentro e fora da cidade.
                                    </Text>
                                    <Text color="blue.600"
                                          fontSize="2xl">
                                        Diaria: $450
                                    </Text>
                                </Stack>
                            </CardBody>
                            <Divider/>
                            <CardFooter>
                                <ButtonGroup spacing="2">
                                    <Button variant="solid"
                                            colorScheme="blue">Ver no
                                        mapa</Button>
                                    <Button variant="ghost"
                                            colorScheme="blue">Alugar</Button>
                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                    ))}
                </Flex>
            </ScrollView>
        </Box>
    );
}

