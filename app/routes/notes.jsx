
import { useLoaderData } from "@remix-run/react";
import NoteList, {links as noteListLinks} from "~/components/NoteList";
import { getStoredNotes } from "~/data/notes";
export default function NotesPage() {
  const notes = useLoaderData()
  return (
    <main>
      <NoteList notes={notes}/>
    </main>
  );
}

//backend (fetch notes)
export async function loader() {
  const notes = await getStoredNotes();
  return notes;
}

export function links() {
  return [...noteListLinks()];
}