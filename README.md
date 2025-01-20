# Ifuture Provider
Aplicação Ifuture para os provedores de serviços de entrega de alimentos. Nessa versão o aplicativo simula a plataforma dos fornecedores do serviço.

## Login

Como se trata de uma demonstração resolvi deixar, como valor padrão dos inputs, as credenciais dos usuários(fornecedores). De maneira que, cada vez que a página é carregada, uma credencial válida é aleatoriamente posta.

<img src="./readmeImg/tela_login.png">

## Lista de pedidos

Na tela inicial temos a lista dos pedidos para ser entregue. Cada pedido vem especificando o produto com seu valor, quantidade, momento da solicitação e endereço para entrega. Clicando no ícone do canto superior esquerdo o usuário é direcionado para lista de pedidos finalizados, o hitórico de pedidos.

<div style="display: flex; justify-content: space-between; align-items: center; ">
  <div>
    <img src="./readmeImg/pedidos.png" width="500">
  </div>
  <br>
  <div>
    <img src="./readmeImg/pedidos_historico.png" width="500"><br>
  </div>
</div>

## Detalhes do pedido

Ao clicar no card de algum pedido o usuário tem acesso aos detelhes do mesmo, como mostra a figura abaixo:

<img src="./readmeImg/detatlhe_pedido.png">

Clicando no link "Cliente", o usuário(fornecedor), verá novamente a tela de login, onde serão requisitadas suas credências de acesso para poder ver o cadastro do usuário. Nesse caso, tratando-se de um projeto demonstrativo, as credenciais do fornecedor em questão já são os valores padrões dos campos de login.


## Dados do usuário

Aqui está o perfil do usuário cadastrado. Com seu email, endereço e histórico de pedidos realizados.

<img src="./readmeImg/perfil_usuario.png">

## Dados do fornecedor

O perfil do fornecedor. Com sua categoria de serviço no título, uma pequena descrição e lista de produtos do cardápio principal, onde é possível remover e/ou adicionar novos produtos.

<img src="./readmeImg/detalhe_fornecedor.png" height="400" width='1200'><br>
<div style="display: flex; justify-content: space-between; align-items: center; gap: 10px">
  <div>
    <img src="./readmeImg/cardapio.png" width="500">
  </div>
  <br>
  <div>
    <img src="./readmeImg/add_produtos.png" width="500"><br>
  </div>
</div>

<br><br>
> https://gazuadev8417.github.io/ifuture_provider
