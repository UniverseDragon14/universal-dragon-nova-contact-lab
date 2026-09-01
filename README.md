# Universal Dragon NOVA Contact Lab

A mobile-friendly cinematic NOVA interface built as a static single-page site.

## Implemented behavior

- chat-style browser UI
- deterministic keyword-based local replies
- browser speech recognition when supported
- browser text-to-speech
- copy-chat and speech controls
- responsive status, project, and technology panels
- static-site deployment workflow

The displayed latency is generated in the browser for presentation. Chat replies are local JavaScript rules; the current page does not call a remote AI model.

## Run locally

~~~bash
npm install
npm run dev
~~~

A simple static server also works for the current HTML entry point.

## Browser support

Speech recognition support varies by browser and may require microphone permission. Text-to-speech uses the browser speech-synthesis API.

## Current boundary

The package lists AI and React-related dependencies, but the current default page is a standalone static interface. There is no active NOVA backend, persistent memory, authentication, terminal execution, hardware control, or live Pi telemetry in this repository.
