# Guia de Identidade Visual e Design System — VORTEX

> **Propósito do Documento:** Este arquivo consolida todas as decisões visuais, estruturais e de experiência do usuário (UI/UX) do aplicativo **Vortex**. Ele serve como fonte única da verdade para garantir consistência estética, funcional e de marca em qualquer nova tela, componente, botão ou fluxo futuro.

---

## 1. Visão Geral e Personalidade da Marca

O **Vortex** é uma plataforma inovadora de saúde que conecta pacientes que necessitam de consultas médicas a médicos e clínicas particulares de forma rápida, sem mensalidades fixas e com total transparência.

### Pilares da Identidade Visual:
- **Confiança e Credibilidade Clínica:** Representada pelo Azul Marinho Profundo (*Vortex Navy*).
- **Inovação, Agilidade e Energia Humana:** Representada pelo Laranja Elétrico / Coral (*Vortex Orange*).
- **Clareza e Fluidez:** Telas limpas, fontes legíveis, espaçamento generoso e ausência de ruídos visuais.
- **Mobile-First & PWA Nativo:** Ergonomia pensada para uso ágil no smartphone (Android e iOS).

---

## 2. Paleta de Cores Oficial

A paleta foi extraída e calibrada a partir do logotipo oficial da marca:

```
┌────────────────────────────────────────────────────────────────────────┐
│  VORTEX NAVY (Principal)        VORTEX ORANGE (Destaque & Ação)        │
│  #182D50                         #ED3E1A                               │
│  RGB(24, 45, 80)                 RGB(237, 62, 26)                      │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.1. Escala Cromática Completa (Tailwind Tokens)

| Token | Hex | Uso Principal |
| :--- | :--- | :--- |
| `vortex-navy-950` | `#0B1424` | Fundo de rodapé, contrastes máximos |
| `vortex-navy-900` | `#11203A` | Header, fundos hero, botões primários escuros |
| **`vortex-navy-800` (Default)** | **`#182D50`** | **Cor primária da marca**, cards nobres, tipografia de títulos |
| `vortex-navy-700` | `#1F3F75` | Bordas e estados hover de elementos navy |
| `vortex-navy-100` | `#E1E9F5` | Focus rings, backgrounds de destaque suave |
| `vortex-navy-50` | `#F0F4FA` | Cards informativos internos, banners secundários |
| | | |
| `vortex-orange-600` | `#D63110` | Hover & Active de botões de conversão |
| **`vortex-orange` (Default)** | **`#ED3E1A`** | **Cor de destaque/CTA**, ícone do logo, botões principais |
| `vortex-orange-400` | `#FF7443` | Badges de alerta e realces |
| `vortex-orange-100` | `#FFE2D1` | Bordas de cards de destaque |
| `vortex-orange-50` | `#FFF2E8` | Fundo de tags, chips selecionados e alertas positivos |

### 2.2. Cores Funcionais e Semânticas
- **Sucesso / WhatsApp / Confirmação:** `Emerald` (`#10B981` / `#059669` / `#ECFDF5`)
- **Atenção / Prazos:** `Amber` (`#F59E0B` / `#FEF3C7`)
- **Erro / Validação:** `Rose` (`#EF4444` / `#FEE2E2`)
- **Superfície & Backgrounds:**
  - Background Geral: `Slate-50` (`#F8FAFC`)
  - Cards e Modais: `Branco Puro` (`#FFFFFF`)
  - Textos Primários: `Slate-900` (`#0F172A`)
  - Textos Secundários / Legendas: `Slate-600` (`#475569`) / `Slate-400` (`#94A3B8`)
  - Linhas e Divisórias: `Slate-200` (`#E2E8F0`)

---

## 3. Tipografia

A família tipográfica oficial é **Plus Jakarta Sans** (Google Fonts).

### 3.1. Escala Tipográfica e Pesos

```
H1 (Hero):       32px a 48px (2rem - 3rem)    | Font Weight: 800 (Extrabold) | Tracking: -0.02em
H2 (Seções):     24px a 30px (1.5rem - 1.875) | Font Weight: 700 (Bold)      | Tracking: -0.01em
H3 (Cards):      18px a 20px (1.125rem - 1.25)| Font Weight: 700 (Bold)      | Leading: 1.3
Corpo (Body):    14px a 16px (0.875rem - 1rem)| Font Weight: 400 a 500 (Reg/Med)
Inputs & Forms:  16px fixo no mobile          | Font Weight: 500 (Medium)    | *Evita zoom automático no iOS
Badges & Chips:  11px a 12px (0.687rem - 0.75)| Font Weight: 600 a 700 (Bold)| Tracking: 0.05em
Logo Wordmark:   All Caps                     | Font Weight: 800 (Extrabold) | Tracking: 0.22em
```

---

## 4. Logotipo e Ícone da Marca

O logotipo do Vortex é composto por:
1. **Símbolo Geométrico:** Um "V" angular formado por um polígono vazado na asa esquerda e um triângulo fechado na asa direita na cor `#ED3E1A` (*Vortex Orange*).
2. **Wordmark:** Texto `VORTEX` em caixa alta com espaçamento largo (`tracking-[0.22em]`), em branco sobre fundo navy ou em `vortex-navy-900` sobre fundos claros.
3. **Regra de Uso:**
   - Em cabeçalhos escuros: Ícone Laranja + Tipografia Branca.
   - Em telas claras: Ícone Laranja + Tipografia Navy.
   - Nunca distorcer as proporções do símbolo.

---

## 5. Iconografia

Utiliza-se a biblioteca **`lucide-react`** como padrão unificado em 100% dos componentes e fluxos do aplicativo. **O uso de emojis no código e na interface é expressamente vedado.**

### 5.1. Regras de Ícones
- **Proibição de Emojis:** Nenhum componente deve renderizar caracteres de emojis nativos do sistema operacional (ex: ⚡, 📅, 🗓️, 🌿, 🎯, 🔒, ✨). Em vez disso, deve ser sempre utilizado o componente vetorial SVG correspondente do `lucide-react` (`Zap`, `Calendar`, `CalendarDays`, `Smile`, `Target`, `Lock`, `Sparkles`, etc.).
- **Espessura do Traço (Stroke Width):** Sempre `2px` (padrão Lucide) para consistência visual.
- **Tamanhos Padronizados:**
  - Micro / Badges: `14px` (`w-3.5 h-3.5`)
  - Botões e Inputs: `16px` a `20px` (`w-4 h-4` ou `w-5 h-5`)
  - Features e Cards de Seleção: `20px` a `28px` (`w-5 h-5` a `w-7 h-7`)
  - Estados de Sucesso / Hero: `40px` a `48px` (`w-10 h-10` ou `w-12 h-12`)
- **Paleta de Ícones:**
  - Ícones de Ação/Foco: `text-vortex-orange`
  - Ícones de Validação/WhatsApp: `text-emerald-500`
  - Ícones de Apoio/Campos: `text-slate-400`

---

## 6. Sistema de Componentes

### 6.1. Botões (Buttons)

Todos os botões devem seguir a curvatura `rounded-2xl` (16px) e feedback tátil `active:scale-[0.98]`.

1. **Botão Primário de Conversão (Orange CTA):**
   - Classes: `bg-vortex-orange hover:bg-vortex-orange-600 text-white font-bold py-4 px-6 rounded-2xl shadow-orange-glow active:scale-[0.98] transition-all`
   - Uso: *Buscar opções*, *[ QUERO PARTICIPAR DO TESTE ]*, *Instalar Aplicativo*.

2. **Botão Primário Corporativo (Navy CTA):**
   - Classes: `bg-vortex-navy-900 hover:bg-vortex-navy-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-navy-glow active:scale-[0.98] transition-all`
   - Uso: *Acessar Conta do Médico*, *Finalizar Inscrição*.

3. **Botão Secundário / Ghost:**
   - Classes: `bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-5 rounded-2xl transition-all`
   - Uso: *Voltar ao início*, *Fazer outra busca*.

### 6.2. Campos de Formulário (Inputs)

- **Estrutura:** Ícone posicionado à esquerda (`left-3.5`), padding esquerdo generoso (`pl-11`), altura confortável (`py-3`).
- **Bordas e Foco:** `border-slate-200 bg-slate-50 focus:border-vortex-navy-700 focus:ring-4 focus:ring-vortex-navy-100 rounded-2xl outline-none text-slate-900`.
- **Estado de Erro:** `border-rose-500 ring-2 ring-rose-100 text-slate-900` com mensagem em `text-xs text-rose-500 font-medium`.
- **Prevenção de Zoom iOS:** Sempre aplicar `font-size: 16px` em `<input>`, `<select>` e `<textarea>`.

### 6.3. Cards e Superfícies

- **Card Principal:** `bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200/80`.
- **Card Interativo de Seleção (Role Selector / Timeframe):**
  - Não selecionado: `bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700`
  - Selecionado: `bg-vortex-navy-900 border-vortex-navy-900 text-white shadow-md` com ícone de check `text-vortex-orange`.

### 6.4. Menu Pop-up do Header & Modal de FAQ
- **Botão de Abertura:** Botão discreto no cabeçalho com ícone `<Menu />` (ou `<X />` quando aberto), com efeito active e focus.
- **Card Pop-up Flutuante:** `bg-white rounded-2xl shadow-2xl border border-slate-100 py-2`, com fechamento automático ao clicar fora.
- **Itens do Menu:**
  - *Baixar Aplicativo:* Ícone `<Download />` com trigger para o instalador PWA nativo (Android) ou guia Safari (iOS).
  - *Dúvidas Frequentes (FAQ):* Ícone `<HelpCircle />` abrindo o modal informativo com acordeão expansível das dúvidas mais comuns.

### 6.5. Sombras (Shadows)

- `shadow-card`: `0 10px 25px -5px rgba(24, 45, 80, 0.07), 0 8px 10px -6px rgba(24, 45, 80, 0.04)`
- `shadow-card-hover`: `0 20px 35px -5px rgba(24, 45, 80, 0.12), 0 10px 15px -5px rgba(24, 45, 80, 0.06)`
- `shadow-orange-glow`: `0 10px 25px -3px rgba(237, 62, 26, 0.35)`
- `shadow-navy-glow`: `0 12px 30px -5px rgba(24, 45, 80, 0.45)`

---

## 7. Diretrizes Mobile-First e PWA

O Vortex foi desenvolvido para se comportar como um aplicativo nativo em **Android (Chrome)** e **iOS (Safari)**.

### 7.1. Safe Area Insets
Todos os layouts respeitam o entalhe (*notch*), a barra de status e a barra inferior do iPhone:
```css
padding-top: env(safe-area-inset-top, 0px);
padding-bottom: env(safe-area-inset-bottom, 0px);
padding-left: env(safe-area-inset-left, 0px);
padding-right: env(safe-area-inset-right, 0px);
```

### 7.2. Configuração PWA
- **Manifest:** `standalone`, orientação `portrait`, tema `#182D50`, fundo `#0E1B33`.
- **Ícones PWA:**
  - `pwa-192x192.png` (Android standard)
  - `pwa-512x512.png` (Android splash & maskable)
  - `apple-touch-icon.png` (180x180 iOS home screen)
  - `favicon.ico` / `favicon-32x32.png` (Desktop browser)
- **Instalação:**
  - No **Chrome/Android:** Captura nativa do evento `beforeinstallprompt` com modal de 1 clique.
  - No **Safari/iOS:** Modal educativo ilustrado demonstrando o fluxo *Compartilhar -> Adicionar à Tela de Início*.
- **Offline First:** O Service Worker armazena em cache o bundle e as fontes do Google Fonts, garantindo funcionamento mesmo sem conexão.

---

## 8. Animações e Micro-interações

- **Entrada de Telas:** `animate-slide-up` (transição suave de baixo para cima com `cubic-bezier(0.16, 1, 0.3, 1)`).
- **Feedback de Sucesso:** Disparo de partículas (*confetti*) nas cores oficiais (`#ED3E1A`, `#182D50`, `#10B981`, `#F59E0B`).
- **Pulsos de Status:** `animate-pulse` em indicadores de busca ativa de médicos.
- **Transições de Botão:** `transition-all duration-200` em todos os botões e seletores.

---

## 9. Checklist para Novos Componentes

Ao criar qualquer nova tela ou componente no Vortex, certifique-se de:
1. [ ] Usar os tokens de cor oficiais (`vortex-navy` ou `vortex-orange`).
2. [ ] Manter os cantos arredondados padrão (`rounded-2xl` para elementos internos e `rounded-3xl` para cartões principais).
3. [ ] Empregar fontes `Plus Jakarta Sans` com tamanhos de input `>= 16px`.
4. [ ] Usar ícones da biblioteca `lucide-react` com `strokeWidth={2}`.
5. [ ] Garantir contraste acessível (WCAG AA) em todos os textos.
6. [ ] Validar compatibilidade em viewport mobile (375px) e desktop (1280px).
