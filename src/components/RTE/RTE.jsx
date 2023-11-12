import { Editor } from "@tinymce/tinymce-react";
import { useId } from "react";
import { Controller } from "react-hook-form";

const RealTimeEditor = ({ name, label, defaultValue, control }) => {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label className='inline-block mb-1 pl-1' id={id}>{label}</label>}
      {/* <Editor
        initialValue="default value"
        init={{
          branding: false,
          height: 500,
          menubar: true,
        }}
      /> */}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => {
          return (
            <Editor
              initialValue={defaultValue}
              init={{
                branding: false,
                height: 500,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
              }}
              onEditorChange={onChange}
            />
          );
        }}
      />
    </div>
  );
};

export default RealTimeEditor;
