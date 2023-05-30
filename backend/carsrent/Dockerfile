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

# Copiar o código-fonte da aplicação para o contêiner
COPY src /app/src

# Porta exposta pela aplicação
EXPOSE 8080

# Comando para construir a aplicação
RUN ./mvnw clean install -DskipTests

# Comando para iniciar a aplicação
CMD ["java", "-jar", "target/nome-do-seu-arquivo-jar.jar"]
