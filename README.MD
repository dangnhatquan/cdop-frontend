# CDOP Frontend

This is the frontend application for CDOP project, built with Next.js 14, TypeScript, and various modern web technologies.

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (version 18.x or later)
- npm (comes with Node.js) or yarn
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/dangnhatquan/cdop-frontend.git
cd cdop-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add necessary environment variables. You can use `.env.example` as a template if it exists.

### 4. Development Server

Run the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run check:types` - Run TypeScript type checking
- `npm test` - Run tests
- `npm run e2e` - Run end-to-end tests with Playwright

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── [locale]/       # Internationalization routes
│   ├── api/            # API routes
│   └── ...
├── components/         # Reusable components
├── lib/               # Core utilities
├── libs/              # External service integrations
├── locales/           # Translation files
├── models/            # Data models
├── styles/            # Global styles
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Features

- 🌐 Internationalization (i18n) support
- 📊 Analytics integration with PostHog
- 🔐 Authentication system
- 🎨 Customizable UI components
- ✅ Comprehensive testing setup
- 🚀 TypeScript for type safety

## Development Guidelines

1. Follow the TypeScript conventions and ensure proper typing
2. Write tests for new features
3. Use the component library for consistent UI
4. Follow the established folder structure
5. Use the internationalization system for all user-facing text

## Testing

The project includes:

- Unit tests
- Integration tests
- E2E tests with Playwright
- Visual regression tests

Run the full test suite:

```bash
npm test        # Unit and integration tests
npm run e2e     # E2E tests
```

## Deployment

The project can be deployed to various platforms. Build the production version:

```bash
npm run build
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests
4. Create a pull request

## Support

For any questions or issues, please create an issue in the repository.

## License

See the [LICENSE](LICENSE) file for details.
