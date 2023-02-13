import NewNote, {links as NewNoteLinks} from "~/components/NewNote";

export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  );
}

export function links() {
    return [...NewNoteLinks()];
  }