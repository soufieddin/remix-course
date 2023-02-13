import { redirect } from '@remix-run/node';
import { v4 as uuidv4 } from 'uuid';
import NewNote, {links as newNoteLinks} from "~/components/NewNote";
import { getStoredNotes, storeNotes } from "~/data/notes";

export default function AddNotePage() {
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
    //some validation

    if(noteData.title.trim().length < 5) {
      return {message: "Title must be at least 5 characters."}
    }else if(noteData.content.trim().length < 24) {
      return {message: "content must be at least 24 characters."}
    }
    const existingNotes = await getStoredNotes();
    noteData.id = uuidv4();
    noteData.createdAt = new Date().toISOString();
    const updatedNotes = existingNotes.concat(noteData);
    await storeNotes(updatedNotes);
    return redirect("/notes")
}

export function links() {
    return [...newNoteLinks()];
  }