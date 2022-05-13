import React from "react";
import { Editor } from "react-draft-wysiwyg";
import styles from "./styles/style.module.css";
const Description = (props) => {
  const { editorState, setEditorState } = props;
  return (
    <Editor
      className={styles.description_text}
      editorState={editorState}
      editorClassName="editor-class"
      onEditorStateChange={setEditorState}
      placeholder="Mô tả về giải đấu"
      mention={{
        separator: " ",
        trigger: "@",
        suggestions: [
          { text: "APPLE", value: "apple", url: "apple" },
          { text: "BANANA", value: "banana", url: "banana" },
          { text: "CHERRY", value: "cherry", url: "cherry" },
          { text: "DURIAN", value: "durian", url: "durian" },
          {
            text: "EGGFRUIT",
            value: "eggfruit",
            url: "eggfruit",
          },
          { text: "FIG", value: "fig", url: "fig" },
          {
            text: "GRAPEFRUIT",
            value: "grapefruit",
            url: "grapefruit",
          },
          {
            text: "HONEYDEW",
            value: "honeydew",
            url: "honeydew",
          },
        ],
      }}
    />
  );
};

export default Description;
