# ADR-005: Escolha do Gateway de Pagamento Principal

## Status

[x] Aceita
[ ] Proposta
[ ] Rejeitada
[ ] Obsoleta

## Data

2026-02-12

## Contexto

Precisamos escolher e integrar um gateway de pagamentos principal para o processamento de transações de cartão de crédito e PIX no nosso módulo `payment-service`.

### Problema

Atualmente não possuímos nenhum gateway integrado. Precisamos de uma solução que atenda requisitos de segurança (PCI compliance), suporte múltiplos meios de pagamento nacionais e internacionais, e ofereça boa estabilidade e APIs fáceis de integrar.

### Restrições

- Deve ser PCI-DSS Level 1.
- Suporte a PIX com confirmação em tempo real via Webhook.
- Taxas competitivas para o mercado brasileiro.
- SDKs oficiais disponíveis para Node.js/TypeScript.

## Decisão

Decidimos adotar a **Stripe** como nosso gateway de pagamento principal, mantendo a **Adyen** como alternativa de fallback configurável.

### Opções Consideradas

#### Opção 1: Stripe (Escolhida)
- **Prós:**
  - Melhor documentação e experiência de desenvolvimento do mercado.
  - SDK de TypeScript de excelente qualidade.
  - PCI compliance gerenciado via Stripe Elements.
  - Excelente suporte internacional.
- **Contras:**
  - Taxas ligeiramente superiores a gateways nacionais em algumas faixas de volume.

#### Opção 2: Adyen
- **Prós:**
  - Taxas muito agressivas para grandes volumes.
  - Excelente suporte multi-adquirente.
- **Contras:**
  - Processo de onboarding complexo e burocrático.
  - Documentação mais difícil de navegar que a Stripe.

#### Opção 3: Pagar.me / PagSeguro
- **Prós:**
  - Foco exclusivo no mercado brasileiro, excelente taxas locais.
- **Contras:**
  - Pior suporte internacional.
  - Instabilidades recorrentes reportadas por outras equipes.

### Escolha

Decidimos pela **Stripe** por conta do tempo de colocação no mercado (time-to-market), facilidade de desenvolvimento com TypeScript, e excelente sandbox para testes locais e automatizados. A facilidade de conformidade com PCI usando Stripe Elements reduz o risco de vazamento de dados de cartão em nossos servidores.

## Consequências

### Positivas
- Integração rápida (estimativa de 3 dias versus 10 dias com Adyen).
- Excelente ambiente de teste para testes de integração automatizados.
- Alta estabilidade da infraestrutura da Stripe (99.99% uptime).

### Negativas
- Margem de lucro nas transações ligeiramente menor comparado a contratos diretos com a Adyen.

### Neutras
- Necessidade de gerenciar a rotação de API Keys da Stripe anualmente.

## Ações

- [x] Criar conta de testes na Stripe: @payment-team, 2026-02-13
- [ ] Implementar SDK e fluxos de checkout: @dev-lead, 2026-02-20
- [ ] Configurar webhooks para PIX: @dev-ops, 2026-02-22

## Referências

- [Stripe Node.js Documentation](https://stripe.com/docs/api?lang=node)
- [PCI Compliance Checklist](file:///c:/engineering-platform-main/standards/security.md)
