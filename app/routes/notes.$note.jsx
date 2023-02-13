import { Link, useLoaderData } from "@remix-run/react";
import noteStyles from "~/styles/note-details.css";
import { getStoredNotes } from "~/data/notes";
import { json } from "@remix-run/node";

export default function NotePage() {
    const selectedNote = useLoaderData();
    return <main id="note-details">
        <header>
            <nav>
                <Link to="/notes">Back to all Notes</Link>
            </nav>
            <h1>{selectedNote.title}</h1>
            <span className="time">
                <time dateTime={selectedNote.createdAt}>
                    {new Date(selectedNote.createdAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                    </time>
            </span>
        </header>
        <p id="note-details-content">{selectedNote.content}</p>
    </main>
}

export async function loader ({ params }) {
    const allNotes = await getStoredNotes();
    const noteId = params.note;
    const selectedNote = allNotes.find(note => note.id === noteId)
    if(!selectedNote) {
        throw json({message:"couldn't find note with id \n" + noteId},{
            status: 404,
        })
    }
    return selectedNote;
}
export function links() {
    return [{rel:"stylesheet", href: noteStyles}];
  }