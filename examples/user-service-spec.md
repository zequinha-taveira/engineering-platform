# Especificação: Cadastro de Usuário

> Especificação funcional para o fluxo de cadastro e gerenciamento de perfis de usuário.

---

## Visão Geral

Permite que novos usuários criem contas na plataforma fornecendo email e senha, validem seus emails e preencham seus dados básicos de perfil.

## Objetivos

- Oferecer um fluxo de cadastro rápido e seguro.
- Reduzir o número de registros de spam através de verificação de email.
- Coletar dados básicos para personalização da experiência.

## Requisitos

### Funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| FR-01 | O sistema deve permitir cadastro usando Email e Senha. | Alta |
| FR-02 | O sistema deve enviar um email com token de confirmação contendo link que expira em 24h. | Alta |
| FR-03 | O usuário não deve conseguir realizar login sem antes confirmar o email. | Alta |
| FR-04 | O usuário deve poder preencher Nome Completo, Foto de Perfil e Cargo após o cadastro. | Média |

### Não-Funcionais

| ID | Requisito | Critério |
|----|-----------|----------|
| NFR-01 | Latência de envio do email | < 5 segundos para a fila de envio |
| NFR-02 | Segurança das Senhas | Hasheadas com bcrypt (cost 12) |
| NFR-03 | Responsividade da UI | A interface de cadastro deve funcionar em dispositivos móveis (Mobile-first) |

## Usuários

### Personas
- **Desenvolvedor Novo**: Profissional que está se cadastrando para utilizar a Engineering Platform pela primeira vez. Busca facilidade e integração rápida.

### User Stories

```
COMO um Desenvolvedor Novo
QUERO me cadastrar usando meu email profissional
PARA ter acesso aos recursos da plataforma e gerenciar meus projetos.
```

## Fluxos

### Fluxo Principal
1. O usuário clica em "Criar Conta".
2. O usuário preenche Email e Senha (com validação de força).
3. O sistema cria a conta com status `pending_verification`.
4. O sistema dispara o evento `user.created` e envia o email de verificação.
5. O usuário clica no link recebido no email.
6. O sistema valida o token e altera o status da conta para `active`.
7. O usuário é redirecionado para a tela de preenchimento de perfil.

### Fluxos Alternativos
- **Cenário A: Email já cadastrado**: O sistema exibe mensagem genérica (para segurança) informando que, se a conta existir, um email de recuperação foi enviado.

### Fluxos de Exceção
- **Token expirado**: O sistema informa que o link expirou e oferece um botão para "Reenviar link de verificação".

## Dados

### Modelo de Dados
```typescript
interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  role?: string;
  status: 'pending_verification' | 'active' | 'suspended';
  createdAt: Date;
}
```

### Regras de Negócio
- A senha deve conter pelo menos 8 caracteres, 1 número, 1 letra maiúscula e 1 caractere especial.
- O email informado deve pertencer a um domínio corporativo válido (não descartável).

## API

### Endpoints
| Método | Path | Descrição |
|--------|------|-----------|
| POST | /v1/users/register | Registrar novo usuário |
| POST | /v1/users/verify | Verificar email com o token |
| PUT | /v1/users/profile | Atualizar dados do perfil |

## UI/UX

### Wireframes
- [Link para wireframe no Figma](https://figma.com/file/user-registration-flow)

### Design System
- Utilizar botões e inputs padrão do Design System (`Button`, `InputText`, `Card`).

## Segurança

- Validação rígida no back-end (Zod) contra injeção e XSS.
- Rate limiting no endpoint de cadastro (máximo 5 cadastros por IP por hora).

## Testing

### Cenários de Teste
| ID | Cenário | Resultado Esperado |
|----|---------|-------------------|
| TC-01 | Cadastro com senha fraca | Sistema retorna erro 400 com detalhes das regras de senha |
| TC-02 | Verificação com token válido | Status da conta alterado para `active` e token invalidado |

## Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Envio de emails cair na caixa de spam | Média | Alto | Usar servidores de envio confiáveis (SendGrid/SES) com DKIM/SPF configurados. |

## Cronograma

| Fase | Duração | Entregas |
|------|---------|----------|
| Design & Spec | 1 dia | Protótipo e Spec aprovada |
| Back-end & API | 2 dias | Endpoints e envio de emails |
| Front-end & UI | 2 dias | Telas de cadastro, confirmação e perfil |
| Testes | 1 dia | Cobertura unitária e E2E |

## Aprovação

| Aprovador | Data | Status |
|-----------|------|--------|
| Tech Lead | 2026-03-01 | Aprovado |
| Product Owner | 2026-03-01 | Aprovado |
