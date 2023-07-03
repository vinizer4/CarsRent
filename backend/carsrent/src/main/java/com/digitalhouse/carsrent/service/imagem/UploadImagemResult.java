package com.digitalhouse.carsrent.service.imagem;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UploadImagemResult
{
    private Long imagemId;
    private String uploadSignedUrl;
}
