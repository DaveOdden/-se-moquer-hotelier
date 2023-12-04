# Un Moquer Hotelier

A mock hotel booking and guest management system built with the MERN stack. The idea is to continue implementing advanced concepts through out the tech stacks by building a custom content management system.

This repo is the front-end layer only.

![bookings](./docs/ui/Bookings.png)
[See More UI Screenshots](#ui-screenshots)

## Tooling List

-   [Yarn](https://yarnpkg.com/) - Package Manager
-   [Vite](https://vitejs.dev/) - Front End Build Tool
-   [React](https://react.dev/) - Front End Composition
-   [React Router](https://github.com/remix-run/react-router#readme) - SPA Router
-   [React Query](https://tanstack.com/query/v4/docs/react/overview) - Data Fetching
-   [React Testing Library](https://testing-library.com/) - React Testing
-   [Vitest](https://vitest.dev/) - Unit Testing
-   [Ant Design](https://ant.design/) - React UI Component Library
-   [Tailwind](https://tailwindcss.com/) - CSS Framework
-   [DayJS](https://day.js.org/) - Date Formatting

## API Layer & Data Storage

-   Next.js API Hosted on Vercel
-   MongoDB Atlas for data storage

![image infrastructure diagram](./docs/UnMoquerHotelier-Infrastructure.jpg)

## Techniques & Decisions

### Code Style

-   All function-based components (no class based)
    -   Functional components have a simpler syntax, no lifecycle methods, constructors or boilerplate. You can express the same logic with less characters without losing readability.
-   Avoid inline styles whenever possible.
    -   Use tailwind classes, extend tailwind theme (`tailwind.config.js`), or leverage Ant Design theme provider customizations.
-   Naming and structure should suffice in lieu of commenting in _most_ cases.
-   To achieve consistent component naming conventions, only use named component exports, no defaults.
-   Leverage React Query based custom hooks instead of accessing HTTP requests within components.

### Patterns

-   Not importing React `import React from 'react'`
    -   As of React v17, you no longer have to include dependency to transform JSX
-   Absolute Dependency Paths (`'src/'`)
-   Spread Syntax
    -   e.g. `<BookingConfirmation {...bookingDetails} />`
-   Conditional Rendering
    -   e.g. (`{ dataIsAvailable && <ComponentToShow /> }`)
-   ContextAPI
    -   Used to avoid ugly prop drilling managing New Booking modal states
-   Loading State Pattern
    -   Toggle `isLoading` state variables during processes.
    -   Disable form fields and buttons during API calls to avoid duplicate calls.
-   Destructuring with Aliasing
    -   e.g. ` const { mutate: addGuest } = useCreateGuest()`
-   Container Parent / Presentation Child Pattern (smart parent / dumb children)
    -   All core features exhibit this pattern (Overview, Bookings, Guests, Rooms, and Settings)
-   Custom Hooks
    -   Only use Higher Order Components (HOC) or Render Props when absolutely necessary.
-   `<ErrorBoundary />`
    -   Prevent intrusive errors from affecting entire app.

## Component Diagrams

### New Booking Form

![new booking form diagram](./docs/UnMoquerHotelier-NewBooking.jpg)
![new booking flow diagram](./docs/UnMoquerHotelier-NewBookingFlow.jpg)
![new booking db diagram](./docs/UnMoquerHotelier-NewBookingDBUpdates.jpg)

## Component Hierarchy

TBD

## UI Screenshots

### Guest Table

![guests](./docs/ui/Guests.png)

### Guest Detail

![guest detail](./docs/ui/GuestDetail.png)

### New Guest Form

![new guest](./docs/ui/NewGuest.png)

### Bookings Table

![bookings](./docs/ui/Bookings.png)

### Booking Detail

![booking detail](./docs/ui/BookingDetails.png)

### New Booking Form

![new booking](./docs/ui/NewBooking.png)

### Booking Confirmation

![booking confirmation](./docs/ui/BookingConfirmation.png)
