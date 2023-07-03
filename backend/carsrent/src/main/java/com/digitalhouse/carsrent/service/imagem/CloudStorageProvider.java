package com.digitalhouse.carsrent.service.imagem;



import com.digitalhouse.carsrent.model.Image;

import java.net.URL;

public interface CloudStorageProvider
{
    URL generatePresignerUploadUrl(Image image);
}
