import { RichTextEditor } from "@mantine/rte";

function TextEditor({ value, setFormProgram, formProgram }) {
  //   console.log(onChange);
  const upload = <input type={"file"} />;
  return (
    <>
      <label>
        <input />
        <RichTextEditor
          value={value}
          onChange={(e) => setFormProgram({ ...formProgram, description: e })}
          id="rte"
          controls={[["unorderedList", "h1", "h2", "h3", "h4"], ["bold", "italic", "underline"], ["sup", "sub"], ["alignLeft", "alignCenter", "alignRight"], ["video"]]}
          className="text-[#374151] static"
        />
      </label>
    </>
  );
}

export default TextEditor;
