# DragonWiki Pilot Plan

**DragonWiki** is the Universal Dragon identity for this documentation pilot. It uses the upstream **OpenWiki** CLI as its documentation engine and keeps that attribution intact.

This branch prepares a safe, review-first documentation trial for **Universal Dragon NOVA Contact Lab only**.

## Naming boundary

- User-facing pilot name: `DragonWiki`
- Upstream engine and npm package: `openwiki`
- Protected Novakutty identity: not used
- QBIT NOVA identities: not used for this documentation product

## Current state

- Target repository: `UniverseDragon14/universal-dragon-nova-contact-lab`
- Pilot branch: `docs/openwiki-pilot`
- Main branch changed: **No**
- Generated documentation committed: **No**
- Automatic workflow added: **No**
- QBIT NOVA C touched: **No**
- QBIT NOVA Native touched: **No**
- Novakutty repositories or `novakutty.universaldragon.com` touched: **No**

## Isolated local engine

The OpenWiki engine must remain under:

```text
$HOME/.local/openwiki-pilot-tools
```

Do not install or patch it inside QBIT NOVA, Novakutty, production service, DNS, Cloudflare, or systemd paths.

## Safe local commands

From a clean checkout of this pilot branch:

```sh
git switch docs/openwiki-pilot
git pull --ff-only

bash tools/dragonwiki --version
bash tools/dragonwiki doctor
```

The upstream OpenWiki CLI does not currently accept `--version` as a normal version-only command. Use the DragonWiki wrapper command above so checking the installed version cannot accidentally start a documentation session.

After the doctor check passes, initialize documentation with:

```sh
bash tools/dragonwiki --init
```

The engine should write generated documentation under `openwiki/`. Review every generated file before committing it.

## Required validation before any merge

1. Confirm `.openwikiignore` excluded credentials, logs, backups, archives, and unrelated protected project paths.
2. Confirm generated pages describe implemented source behavior accurately.
3. Confirm no secret values, private endpoints, personal data, or production infrastructure details appear.
4. Confirm QBIT NOVA and Novakutty are not documented or referenced as inspected dependencies.
5. Confirm the user-facing title is DragonWiki while upstream OpenWiki attribution remains accurate.
6. Commit generated documentation only after manual approval.
7. Keep the pull request in draft and do not enable auto-merge.

## Rollback

The pilot is isolated from `main`. If generated documentation is unsuitable, close the draft pull request and leave `main` unchanged. The isolated local checkout and tools directory can remain unused without affecting production projects.
