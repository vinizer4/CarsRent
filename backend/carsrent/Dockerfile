# Imagem base
FROM openjdk:17

# Informações do autor
LABEL maintainer="vinicius.ts.online@gmail.com"

# Diretório de trabalho
WORKDIR /app

# Copiar o Maven Wrapper para o contêiner
COPY mvnw /app/mvnw
COPY .mvn /app/.mvn

# Copiar o arquivo pom.xml para o contêiner
COPY pom.xml /app

# Copiar o arquivo de configuração da aplicação para o contêiner
COPY src/main/resources/application.properties /app/src/main/resources/application.properties

# Porta exposta pela aplicação
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["./mvnw", "spring-boot:run", "-Dspring.config.location=classpath:/application.properties"]
