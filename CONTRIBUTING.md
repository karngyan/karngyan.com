# Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

## Setup

```bash
mise install      # pinned node + pnpm (https://mise.jdx.dev)
pnpm install
pnpm dev          # http://localhost:3000
```

Before opening a PR, make sure these pass:

```bash
pnpm check        # prettier + eslint
pnpm test         # vitest
pnpm build
```

## Workflow

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See `CLAUDE.md` for an architecture overview (useful for humans too).
