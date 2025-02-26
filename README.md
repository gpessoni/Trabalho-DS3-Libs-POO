# Trabalho - Projeto de Biblioteca com técnicas de POO

Este é um sistema de gerenciamento de livros e empréstimos desenvolvido com **Node.js** e **TypeScript**. O sistema permite a criação, leitura, atualização e exclusão de livros, autores e empréstimos, utilizando **JSON** como banco de dados.

O projeto foi construído utilizando conceitos de **Programação Orientada a Objetos (POO)** para garantir que o código seja modular, reutilizável e fácil de manter.

Tecnologias Utilizadas
----------------------

*   **Node.js**: Plataforma de backend para execução do código JavaScript.
    
*   **TypeScript**: Superconjunto do JavaScript que adiciona tipagem estática.
    
*   **Nodemon**: Ferramenta de desenvolvimento para recarregamento automático do servidor durante mudanças no código.
    
*   **JSON**: Banco de dados simples em formato JSON para armazenar dados de livros, autores e empréstimos.
    

Estrutura do Projeto
--------------------

Estrutura do Projeto

``` js
src/
├── models/           # Modelos de dados (Livro, Autor, Empréstimo, Usuário)
├── repositories/     # Repositórios que lidam com leitura e gravação dos dados (CRUD)
├── routes/           # Rotas para acessar os dados da API
├── controllers/      # Controladores que gerenciam a lógica das requisições
├── server.ts         # Arquivo principal para iniciar o servidor
└── data/             # Arquivo JSON com dados persistidos
```


Instalação
----------

1.  git clone
    
2.  npm install
    
3.  npm run dev


O servidor estará disponível em http://localhost:3000.

Scripts
-------

*   **npm start**: Inicia o servidor utilizando nodemon, que automaticamente recarrega o servidor em caso de mudanças no código.
    
*   **npm test**: Este script está configurado, mas não contém testes no momento.
    

Rotas
-----

Abaixo estão as rotas disponíveis para interagir com a API:

### **Autores**

*   **GET /authors**: Retorna a lista de todos os autores.
    
*   **GET /authors/:id**: Retorna um autor específico pelo ID.
    
  ```js
{ "name": "J.R.R. Tolkien", "bio": "Escritor britânico", "nationality": "British", "birthDate": "1892-01-03"}
```
    
*   **PUT /authors/:id**: Atualiza as informações de um autor específico.
    
*   **DELETE /authors/:id**: Exclui um autor específico.
    

### **Livros**

*   **GET /books**: Retorna a lista de todos os livros.
    
*   **GET /books/:id**: Retorna um livro específico pelo ID.
    
 ```js
{ "title": "O Senhor dos Anéis", "authorId": 1, "isbn": "978-0-261-10221-7", "publishDate": "1954-07-29", "availableCopies": 5}
```
    
*   **PUT /books/:id**: Atualiza as informações de um livro específico.
    
*   **DELETE /books/:id**: Exclui um livro específico.



### **Empréstimos**

*   **GET /loan**: Retorna a lista de todos os empréstimos.
    
*   **GET /loan/:id**: Retorna um empréstimo específico pelo ID.

*   **GET /loans/available-books**: Retorna os livros disponíveis para empréstimo

*   **GET /loans/borrowed-books**: Retorna os livros que estão emprestados
    
*   jsonCopiarEditar{ "bookId": 1, "userId": 2}
    
*   **POST /loans/**: Cria um empréstimo de livro
    
*   **POST /loans/return/:id**: Realiza a devolução de um livro

    

Como Funciona
-------------

*   **Modelo de Dados**: Todos os dados (livros, autores e empréstimos) são armazenados em arquivos JSON na pasta src/data.
    
*   **POO (Programação Orientada a Objetos)**: O sistema utiliza classes e instâncias para representar os modelos de dados. Cada entidade (Livro, Autor, Empréstimo, etc.) é representada por uma classe, e o acesso aos dados é feito por meio de repositórios que implementam as operações CRUD.
    
*   **Relacionamento entre Autor e Livro**: Ao criar um livro, é necessário fornecer o authorId, que deve corresponder ao ID de um autor já existente.
    
*   **Empréstimos**: O sistema permite que os livros sejam emprestados para os usuários. Quando um empréstimo é feito, o número de cópias disponíveis do livro é decrementado, e quando o livro é devolvido, a cópia é restaurada.
    

Documentação
-------------

Você pode estar acessando a documentação através desse link:

[Documentação da API](https://documenter.getpostman.com/view/41703113/2sAYdeMC7T)

Contribuição
------------

Se você quiser contribuir para o projeto, siga os seguintes passos:

1.  Faça um fork do repositório.
    
2.  Crie uma branch para suas mudanças (git checkout -b feature/nova-funcionalidade).
    
3.  Faça as alterações e commit com uma mensagem clara (git commit -am 'Adiciona nova funcionalidade').
    
4.  Envie sua branch para o repositório (git push origin feature/nova-funcionalidade).
    
5.  Abra um Pull Request explicando suas alterações.
    

Licença
-------

Este projeto está licenciado sob a MIT License.
