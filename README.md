# Marvel - Histórias

Esta aplicação exibe 5 histórias em que aparecem meus 3 heróis favoritos (Iron Man, Thor e Doutor Estranho).
Ela usa a API pública da Marvel para buscar os heróis e as histórias em que aparecem.
Foi construida utilizando um servidor Node com TypeScript para o backend, e uma página HTML simples com axio para o frontend.

## Como executar a aplicação

1. Faça o download do repositório localmente
   ```shell
   git clone git@github.com:lucasvschenatto/marvel-stories.git
   ```
2. Edite o arquivo `APIKeys.json`, modificando os campos `publicKey` e `privateKey` para as suas chaves pública e privada, respectivamente. Isso permitirá que a aplicação realize as requisições para a API da Marvel.
Opcionalmente altere a porta que deseja usar através do campo `port`.
3. Instale as dependências da aplicação:
   ```shell
   npm install
   ```
4. Execute a aplicação através do comando:
    ```shell
    npm run start
    ```
6. Abra o navegador com o seguinte endereço: `http://localhost:8000` ou a porta de sua escolha caso a tenha mudado.

> **Observações:**
> É pré-requisito ter instalado o npm e ter uma conta de acesso à API da Marvel (ver `https://developer.marvel.com/docs`).