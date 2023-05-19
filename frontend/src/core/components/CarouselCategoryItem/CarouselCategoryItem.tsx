import React from 'react';
import Slider from "react-slick";
import { Box, Image, Text, Center } from "@chakra-ui/react";

export interface Props {
    category: {
        imageUrl: string;
        title: string;
        id?: number;
    }
}

const CarouselCategoryItem = ({ category }: Props) => {
    const { imageUrl, title } = category;
    return (
        <Box pos="relative" overflow="hidden" borderRadius="2rem" h="240px" m="0 7.5px 15px" _hover={{cursor: "pointer"}}>
            <Image src={imageUrl} objectFit="cover" w="100%" h="100%" _hover={{ transform: "scale(1.1)", transition: "transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95)" }} alt={title}/>
            <Center w="100%" h="90px" p="0 25px" pos="absolute" bottom="0" bg="whiteAlpha.700" _hover={{ opacity: 0.9 }}>
                <Text fontWeight="bold" fontSize="22px" color="#0c0101" textAlign="center">{title}</Text>
            </Center>
        </Box>
    );
};

export default CarouselCategoryItem;
