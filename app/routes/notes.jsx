
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import NoteList, {links as noteListLinks} from "~/components/NoteList";
import { getStoredNotes } from "~/data/notes";
export default function NotesPage() {
  const notes = useLoaderData();
  return (
    <main>
      <NoteList notes={notes}/>
    </main>
  );
}

//backend (fetch notes)
export async function loader() {
  const notes = await getStoredNotes();
  if(!notes || notes.length === 0) {
    throw json({message:"Could not find any notes"},{
      status: 404,  
      statusText: "Not Found",
    });
  }
  return notes;
}

export function meta() {
  return {
    title: "My Notes",
  }
}

export function CatchBoundary() {
  const coughtResponse = useCatch();
  const msg = coughtResponse.data.message || "Data not found";

  return <main>
    <p className="info-message">{msg}<br /><Link to="/add">Add a note</Link></p>
  </main>
}
export function links() {
  return [...noteListLinks()];
}