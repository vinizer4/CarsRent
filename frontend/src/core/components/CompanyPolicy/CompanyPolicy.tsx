import CssBaseline from '@mui/material/CssBaseline';
import React from "react";
import styles from './CompanyPolicy.module.css';
import { colorRed } from "../../utils/const/consts"
import { useState } from 'react';
import { Modal, Typography, Button } from '@mui/material';

export default function CompanyPolicy(){
  
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleOpen3 = () => {
    setOpen3(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };
  
  const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 700,
    width: '90%',
    height: '50%',
    maxHeight: '80vh', // Define a altura máxima para 80% da altura da janela
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
    padding: 16,
    overflow: 'auto', // Habilita a rolagem vertical quando necessário
  };
  
    return(
        <>
        <div>
          <Typography
            text-align="center"
            justify-content="center"
            margin="2rem"
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            O que você precisa saber:
          </Typography>
          <div
            style={{
              backgroundColor: colorRed,
              width: "100%",
              height: "0.15rem",
              marginTop: "-2rem",
              marginBottom: "1rem",
            }}
          ></div>
        </div>
        <footer style={{padding: '20px'}}>
    <div
    className={styles.container}
      style={{
        maxWidth: "1400px",
        margin: "0 auto", 
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: 1, padding: "0 15px", boxSizing: "border-box" }}>
        <h3 style={{ color: colorRed, fontSize: "18px" }}>Regras da Empresa</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>Reserva mediante pagamento</li>
          <li>Não são permitidas mudanças no veículo</li>
          <li>Não é permitido fumar no interior do veículo</li>
         {/*  <Link variant="contained" onClick={handleOpen} style={{textDecoration: "none", cursor:"pointer"}} to={'/RegrasDaEmpresa'}><span style={{ color: colorRed, fontSize: "13px" }} >Saiba mais.</span></Link> */}
         <span style={{cursor: "pointer", color: colorRed, fontSize: "13px"}} onClick={handleOpen}> Saiba mais.</span>
        </ul>
        <Modal open={open} onClose={handleClose}>
        <div style={modalStyle}>
          <Typography>
            <h4 style={{color: colorRed, marginBottom: '1rem', marginTop: '1rem'}}>Regras da Empresa</h4>
            <li>Reservas são feitas somente mediante pagamento de no mínimo 50% do valor total do aluguel do veículo. Caso contrário, reserva será cancelada e veículo ficará disponível para locação. Em caso de cancelamento, outras regras se aplicam.</li>
            <br />
            <li>Nenhuma alteração no interior ou exterior do veículo é permitida durante a locação, como por exemplo mudança nos faróis, pintura ou placa, implicando multa de 20% do valor da locação acrescida de valor referente ao conserto do automóvel.</li>
            <br />
            <li>Proibido fumar nos veículos alugados para garantir um ambiente saudável e evitar danos ao interior do carro.</li>
          </Typography>
          <Button style={{backgroundColor: colorRed, color: 'white', float: 'right', marginTop: '1rem'}} onClick={handleClose}>
            Fechar
          </Button>
        </div>
      </Modal>
        
      </div>
      <div style={{ flex: 1, padding: "0 15px", boxSizing: "border-box" }}>
        <h3 style={{ color: colorRed, fontSize: "18px" }}>Segurança</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>Veículos equipados com GPS</li>
          <li>Todos os veículos possuem seguro</li>
          <li></li>
          {/* <Link variant="contained" onClick={handleOpen} style={{textDecoration: "none", cursor:"pointer"}} to={'/Seguranca'}><span style={{ color: colorRed, fontSize: "13px" }} >Saiba mais.</span></Link> */}
          <span style={{cursor: "pointer", color: colorRed, fontSize: "13px"}} onClick={handleOpen2}> Saiba mais.</span>
        </ul>
        <Modal  open={open2} onClose={handleClose2}>
        <div style={modalStyle}>
          <Typography >
          <h4 style={{color: colorRed, marginBottom: '1rem', marginTop: '1rem'}}>Segurança</h4>
          <li>São verificadas as informações de identificação dos clientes ao retirar e devolver os veículos, associada a conferência de permissão para dirigir (CNH).</li>
          <br />
          <li>Verificações regulares de segurança e manutenção dos veículos em dia para garantir que estejam em boas condições e seguros para uso, incluindo datas, detalhes e responsáveis.</li>
          <br />
          <li>Todos os veículos alugados estão devidamente segurados.</li>
          </Typography>
          <Button style={{backgroundColor: colorRed, color: 'white', float: 'right', marginTop: '1rem'}} onClick={handleClose2}>
            Fechar
          </Button>
        </div>
      </Modal>
      </div>
      <div style={{ flex: 1, padding: "0 15px", boxSizing: "border-box" }}>
        <h3 style={{ color: colorRed, fontSize: "18px" }}>Políticas de Cancelamento</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>Cancelamento grátis em menos de 48h da reserva</li>
          <li>Possibilidade de alteração de data de reserva</li>
          <li>Entregas atrasadas implicam em multas. </li>
          {/* <Link variant="contained" onClick={handleOpen} style={{textDecoration: "none", cursor:"pointer"}} to={'/PoliticaCancelamento'}><span style={{ color: colorRed, fontSize: "13px" }} >Saiba mais.</span></Link> */}
          <span style={{cursor: "pointer", color: colorRed, fontSize: "13px"}} onClick={handleOpen3}> Saiba mais.</span>
        </ul>
        <Modal  open={open3} onClose={handleClose3}>
        <div style={modalStyle}>
          <Typography>
          <h4 style={{color: colorRed, marginBottom: '1rem', marginTop: '1rem'}}>Políticas de Cancelamento</h4>
            <li>Em até 48h de aviso prévio antes da retirada do veículo, permitido cancelamento sem cobrança de nenhum valor ou taxa e reembolso integral do pagamento de reserva.</li>
            <br />
            <li>Cancelamentos realizados de última hora (menos que 24h de antecedência em relação ao momento da retirada do veiculo) implicam em multa referente a 20% do valor total da locação. Valor pago no momento da reserva será restituído.</li>
            <br />
            <li>Possibilidade de alteração de data e horário de reserva em até 24h antes da retirada do veículo sem cobrança adicional, caso contrário, será necessária reavaliação para consulta de disponibilidade e cobrança de taxa de R$100 para reagendamento.</li>
            <br />
            <li>Caso haja cancelamento por parte da empresa por motivos técnicos ou eventos imprevistos, o cliente poderá optar por escolher outro veículo alternativo ou receber reembolso integral.</li>
          </Typography>
          <Button style={{backgroundColor: colorRed, color: 'white', float: 'right', marginTop: '1rem'}} onClick={handleClose3}>
            Fechar
          </Button>
        </div>
      </Modal>
      </div>
    </div>
  </footer>
        </>
    )
}