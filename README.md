# Cadastro de carros

**RF**
Deve ser possível cadastrar um carro.

**RN**
Não deve ser possível cadastrar um carro com placa já existente.
Não deve ser possível alterar a placa de um carro ja cadastrado.
O carro deve ser cadastrado, por padrão, com disponibilidade.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de especificação do carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.


**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação ja existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar uma imagem para o carro.


**RNF**
Utilizar o multer para upload dos arquivos.

**RN**
O usuário poderá cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carros

**RF**
Deve ser possível cadastrar um aluguel de carro

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro.
O usrário deve estar logado.
Ao realizar um aluguel o status do carro deverá ser alterado para indisponível.

# Devolução de um carro de

**RF**
Deve ser possível realizar a devolução de um carro.

**RN**
Se o carro for devolvido com menos de 24h, deve ser cobrado diária completa.
Ao realizar a devolução,o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução,o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução for superior ao previsto deverá ser cobrado multa referente aos dias de atraso.
Caso haja multa, deverá ser somada ao total do aluguel.

# Listagem de aluguéis do usuário

**RF**
Deve ser possível listar os aluguéis de um usuário.

**RN**
O usuário deve estar logado na aplicação.