const express = require("express");
const app = express();
const connectDB = require("./config/db");
const Notes = require("./models/Note");

connectDB();

app.listen(3000, () => console.log("Server running on port 3000"));

app.use(express.json());

// CREATE - Add new note
app.post("/notes", async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Notes.create({ title, content });
    res.status(201).json(note);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Failed to create note");
  }
});

// READ - Get all notes
app.get("/notes", async (req, res) => {
  try {
    const allnotes = await Notes.find();
    res.json(allnotes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Unable to get notes");
  }
});

// UPDATE - Update a note by ID
app.put("/notes/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true } // return updated note, validate fields
    );

    if (!updatedNote) {
      return res.status(404).send("Note not found");
    }

    res.json(updatedNote);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Failed to update note");
  }
});

// DELETE - Delete a note by ID
app.delete("/notes/:id", async (req, res) => {
  try {
    const deletedNote = await Notes.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).send("Note not found");
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Failed to delete note");
  }
});
