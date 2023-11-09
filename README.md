# Un Moquer Hotelier

A mock hotel booking and guest management system built with the MERN stack. The idea is to continue implementing advanced concepts through out the tech stacks by building a custom content management system.

This repo is the front-end layer only.

## Tooling List

- Package Manager - [Yarn](https://yarnpkg.com/)
- Front End Build Tool - [Vite](https://vitejs.dev/)
- Front End Framework - [React](https://react.dev/)
- SPA Router - [React Router](https://github.com/remix-run/react-router#readme)
- UI Kit - [Ant Design](https://ant.design/)
- Unit Testing - [Vitest](https://vitest.dev/)

## API Layer & Data Storage

- Next.js API Hosted on Vercel
- MongoDB Atlas for data storage

![image infrastructure diagram](./docs/UnMoquerHotelier-Infrastructure.jpg)

## Techniques

- Conditional Rendering
- `<ErrorBoundary />` to prevent intrusive errors
- `<Suspense />` to await data
- isLoading toggle before/after API calls
- Disabling form fields and buttons during API calls
- Destructuring
- React Query

## Component Hierarchy

TBD