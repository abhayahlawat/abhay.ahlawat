# Abhay's Portfolio

A modern, responsive, and interactive portfolio website built with React, TypeScript, and Vite. This project showcases a collection of projects, services, and a personal journey using advanced animations and smooth scrolling effects.

## Features

- **Scrollytelling Experience**: Engaging narrative flow tailored to guide visitors through your professional journey.
- **Smooth Scrolling**: enhanced scrolling experience powered by [Lenis](https://github.com/darkroomengineering/lenis).
- **Advanced Animations**: Dynamic and interactive elements using [GSAP](https://gsap.com/) and [Lottie](https://airbnb.io/lottie/).
- **Responsive Design**: Fully responsive layout built with [Tailwind CSS](https://tailwindcss.com/), ensuring a great experience on all devices.
- **Modular Architecture**: Clean code structure with separate components for Hero, Highlights, Projects, Services, and more.
- **Type Safety**: Developed with TypeScript for reliability and maintainability.

## Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Animation**: GSAP, Lottie-web
- **Scroll Management**: Lenis

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/portfolio.git
    cd portfolio
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Usage

-   **Start Development Server**:
    ```bash
    npm run dev
    ```
    Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

-   **Build for Production**:
    ```bash
    npm run build
    ```
    Builds the app for production to the `dist` folder.

-   **Preview Production Build**:
    ```bash
    npm run preview
    ```
    Locally preview the production build.

-   **Lint Code**:
    ```bash
    npm run lint
    ```
    Runs ESLint to check for code quality issues.

## Project Structure

```bash
src/
├── assets/         # Static assets (images, fonts, etc.)
├── components/     # Reusable UI components
├── data/           # Static data and configuration
├── hooks/          # Custom React hooks
├── sections/       # Main page sections (Hero, Projects, Contact, etc.)
├── types/          # TypeScript type definitions
├── App.tsx         # Main application component
├── main.tsx        # Entry point
└── index.css       # Global styles and Tailwind imports
```

## License

This project is open source and available under the [MIT License](LICENSE).
