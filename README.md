# Gemini Assistant

A modern, multi-mode AI chat assistant web app powered by Google Gemini API. Built with React, TypeScript and Vite, the multi-mode Gemini Assistant provides a responsive and seamless chat experience for explaining, summarizing, or shortening text using the Gemini LLM.

## Features

- Multi-Mode AI Chat: Choose between "Explain", "Summarize", or "Shorten" modes for the entered text.
- Google Gemini API Integration: Securely use your own Gemini API key for all the requests.
- Persistent Conversations: All chats and your API key are saved in the browser's local storage.
- Modern and Responsive Interface: Manage multiple conversations, start new chats, and delete old ones, with ease.

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui and Radix UI

## How to Run

1. Clone this repository on your local machine.
2. Install the dependencies:
```bash
npm install  # or yarn install
```
3. Get the Gemini API key:
   - You must obtain your own Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey) before using the web app.
   - The app will prompt you to enter this key in the sidebar on first use.
4. Start the server:
```bash
npm run dev  # or yarn dev
```   
5. Open in your browser:
```
http://localhost:8080
```

- Your Gemini API key and chat history are stored only in your browser (localStorage).
- No data is sent to any server except directly to the Gemini API.

## Contributing

Contributions are welcome!

## License

Distributed under the MIT License.  
