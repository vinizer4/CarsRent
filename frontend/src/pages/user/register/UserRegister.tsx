import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { UserService } from "../../../core/service/user/UserService";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {
    Container,
    TextField,
    Button,
    Typography,
    Link,
    Box,
    FormControl,
    FormHelperText
} from '@mui/material';

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email inválido')
        .required('Email é obrigatório'),
    firstName: yup
        .string()
        .required('Nome é obrigatório'),
    lastName: yup
        .string()
        .required('Sobrenome é obrigatório'),
    password: yup
        .string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .required('Senha é obrigatória'),
    confirmpassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'As senhas devem corresponder')
        .required('Confirmação de senha é obrigatória'),
});

export default function Register() {
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
            // You can add additional logic after a successful login if necessary
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: '3rem' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '& .MuiTextField-root': {
                            m: 1,
                            width: {
                                xs: '100%', // Full width on extra small screens
                                sm: '50ch' // Limited to 50ch on larger screens
                            }
                        },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography variant="h4" component="h1" gutterBottom>
                        Criar Conta
                    </Typography>
                    <FormControl error={!!errors.email}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    label="Digite seu e-mail"
                                    error={!!errors.email}
                                    helperText={errors.email && String(errors.email.message)}
                                    variant="outlined"
                                />}
                        />
                    </FormControl>
                    <FormControl error={!!errors.firstName}>
                        <Controller
                            name="firstName"
                            control={control}
                            defaultValue=""
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    label="Nome"
                                    error={!!errors.firstName}
                                    helperText={errors.firstName && String(errors.firstName.message)}
                                    variant="outlined"
                                />}
                        />
                    </FormControl>
                    <FormControl error={!!errors.lastName}>
                        <Controller
                            name="lastName"
                            control={control}
                            defaultValue=""
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    label="Sobrenome"
                                    error={!!errors.lastName}
                                    helperText={errors.lastName && String(errors.lastName.message)}
                                    variant="outlined"
                                />}
                        />
                    </FormControl>
                    <FormControl error={!!errors.password}>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    label="Senha"
                                    type="password"
                                    error={!!errors.password}
                                    helperText={errors.password && String(errors.password.message)}
                                    variant="outlined"
                                />}
                        />
                    </FormControl>
                    <FormControl error={!!errors.confirmpassword}>
                        <Controller
                            name="confirmpassword"
                            control={control}
                            defaultValue=""
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    label="Confirmar Senha"
                                    type="password"
                                    error={!!errors.confirmpassword}
                                    helperText={errors.confirmpassword && String(errors.confirmpassword.message)}
                                    variant="outlined"
                                />}
                        />
                    </FormControl>
                    <br/>
                    <Button variant="contained" color="primary" type="submit">
                        Criar Conta
                    </Button>
                    <br/>
                    <Typography variant="body2" color="text.secondary">
                        Já tem conta? <Link component={RouterLink} to="/login" color="primary">Iniciar Sessão</Link>
                    </Typography>
                </Box>
            </form>
        </Container>
    );
}
