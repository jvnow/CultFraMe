# CultFraMe — Repository Guidelines

## Project Overview

CultFraMe is a cultural platform inspired by applications such as Letterboxd, but focused on a broader range of pop culture.

The platform will eventually allow users to discover, register, rate, and interact with cultural works such as:

- Films
- Series
- Anime and animation
- Games
- Books
- Manga and comics
- Music and albums
- Podcasts
- Cultural events

The current priority is building the frontend interface based on the project's Figma design.

## Technology Stack

### Current frontend

- React
- TypeScript
- CSS
- Vite

### Planned backend

- C#
- ASP.NET Core

### Planned database

- MySQL

### Planned authentication

- JWT

### Version control

- Git
- GitHub

Do not introduce additional frameworks or libraries unless explicitly requested.

---

## Development Philosophy

The project is being developed incrementally.

When implementing a task:

1. Make the smallest reasonable change.
2. Preserve existing functionality.
3. Do not rewrite working components unnecessarily.
4. Do not restructure the project unless there is a clear reason.
5. Avoid implementing unrelated features.
6. Prefer reusable React components.
7. Keep the code understandable for a developer who is learning from the project.

The developer may ask for one small change at a time. Follow that workflow instead of implementing several future steps at once.

---

## Project Structure

Keep application code inside `src/`.

The current project uses a structure similar to:

```text
src/
├── assets/
├── components/
├── pages/
├── App.tsx
├── main.tsx
└── index.css

Use:

components/ for reusable UI components.
pages/ for complete application screens.
assets/ for imported images and other bundled assets.
index.css for global styles.
Component-specific CSS may be introduced when it improves organization, but do not unnecessarily split existing styles.

Do not move existing files unless explicitly requested.

Current Frontend Architecture

The frontend currently contains reusable components such as:

Header
ObraCard

Pages are responsible for composing components, while reusable components should receive their data through props.

For example, an ObraCard should remain reusable rather than containing information specific to only one work.

Prefer typed props:

interface ObraCardProps {
  titulo: string
  tipo: string
  imagem: string
  nota: number
}

Do not hard-code data inside reusable components when that data can reasonably be passed as a prop.

React and TypeScript Guidelines

Use functional React components.

Use TypeScript types or interfaces for component props.

Use PascalCase for React component names:

ObraCard.tsx
Header.tsx
UserProfile.tsx

Use camelCase for variables and functions:

titulo
imagem
nota
handleSearch

Use descriptive names.

Avoid any unless there is a specific technical reason.

Do not add state, hooks, context, routing, or external libraries unless the current feature actually requires them.

Styling Guidelines

The visual identity of CultFraMe is based primarily on:

Dark backgrounds
White text
Orange
Yellow

The current main background is:

#14151a

The primary orange currently used is:

#ff9d00

The yellow used for ratings is:

#ffd000

Preserve the existing visual identity when adding new elements.

The Figma design is the primary visual reference for the interface.

Do not invent a completely different visual style.

When making visual changes:

Preserve existing spacing unless the task requires changing it.
Preserve existing card proportions unless requested.
Avoid excessive animations.
Keep hover effects subtle and smooth.
Avoid unnecessary gradients, shadows, borders, or decorative effects.
Prioritize visual consistency across pages.
Figma Reference

The CultFraMe interface is being developed from a Figma design.

Important screens include:

Landing
Home
Login
Cadastro

When implementing these screens, reproduce the structure and visual hierarchy of the design as closely as practical.

If the exact Figma design information is unavailable, do not invent major interface decisions without asking the developer.

Images and Assets

Images used by the frontend should normally be stored in:

src/assets/

and imported into React.

Example:

import dune from '../assets/dune.jpg'

Do not replace existing project images with placeholders unless explicitly requested.

Do not delete or rename existing assets without a reason.

Current Home Page

The Home page currently contains:

Header
Search input
"Popular on CultFraMe" section
Section divider
Reusable ObraCard components
Poster images
Hover animation
Rating overlay

The existing Home functionality must remain intact when implementing new features.

When adding new cultural sections, prefer reusing ObraCard rather than creating duplicated card markup.

Data and Reusability

At the current frontend stage, cultural works may use static data.

Static data is acceptable while the interface is being developed.

Later, the static data will be replaced or supplemented by backend/API data.

Do not prematurely implement the backend, database, authentication, or API integration while working on a frontend-only task unless explicitly requested.

Commands

Use the scripts defined in package.json.

Common commands:

npm install
npm run dev
npm run build
npm run lint

Before considering a significant change complete, prefer checking that:

npm run build

succeeds.

Do not run unnecessary commands.

Error Handling and Debugging

When an error occurs:

Identify the actual cause.
Make the smallest correction necessary.
Preserve unrelated working code.
Explain what was changed when reporting the result.

Do not hide errors by disabling TypeScript checks, linting, or build validation.

Do not remove functionality merely to make an error disappear.

Code Changes

Before modifying an existing component:

Read the current implementation.
Understand how it is being used.
Make the smallest change necessary.
Avoid changing unrelated files.

Never replace an entire component when a small modification is sufficient.

Do not overwrite the developer's work with a completely new implementation unless explicitly requested.

Communication

The developer is learning while building the CultFraMe project.

When completing a task, briefly explain:

What was changed.
Which files were changed.
Why the change was necessary.
Any important React, TypeScript, or CSS concept involved.

Do not provide unnecessary explanations for trivial changes.

If a requested change could have multiple significantly different implementations, ask before making a major architectural decision.

Important Restrictions

Do NOT:

Rewrite the entire project unnecessarily.
Replace React with another framework.
Replace TypeScript with JavaScript.
Introduce Tailwind, Bootstrap, Material UI, or another CSS framework without explicit permission.
Add backend code during frontend-only tasks.
Add a database during frontend-only tasks.
Change the project's architecture without approval.
Remove working features.
Delete assets without approval.
Invent major UI elements that are not part of the current design direction.
Modify multiple unrelated areas of the project for a single small task.

Always prioritize the existing CultFraMe implementation and the developer's instructions.

Future Architecture

The planned application architecture is:

React + TypeScript + CSS
        ↓
C# + ASP.NET Core API
        ↓
MySQL

Authentication is planned to use JWT.

These technologies are part of the long-term plan but should only be implemented when explicitly requested.

Git Guidelines

Keep commits focused on one logical change.

Prefer concise commit messages such as:

Add dynamic ratings to ObraCard

or:

Update Home header layout

Do not mix unrelated refactors with feature changes.

Never commit secrets, passwords, API keys, tokens, or local environment credentials.