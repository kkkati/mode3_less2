const fs = require("fs/promises");
const path = require("path");
// const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNote();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  //   console.log(chalk.green("Note was add"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log("Here is the list of notes:");
  notes.forEach((note) => {
    console.log(`${note.id} ${note.title}`);
  });
}

async function removeNote(elemId) {
  const notes = await getNotes();
  const removeNode = notes.indexOf(notes.find((note) => note.id === elemId));

  notes.splice(removeNode, 1);

  await fs.writeFile(notesPath, JSON.stringify(notes));
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
};
