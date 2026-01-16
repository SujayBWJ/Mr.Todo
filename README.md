# Mr. Todo

A clean, minimal todo app built with vanilla HTML, CSS, and JavaScript.

## Features

- Add, edit (double-click), and delete todos  
- Mark tasks as completed with a checkbox  
- Todos persist using `localStorage`  
- Dark mode with smooth transitions  
- Theme state persists across refresh  
- Keyboard support (Enter to add)  
- Lightweight, no frameworks
- Alerts when input field is empty

## How It Works

- Todos live in an array and are synced to `localStorage`
- UI is a projection of that data
- Each render rebuilds the list from state
- Dark mode is controlled by a single `dark` class on `<body>`
- Theme is saved and restored on load

## Run Locally

Just open `index.html` in a browser.

No setup. No build. No dependencies.

## Controls

- Type and press **Enter** or click **Add** to create a task  
- Click the checkbox to mark complete  
- Double-click a task to edit  
- Click **Delete** to remove  
- Use the **Dark Mode** button to toggle theme

Built to understand fundamentals, not hide them.
