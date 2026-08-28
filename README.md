# Orange Bissau — Bónus de Cliente

Página de cadastro promocional para clientes Orange Bissau. Cada cliente cadastrado recebe **50% de bónus** em cada recarga via Orange Money.

## Funcionalidades

- Landing page responsiva com identidade visual Orange
- Formulário de cadastro com validação
- Exemplo visual do cálculo de bónus (50%)
- Armazenamento local dos cadastros (demonstração)

## Pré-visualização local

Abra o ficheiro `index.html` no browser ou use um servidor local:

```bash
# Com Python
python -m http.server 8080

# Com Node.js (npx)
npx serve .
```

Depois aceda a `http://localhost:8080`.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub
2. Envie este projeto:

```bash
git init
git add .
git commit -m "Adicionar página de cadastro Orange Bissau com bónus 50%"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/upbissau.git
git push -u origin main
```

3. No GitHub: **Settings → Pages → Source → Deploy from branch → main / root**
4. A página ficará disponível em `https://SEU_USUARIO.github.io/upbissau/`

## Estrutura

```
upbissau/
├── index.html    # Página principal
├── styles.css    # Estilos
├── app.js        # Validação e cadastro
└── README.md
```

## Campos do cadastro

| Campo            | Obrigatório | Descrição                    |
|------------------|-------------|------------------------------|
| Nome completo    | Sim         | Nome do cliente              |
| Número Orange Money | Sim      | Número válido (9 dígitos)    |
| E-mail           | Não         | Contacto opcional            |
| Termos           | Sim         | Aceitação do programa        |

## Nota importante

Esta versão guarda os cadastros em `localStorage` do browser (apenas para demonstração). Para produção, ligue o formulário a um backend ou serviço como Formspree, Firebase ou API própria.

## Licença

MIT
