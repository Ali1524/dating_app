# Match & Meet - Dating App (frontend only)

Run the frontend development server:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). Vite
reloads the page when you change the UI files. This is a frontend-only app;
there is no backend. Sample data is in `app.js` (the `P` array).

If PowerShell reports that scripts are disabled when running `npm`, use
`npm.cmd` as shown above. This avoids changing the machine's execution policy.

Files:
- index.html - screens (login, home, discover, likes, chats, chat, call, settings)
- style.css - styles and colour tokens (#D1008B, #680045, #202A42)
- app.js - swipe logic, chat, calls (simulated), settings and accessibility

Poppins loads from Google Fonts, so fonts need an internet connection.
Photos are placeholders: replace the gradient/silhouette in the `ph()` function with real images.
