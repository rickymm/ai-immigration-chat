# 🤖 Immigration Chatbot

> Deployed at: https://ai-immigration-chat.vercel.app/ 🚀

## 💻 How to run the app
This project is using [`pnpm`](https://pnpm.io) as the package manager.


It needs to have a `.env.local` file with OpenAI API key:
1. Create env file
```bash
  touch .env.local
```
2. Add key
> To get OpenAI API key, follow this [documentation](https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key)
```base
  OPENAI_API_KEY=xxxxxxxxx
```
3. Install and run dev
```bash
  pnpm install && pnpm run dev
```


## 🧳 Tech Used
- [NextJS with Typescript](https://nextjs.org)
- [Tailwind](https://tailwindcss.com)
- [Vercel AI SDK](https://sdk.vercel.ai)
- Tests with: [Jest](https://jestjs.io) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [ShadcnUI](https://ui.shadcn.com)
- [NextIntl](https://next-intl.dev) for internationalization

## 🖼️ Screenshots

**Desktop**
![image](https://github.com/user-attachments/assets/1e9e0b47-1c48-4979-b2f9-6d75dc7b2bdb)

**Mobile**
![image](https://github.com/user-attachments/assets/310e12e1-40f6-47d5-bc61-4c8d11b31474)


## Extras that can be implemented:

- Voice input:
  - Send audio to sdk - [docs](https://sdk.vercel.ai/docs/foundations/prompts#example-mp3-audio-file-from-buffer)
  - Record audio - [docs](https://github.com/samhirtarif/react-audio-recorder#readme)
  - or use audio recorded and send transcription as message
- Authentication:
  - Nextjs have a nice [documentation](https://nextjs.org/docs/pages/building-your-application/authentication) around that
- A [command menu](https://ui.shadcn.com/docs/components/command) for quick access to the settings
- Call OpenAI APIs directly - [docs](https://platform.openai.com/docs/quickstart)

