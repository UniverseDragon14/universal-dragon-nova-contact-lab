# OpenWiki Scope Instructions

Document only the `UniverseDragon14/universal-dragon-nova-contact-lab` repository.

## Purpose

Create a clear technical wiki for the NOVA Contact Lab codebase, including:

- project purpose and boundaries
- application structure
- main modules and responsibilities
- local development flow
- configuration requirements using placeholder names only
- runtime and data flow diagrams grounded in the source
- public-safe architecture notes for future coding agents

## Hard boundaries

- Do not inspect, describe, modify, reference as a dependency, or make assumptions about QBIT NOVA C, QBIT NOVA Native, or any `qbit-nova-*` repository.
- Do not inspect, describe, modify, deploy, or make assumptions about `novakutty.universaldragon.com` or Novakutty repositories and services.
- Do not include API keys, tokens, passwords, credentials, private endpoints, private user data, `.env` contents, logs, backups, or generated archives.
- Do not claim physical quantum hardware, autonomous authority, production readiness, or security guarantees unless directly proven by public source code.
- Do not alter application code, deployment files, DNS, Cloudflare configuration, systemd services, or runtime infrastructure.

## Documentation style

- Use precise, evidence-based language.
- Clearly distinguish implemented behavior from planned or experimental behavior.
- Keep code identifiers and file paths unchanged.
- Prefer short linked Markdown pages over one oversized document.
- Add Mermaid diagrams only when they accurately reflect inspected source.

## Review rule

Generated documentation must remain on the isolated pilot branch until manually reviewed. Do not merge automatically.
