

# Recipe Manager App

This project is a simple Recipe Manager App built using React. The app allows users to create, view, edit, delete, and organize recipes. A JSON-Server is used to manage the backend data.

---

## Repoisotry Link

https://github.com/teymuraliyev1/web-and-mobile-reciepes.git

---

## Features

- **Home Page**: Displays a featured recipe and an introduction to the app.
- **Recipe Management**: Add, view, edit, delete, and organize recipes with features like sorting, filtering, and searching.
- **Contact Page**: Submit messages via a simple contact form.
- **Backend Integration**: Uses `json-server` to store and manage recipes and messages.

---

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- npm (comes with Node.js)
- [JSON-Server](https://github.com/typicode/json-server)

---

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-link>
   cd recipe-app-manager
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

---

## Running the Application

### Start the React App

To start the React app, run the following command:

```bash
npm run start
```

This will start the development server. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

### Start the JSON-Server

To start the `json-server` and serve the recipe data, run:

```bash
npm run server
```

This will start the server at [http://localhost:3001](http://localhost:3001).

---

## Using the Application

1. **Home Page**: Explore the featured recipe and learn more about the app.
2. **Recipe Management**: Navigate to the "Recipes" page to create, view, edit, delete, and filter recipes.
3. **Contact**: Use the contact form to send messages to the backend.

---

## Project Structure

```
src
├── components           # Reusable components
├── constants            # Static values
├── contact              # Contact page
├── home                 # Home page
├── hooks                # Custom hooks
└── recipe               # Recipe-related pages and components
```

