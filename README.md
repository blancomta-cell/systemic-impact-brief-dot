# dot. Systemic Impact Brief Builder

Proyecto Next.js listo para desplegar en Vercel.

## Incluye
- Landing inspirada en dot
- Formulario en portada
- Endpoint `POST /api/systemic-impact-brief`
- Integracion con OpenAI Responses API
- Vista previa del primer brief generado

## Requisitos
- Node.js 20.9 o superior
- Una API key de OpenAI

## Arranque local

```bash
npm install
cp .env.example .env.local
```

Completa `.env.local`:

```bash
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1
```

Despues:

```bash
npm run dev
```

## Despliegue en Vercel
1. Sube esta carpeta a GitHub.
2. En Vercel, importa el repositorio.
3. Anade `OPENAI_API_KEY` en Environment Variables.
4. Opcionalmente anade `OPENAI_MODEL`.
5. Deploy.

## Nota
Este zip no incluye `package-lock.json` a proposito, para que Vercel resuelva dependencias desde el registro publico de npm y evitar el fallo del lockfile anterior.
