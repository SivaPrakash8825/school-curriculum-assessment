# Next.js Project Setup

This guide explains how to set up and run a Next.js project in both development and production modes.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

## Installation

Clone the repository and install dependencies:

```sh
# Clone the repository
git clone https://github.com/SivaPrakash8825/school-curriculum-assessment.git
cd school-curriculum-assessment

# Install dependencies
npm install  # or yarn install
```

## Running in Development Mode

To start the Next.js application in development mode, run:

```sh
npm run dev  # or yarn dev
```

This starts a development server, usually accessible at `http://localhost:3000/`.

## Building for Production

To create an optimized production build, run:

```sh
npm run build  # or yarn build
```

This generates the necessary files in the `.next` directory.

## Running in Production Mode

After building the project, start the production server with:

```sh
npm run start  # or yarn start
```

By default, the server runs at `http://localhost:3000/`.
