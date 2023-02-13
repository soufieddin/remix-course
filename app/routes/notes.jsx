import { redirect } from '@remix-run/node';
import { v4 as uuidv4 } from 'uuid';
import NewNote, {links as NewNoteLinks} from "~/components/NewNote";
import { getStoredNotes, storeNotes } from "~/data/notes";

export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  );
}

//backend
export async function action({request}) {
    const formData = await request.formData();
    const noteData =Object.fromEntries(formData);
    const existingNotes = await getStoredNotes();
    noteData.id = uuidv4();
    const updatedNotes = existingNotes.concat(noteData);
    await storeNotes(updatedNotes);
    return redirect("/notes")
}

export function links() {
    return [...NewNoteLinks()];
  }