# Recuperação de senha

**Requisitos Funcionais**

- O usuário deve poder recuperar sua senha informando seu e-mail
- O usuário deve receber um e-mail com instruções de recuperação de senha
- O usuário deve poder resetar sua senha

**Requisitos Não Funcionais**

- Utilizar Mailtrap para testar envios de email em ambiente de dev
- Utilizar AmazonSES para envios de email em ambiente de produção
- O envio de e-mails deve acontecer em segundo plano (background job)

**Regras de Negócio**

- O link enviado por email para resetar a senha deve expirar em 2h
- O usuário precisa confirmar a senha nova ao resetar sua senha

# Atualização de perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha

**RN**

- O usuário não pode alterar seu email para um email já atualiado
- Para atualizar sua senha, o usuário deve informar a senha antiga
- Para atualizar sua senha, o usuário precisa confirmar a nova senha

# Painel do prestador

**RF**

- O prestador deve poder listar seus agendamentos de um dia específico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lidas

**RNF**

- Os agendamentos do prestador do dia devem ser armazenados em cache
- As notificações do prestador devem ser armazenadas no MongoDB
- As notificações do prestador devem ser enviadas em tempo-real utlizando Socket.io

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviços cadastrados
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponĩvel de um prestador
- O usuário deve poder listar horários disponĩveis em um dia específico de um prestador
- O usuário deve poder realizer um novo agendamento com um prestador

**RNF**

- A listagem de prestadores deve ser armazenada em cache

**RN**

- Cada agendamento deve durar 1h exatamente
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro ás 8h, último às 17:00)
- O usuário não pode agendar em um horãrio já ocupado
- O usuário não pode agendar em um horãrio que já passou
- O usuário não pode agendar serviços consigo mesmo
