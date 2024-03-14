import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'


const RTE = ({name, control, label, defaultValue = ""}) => {
  return (
    <div className="w-full">
        <Controller
          name={name || "content"}
          control={control}
          render={({field: {onChange}})=>(
            <Editor
            initialValue={defaultValue}
            init={{
              initialValue:defaultValue,
              height:500,
              menubar:true,
              plugins:[
                "lists", "advlist", "autolink", "autosave", "image", "link", "media", "preview", "quickbars", "save", "searchreplace", "wordcount", "anchor"
              ],
              toolbar:"undo redo | styles | bold italic | link image | formatting | alignleft aligncenter alignright",
            }}
            onEditorChange={onChange}
            />
          )}
        />
    </div>
  )
}

export default RTE