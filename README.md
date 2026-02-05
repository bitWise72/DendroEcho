# Dendro-Meet

Dendro-Meet is a generative video meeting experience with a cyber-physical glass interface, LiveKit video, and a local vision worker feeding Tambo.

## Getting started

1. Install dependencies.
2. Copy `.env.example` to `.env.local` and fill in values.
3. Run the dev server.

```bash
npm install
npm run dev
```

## Environment variables

- `NEXT_PUBLIC_LIVEKIT_URL`
- `LIVEKIT_API_KEY`
- `LIVEKIT_API_SECRET`
- `MONGODB_URI`
- `MEM0_API_KEY`
- `MEM0_BASE_URL`
- `NEXT_PUBLIC_TAMBO_API_KEY`
- `TAMBO_BASE_URL`
- `NEXT_PUBLIC_VISION_MODEL_URL`

The vision worker expects a MediaPipe gesture recognizer model at the URL in `NEXT_PUBLIC_VISION_MODEL_URL`.
