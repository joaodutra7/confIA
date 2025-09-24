# CISER CorroScan

Sistema de detecção de corrosão em tempo real por IA para parafusos e porcas.

## 🚀 Funcionalidades

- **Captura Inteligente**: Análise via câmera ou upload de imagens
- **Detecção por IA**: Algoritmos especializados em corrosão metálica  
- **Dashboard Completo**: Histórico, relatórios e análises
- **PWA**: Instalável e funciona offline
- **Multi-idioma**: Suporte a pt-BR e en-US
- **Acessibilidade**: Compatível com leitores de tela (WCAG AA)

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS + shadcn/ui
- **Estado**: Zustand (global) + TanStack Query (server)
- **Validação**: Zod
- **Testes**: Vitest + Testing Library + Playwright
- **PWA**: next-pwa
- **Gráficos**: Recharts

## 🏗️ Estrutura do Projeto

```
ciser-corroscan/
├── app/                    # Next.js App Router
│   ├── auth/              # Páginas de autenticação
│   ├── app/               # Dashboard (protegido)
│   └── globals.css        # Estilos globais
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (shadcn/ui)
│   └── layout/           # Layout components
├── lib/                  # Utilitários e configurações
│   ├── api/              # APIs mock
│   ├── store/            # Stores Zustand
│   └── types/            # Definições TypeScript
├── public/               # Assets estáticos
└── test/                 # Testes
```

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+
- npm/yarn/pnpm

### Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm dev

# Executar testes
pnpm test

# Executar testes E2E
pnpm test:e2e

# Build para produção
pnpm build
```

## 🔐 Autenticação (Demo)

O sistema inclui autenticação mock com os seguintes usuários:

- **Admin**: admin@ciser.com.br / demo123
- **Inspetor**: inspetor@ciser.com.br / demo123  
- **Visualizador**: viewer@ciser.com.br / demo123

## 📱 PWA

O aplicativo é instalável como PWA:
- Suporte offline básico
- Ícones otimizados
- Tema customizado CISER

## 🎨 Design System

### Paleta de Cores CISER
- **Azul Primário**: `#0C305F`
- **Azul Escuro**: `#2A304B`
- **Vermelho Destaque**: `#851F31`
- **Neutros**: Escala Slate do Tailwind

### Componentes
- Design industrial/minimalista
- Modo claro/escuro
- Responsivo (mobile-first)
- Acessível (WCAG AA)

## 🔧 Configuração

### Arquivo `app.config.ts`
Centralize configurações do aplicativo:
```typescript
export const appConfig = {
  name: 'CISER CorroScan',
  company: 'Ciser - Parafusos e Porcas',
  corrosionThresholds: {
    approved: 30,      // <= 30%
    inspection: 60,    // 31-60% 
    rejected: 100,     // > 60%
  },
  // ...
};
```

## 📊 Análise de Corrosão

### Regras de Aprovação
- **Aprovado**: ≤ 30% de corrosão
- **Inspeção**: 31-60% de corrosão
- **Rejeitado**: > 60% de corrosão

### API Mock
- Simula análise com delay realista
- Gera resultados baseados em probabilidade
- Armazena histórico no localStorage

## 🧪 Testes

### Unitários (Vitest)
```bash
pnpm test
```

### E2E (Playwright)
```bash
pnpm test:e2e
```

### Cobertura incluída:
- Autenticação
- Captura de imagens
- Análise de corrosão
- Navegação

## 📦 Build e Deploy

```bash
# Build otimizado
pnpm build

# Preview da build
pnpm start
```

## 📚 Documentação

### Páginas Principais
- `/` - Landing page
- `/auth/sign-in` - Login
- `/app/captura` - Captura e análise
- `/app/analises` - Histórico
- `/app/lotes` - Processamento em lote
- `/app/relatorios` - Relatórios e BI
- `/app/calibracao` - Calibração
- `/app/auditoria` - Trilha de auditoria
- `/app/config` - Configurações

### Fluxo Principal
1. **Login** com credenciais demo
2. **Captura** via câmera ou upload
3. **Seleção ROI** (opcional)
4. **Análise** automática por IA
5. **Visualização** de resultados
6. **Aprovação/Rejeição** da peça

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

© 2024 CISER - Parafusos e Porcas. Todos os direitos reservados.

---

**CISER CorroScan** - Inovação em inspeção industrial com IA
Jaraguá do Sul, SC - Tecnologia e qualidade desde 1959