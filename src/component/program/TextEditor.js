import { RichTextEditor } from "@mantine/rte";

function TextEditor({ value, setFormProgram, formProgram }) {
  //   console.log(onChange);
  return (
    <RichTextEditor
      value={value}
      onChange={(e) => setFormProgram({ ...formProgram, description: e })}
      id="rte"
      controls={[
        ["unorderedList", "h1", "h2", "h3", "h4"],
        ["bold", "italic", "underline"],
        ["sup", "sub"],
        ["alignLeft", "alignCenter", "alignRight"],
      ]}
      className="text-[#374151] static"
    />
  );
}

export default TextEditor;
