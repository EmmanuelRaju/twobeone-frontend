# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

# Project Structure and Flows

This document provides an overview of the structure and flows of the project to help understand its organization and functionality.

## Project Structure

### Root Directory

- **eslint.config.js**: Configuration for ESLint to enforce code quality.
- **package.json**: Contains project dependencies and scripts.
- **svelte.config.js**: Configuration for Svelte.
- **tsconfig.json**: TypeScript configuration file.
- **vite.config.ts**: Configuration for Vite, the build tool.

### `src/` Directory

The main source directory for the project.

#### `lib/`

- **assets/**: Contains static assets like `favicon.svg` and CSS files for themes.
- **components/**: Houses reusable Svelte components organized into subdirectories like `common`, `form`, `layout`, and `profile-card`.
- **data/**: Contains data files for different modules, such as `layout` and `matrimony-profile`.
- **models/**: Defines TypeScript models for components and other entities.
- **schemas/**: Contains schema definitions for authentication and matrimony profiles.
- **server/**: Includes server-side logic, such as database configurations and user models.
- **stores/**: Manages Svelte stores for state management.
- **utils/**: Utility functions for common operations.

#### `routes/`

Defines the application's routing structure.

- **`+layout.svelte`**: Layout component for the app.
- **`+page.svelte`**: Main page component.
- **(auth)**: Contains routes for authentication, such as login, register, and forgot password.
- **matrimony/**: Includes routes for matrimony-related features, such as profile management and home.
- **api/**: Server-side API routes for authentication and user management.
- **Static Pages**: Routes for `contact-us`, `how-to-use`, `privacy-policy`, and `terms-of-use`.

### `static/`

Contains static files like `robots.txt`.

## Flows

### Authentication Flow

- **Routes**: Located under `routes/(auth)`.
- **Server Logic**: Handled in `+page.server.ts` files for each route.
- **Data Handling**: Managed in `data.ts` files.

### Matrimony Profile Flow

- **Routes**: Located under `routes/matrimony/profile`.
- **Data Files**: Each section (e.g., `basic-information`, `education-occupation`) has its own `data.ts` file.
- **Server Logic**: Handled in `+page.server.ts` files.

### Layout and Navigation

- **Components**: `Navbar.svelte`, `Footer.svelte`, and `BottomNavbar.svelte` in `lib/components/layout`.
- **Data**: Navigation data is defined in `data/layout/navbar.ts`.

### Reusable Components

- **Common Components**: `Logo.svelte`, `ProfileCard.svelte`.
- **Form Components**: `FormErrorText.svelte`, `FormField.svelte`, `SelectField.svelte`.
- **Profile Card Components**: `ProfileActions.svelte`, `SocialIconButton.svelte`.

This structure ensures modularity and scalability, making it easier to maintain and extend the project.
