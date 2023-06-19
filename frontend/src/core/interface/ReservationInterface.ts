interface Caracteristica {
    icone: string;
    id: number;
    nome: string;
}

interface Categoria {
    description: string;
    id: number;
    imageUrl: string;
    qualification: string;
}

interface Cidade {
    id: number;
    nome: string;
    pais: string;
}

interface Imagem {
    id: number;
    titulo: string;
    url: string;
}

interface Produto {
    caracteristicas: Caracteristica[];
    categoria: Categoria;
    cidade: Cidade;
    descricao: string;
    id: number;
    imagens: Imagem[];
    nome: string;
}
export interface ReservationInterface {
    endDate: string;
    id: number;
    product: Produto;
    startDate: string;
    startTime: string;
    user: number;
}
