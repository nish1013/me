# me

Source of [satharasinghe.com](https://satharasinghe.com): a personal site and portfolio. It shows recent
GitHub work, technical writing and live demos.

![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=black) ![Gatsby](https://img.shields.io/badge/Gatsby-5-663399?logo=gatsby&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06b6d4?logo=tailwindcss&logoColor=white)

## Tech stack

| Layer       | Technology                 | Role                                             |
| ----------- | -------------------------- | ------------------------------------------------ |
| Language    | TypeScript                 | Types for components, data and utilities.        |
| UI          | React 18, react-spring     | Components and hero animations.                  |
| Framework   | Gatsby 5                   | Builds every page to static HTML.                |
| Content     | WordPress with WPGraphQL   | Headless CMS for blog and journey posts.         |
| Styling     | Tailwind CSS 3, PostCSS    | Utility classes and the theme.                   |
| Images      | gatsby-plugin-image, sharp | Responsive, lazy-loaded images at build time.    |
| Code blocks | Prism.js                   | Syntax highlighting in posts.                    |
| Live data   | GitHub REST API            | Recent public repositories, read in the browser. |
| Tests       | Node.js test runner        | Unit tests for the GitHub data logic.            |
| Hosting     | Netlify                    | Builds and serves the site from `main`.          |

## Architecture

The build reads all content from WordPress. Recent GitHub work loads in the browser, so a new
repository shows without a rebuild.

```
              build time                              view time
WordPress ──(WPGraphQL)──▶ Gatsby ──▶ static HTML ──▶ browser ◀── GitHub REST API
                                       on Netlify               (recent repositories)
```

| Route                                       | Source                                                         |
| ------------------------------------------- | -------------------------------------------------------------- |
| `/`                                         | Hero, recent GitHub work, stack, writing, playground.          |
| `/portfolio/`                               | Recent repositories with their trade-offs, and live demos.     |
| `/blog/`, `/journey/`                       | WordPress posts, split by tag.                                 |
| `/<post-uri>/`                              | One page per WordPress post or page, made in `gatsby-node.js`. |
| `/about/`, `/certifications/`, `/podcasts/` | Static content from `src/data` and components.                 |

## Recent GitHub work

The home and Work pages list public repositories with a push in the last 30 days.

- A fixed showcase order and one trade-off line per repository live in `src/components/github/data.ts`.
- Forks, archived repositories and the excluded names do not show.
- The section holds its final size while it loads, so the page does not move during a scroll.

## Getting started

Local development needs Node.js 22. The production build runs on the version in `.nvmrc`.

```sh
npm ci
npm run develop   # http://localhost:8000
```

| Variable         | Use                                       |
| ---------------- | ----------------------------------------- |
| `CMS_URL`        | WPGraphQL endpoint of the WordPress site. |
| `TECH_TAG`       | WordPress tag that marks technical posts. |
| `GA_TRACKING_ID` | Google Analytics measurement ID.          |

The build reads `.env.<NODE_ENV>`: `.env.development` for `develop`, `.env.production` for `build`.

## Scripts

| Command             | Does                                         |
| ------------------- | -------------------------------------------- |
| `npm run develop`   | Starts the dev server with hot reload.       |
| `npm run build`     | Builds the static site into `public/`.       |
| `npm run serve`     | Serves the built site.                       |
| `npm run clean`     | Removes the Gatsby cache and `public/`.      |
| `npm run typecheck` | Runs the TypeScript compiler with no output. |
| `npm test`          | Runs the unit tests.                         |
| `npm run format`    | Formats all files with Prettier.             |

## Project structure

```
src/
  components/   UI by feature: launch (home), github, portfolio, blog, layout, theme
  data/         Navigation and profile data
  pages/        One file per static route
  templates/    WordPress post and page templates
  styles/       Global and blog styles
gatsby-node.js  Creates a page for each WordPress post and page
gatsby-config.ts
netlify.toml    Build command and publish folder
```

## Licence

[MIT](LICENSE)
