import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import MainNavigation from "~/components/MainNavigation";
import styles from '~/styles/main.css';

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MainNavigation />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const coughtResponse = useCatch();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>{coughtResponse.statusText}</title>
      </head>
      <header>
        <MainNavigation />
      </header>
      <body>
        <main className="error">
          <h1>{coughtResponse.statusText}</h1>
          <p>{coughtResponse.data?.message || "Something went wrong!"}</p>
          <p>Back to <Link to="/">safty</Link></p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({error}) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>An error occurred! </title>
      </head>
      <header>
        <MainNavigation />
      </header>
      <body>
        <main className="error">
          <h1>An error occurred!</h1>
          <p>{error.message}</p>
          <p>Back to <Link to="/">safty</Link></p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}
