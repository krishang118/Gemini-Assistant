# Gemini Assistant

A modern, multi-mode AI chat assistant powered by Google Gemini API. Built with React, TypeScript, Vite, and shadcn/ui, Gemini Assistant provides a beautiful, responsive, and highly interactive chat experience for explaining, summarizing, or shortening text using the Gemini LLM.

---

## ✨ Features

- **Multi-Mode AI Chat**: Choose between "Explain", "Summarize", or "Shorten" modes for your text.
- **Google Gemini API Integration**: Securely use your own Gemini API key for all requests.
- **Persistent Conversations**: All chats and your API key are saved in your browser's local storage.
- **Modern UI/UX**: Built with shadcn/ui and Radix UI for a polished, accessible interface.
- **Responsive Sidebar**: Manage multiple conversations, start new chats, and delete old ones.
- **Toast Notifications**: Get instant feedback on errors or important actions.
- **Keyboard Shortcuts**: Sidebar toggling and mobile-friendly navigation.
- **404 Handling**: Friendly error page for unknown routes.

---

## 🚀 Demo

> _Add a link to your deployed app here if available._

---

## 🖥️ Screenshots

> _Add screenshots or GIFs here to showcase the UI and features._

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/gemini-assistant.git
   cd gemini-assistant
   ```

2. **Install dependencies/requirements:**
   - Using **npm**:
     ```bash
     npm install
     ```
   - Or using **yarn**:
     ```bash
     yarn install
     ```

3. **Get your Gemini API key:**
   - You must obtain your own Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey) before using the app.
   - The app will prompt you to enter this key in the sidebar on first use.

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in your browser:**
   ```
   http://localhost:8080
   ```

---

## 🔑 Gemini API Key

To use the assistant, you must provide your own [Google Gemini API key](https://aistudio.google.com/app/apikey). Enter it in the sidebar under "Gemini API Key". Your key is stored locally and never sent to any server except Google's API.

---

## 🧩 Project Structure

```
src/
  components/
    GeminiAssistant.tsx      # Main assistant logic and state
    ChatSidebar.tsx          # Sidebar for chat management and API key
    ChatInterface.tsx        # Main chat UI and message handling
    MessageBubble.tsx        # Message display component
    ModeSelector.tsx         # Mode selection (Explain, Summarize, Shorten)
    ui/                      # Reusable UI components (shadcn/ui)
  hooks/
    use-toast.ts             # Toast notification system
    use-mobile.tsx           # Mobile detection hook
  lib/
    utils.ts                 # Utility functions
  pages/
    Index.tsx                # Main landing page
    NotFound.tsx             # 404 error page
  App.tsx                    # App entry point, routing, providers
  main.tsx                   # ReactDOM render
  index.css                  # Tailwind and global styles
```

---

## ⚙️ Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm run preview` – Preview the production build
- `npm run lint` – Lint the codebase

---

## 🖌️ Customization

- **UI**: Built with [shadcn/ui](https://ui.shadcn.com/) and [Radix UI](https://www.radix-ui.com/).
- **Styling**: Uses [Tailwind CSS](https://tailwindcss.com/).
- **API**: Easily swap out the Gemini API endpoint or add new modes in `ChatInterface.tsx` and `ModeSelector.tsx`.

---

## 📦 Dependencies

- React, React DOM, TypeScript, Vite
- shadcn/ui, Radix UI, lucide-react (icons)
- @tanstack/react-query (data fetching)
- react-router-dom (routing)
- tailwindcss, postcss, autoprefixer
- zod, react-hook-form (validation, forms)
- ...and more (see `package.json`)

---

## 🛡️ Security & Privacy

- Your Gemini API key and chat history are stored **only in your browser** (localStorage).
- No data is sent to any server except directly to the Gemini API.

---

## 📄 License

> _Specify your license here (e.g., MIT, Apache 2.0, etc.)_

---

## 🙏 Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Google Gemini API](https://aistudio.google.com/app/apikey)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 💡 Contributing

Pull requests and issues are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📬 Contact

> _Add your contact info, Twitter, or Discord here._

---


A multi-mode AI chat assistant web app using Google Gemini API, built with React, TypeScript and Vite for seamless text explanation, summarization, and shortening.