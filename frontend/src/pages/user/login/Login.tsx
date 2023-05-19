import React from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    VStack,
    Text,
    Link as ChakraLink,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { UserService } from "../../../core/service/user/UserService";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email inválido')
        .required('Email é obrigatório'),
    password: yup
        .string()
        .required('Senha é obrigatória'),
});

export default function Login() {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: any) => {
        console.log(data);
        try {
            const res = await UserService.Login(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box width="100%" maxW="500px" mx="auto" mt="3rem" >
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4}>
                    <Text fontSize="2xl" fontWeight="bold">Iniciar Sessão</Text>
                    <FormControl id="email" isInvalid={!!errors.email}>
                        <FormLabel>Digite seu e-mail</FormLabel>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input placeholder="Email" type="email" {...field} />
                            )}
                        />
                        {errors.email && <Text color="red.500">{errors.email?.message as string}</Text>}
                    </FormControl>
                    <FormControl id="password" isInvalid={!!errors.password}>
                        <FormLabel>Senha</FormLabel>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input placeholder="Senha" type="password" {...field} />
                            )}
                        />
                        {errors.password && <Text color="red.500">{errors.password?.message as string}</Text>}
                    </FormControl>
                    <Button width="full" colorScheme="blue" type="submit">
                        Entrar
                    </Button>
                    <Text fontSize="sm">
                        Ainda não tem conta? <ChakraLink as={RouterLink} to="/register" color="blue.500">Registre-se.</ChakraLink>
                    </Text>
                </VStack>
            </form>
        </Box>
    );
}
