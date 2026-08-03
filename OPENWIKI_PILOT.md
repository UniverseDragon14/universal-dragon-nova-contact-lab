# OpenWiki Pilot Plan

This branch prepares a safe, review-first OpenWiki trial for **Universal Dragon NOVA Contact Lab only**.

## Current state

- Target repository: `UniverseDragon14/universal-dragon-nova-contact-lab`
- Pilot branch: `docs/openwiki-pilot`
- Main branch changed: **No**
- OpenWiki executed: **No**
- Automatic workflow added: **No**
- QBIT NOVA C touched: **No**
- QBIT NOVA Native touched: **No**
- Novakutty repositories or `novakutty.universaldragon.com` touched: **No**

## Safe local trial

Run this only from a clean local checkout of this pilot branch:

```sh
git switch docs/openwiki-pilot
npm install -g openwiki
openwiki --init
```

The first run should write generated documentation under `openwiki/`. Review every generated file before committing it.

## Required validation before any merge

1. Confirm `.openwikiignore` excluded credentials, logs, backups, archives, and unrelated protected project paths.
2. Confirm generated pages describe implemented source behavior accurately.
3. Confirm no secret values, private endpoints, personal data, or production infrastructure details appear.
4. Confirm QBIT NOVA and Novakutty are not documented or referenced as inspected dependencies.
5. Commit generated documentation only after manual approval.
6. Open a draft pull request; do not enable auto-merge.

## Rollback

The pilot is isolated from `main`. If the generated documentation is unsuitable, close the draft pull request and leave `main` unchanged.
