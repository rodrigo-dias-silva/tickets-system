# Tickets System

> Bem-vindos ao repositório do Sistema de Chamados/Tickets System.

## Sobre o projeto

Projeto React criado usando a ferramenta Vite JS para construção do front-end e Firebase no back-end.
O projeto consiste em um sistema para registro de chamados de serviços, com opçoes de cadastro de clientes, ediçao de chamados e mais.

## Tecnologias

- React
  > Vite como ferramenta para criação do front-end.
- Typescript
- Tailwind
  > Framework de estilização/CSS.
- Firebase

### Bibliotecas utilizadas:

- Date-fns
  > Dependencia usada para formatação de datas.
- React-router-dom
  > Biblioteca para o controle de rotas da aplicação.
- Toastify
  > Biblioteca para animações de notificações.
- Phosphor-react
  > Biblioteca de icones.
- Firebase
  > Biblioteca para conexões com o firebase.



## O projeto conta com as páginas:

* SignIn/SignUp (Entrar/Registrar)
* Dashboard (Chamados)
* NewTicket (Novo chamado)
* Customers (Clientes)
* Profile (Configurações)

</br>

### SignIn / SignUp

Página para realização do login do usuário ou cadastro (única rota acessivel sem autenticação).

<div>
  <h4>SignIn</h4>
  <img src="https://user-images.githubusercontent.com/98930710/230095877-bead1dc9-2e24-4d6b-a9d6-41ee38238067.JPG" width="700px" alt="tela login"/>
</div>

<div>
  <h4>SignUp</h4>
  <img src="https://user-images.githubusercontent.com/98930710/230097387-ff7b057a-5c26-4035-93b3-b89bd5ce4717.JPG" width="700px" alt="tela login"/>
</div>

</br>
</br>

### Dashboard

Página "home" do projeto, onde mostra parte ou todos dos chamados realizados, com opções para criar novos chamados, exibir informações de determinado chamado ou edita-lo.


<div>
  <h4>Dashboard</h4>
  <img src="https://user-images.githubusercontent.com/98930710/230100532-a6d1a417-4b2a-44f8-bffe-0a25cc5c76ee.JPG" width="700px" alt="tela dashboard que exibe todos os chamados"/>
</div>

<div>
  <h4>Detalhes do chamado</h4>
  <img src="https://user-images.githubusercontent.com/98930710/230103742-3c8eb610-7f48-47fc-8752-c7cc5336dc95.JPG" width="700px" alt="modal que exibe os detalhes do chamado"/>
</div>


<div>
  <h4>Editar chamados</h4>
  <img src="https://user-images.githubusercontent.com/98930710/230104627-7fb66357-2abb-4920-89dd-002a796563eb.JPG" width="700px" alt="tela que permite editar os detalhes de um chamado existente"/>
</div>

</br>
</br>

### NewTicket

Página para criar um novo chamado.


<div>
  <h4>Novo chamado</h4>
  <img src="https://user-images.githubusercontent.com/98930710/230101953-4fc71807-035c-4802-bb4b-28b9bad550ba.JPG" width="700px" alt="tela novo chamado"/>
</div>

</br>
</br>

### Customers

Página para cadastro de novos clientes.

<div>
  <h4>Clientes</h4>
  <img src="https://user-images.githubusercontent.com/98930710/230107553-8410bbc0-3547-4834-beca-9114ffb5fe8c.JPG" width="700px" alt="tela para cadastro de novos clientes"/>
</div>

</br>
</br>

### Profile

Página para configuração do perfil do usuário, dando opção de alterar nome e foto, e opção de logout/sair.  

<div>
  <h4>Configurações de perfil</h4>
  <img src="https://user-images.githubusercontent.com/98930710/230109536-d24eb03d-3684-4c65-ab7d-832a7e42d246.JPG" width="700px" alt="página de configurações do usuário"/>
</div>

## Deploy

Projeto encontra-se funcional e em produção.
> Utilizei a plataforma Vercel para deploy.

>> <a href='https://tickets-system.vercel.app/'>Link do Sistema de Chamados</a>
