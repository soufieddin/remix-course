import { Link } from "@remix-run/react";
import noteStyles from "~/styles/note-details.css";

export default function NotePage() {
    return <main id="note-details">
        <header>
            <nav>
                <Link to="/notes">Back to all Notes</Link>
            </nav>
            <h1>Note Title</h1>
        </header>
        <p id="note-details-content">Note Content</p>
    </main>
}

export function links() {
    return [{rel:"stylesheet", href: noteStyles}];
  }