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
4. Add a changeset describing your change (`pnpm changeset`) - pick a bump
   (patch/minor/major) and write a short summary; it becomes the CHANGELOG entry
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

Maintainers run `pnpm changeset:version` before a release to consume pending
changesets, bump the version, and update `CHANGELOG.md`. Nothing is published
to npm - the changelog is the release.

See `CLAUDE.md` for an architecture overview (useful for humans too).
