import { configDb } from "../config/configDb";
import express from "express";
import cors from "cors";

const supabase = configDb();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/notes", async (req: any, res: any) => {
  const { data, error } = await supabase.from("notes").select("*");
  console.log(data);
  if (error) {
    res.status(400).json({ error: error.message });
  }

  res.status(200).json(data);
});

app.post("/notes", async (req: any, res: any) => {
  const content = req.body.content;

  if (!content) {
    return res.status(500).json({ error: "Empty note content!" });
  }

  const { data, error } = await supabase.from("notes").insert([{ content }]);

  if (error) {
    res.status(400).json({ error: error.message });
  }

  res.status(201).json(data);
});

app.put("/notes/:id", async (req: any, res: any) => {
  const id = req.params.id;
  const content = req.body.content;

  if (!content) {
    return res.status(500).json({ error: "Empty note content!" });
  }

  const { data, error } = await supabase
    .from("notes")
    .update({ content })
    .match({ id });

  if (error) {
    res.status(400).json({ error: error.message });
  }

  res.status(200).json(data);
});

app.delete("/notes/:id", async (req: any, res: any) => {
  const id = req.params.id;

  const { data, error } = await supabase.from("notes").delete().match({ id });

  if (error) {
    res.status(400).json({ error: error.message });
  }

  res.status(200).json(data);
});

app.listen(4000, () => {
  console.log("Server is running on port 3000");
});
