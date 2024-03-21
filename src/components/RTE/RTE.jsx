import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import conf from '../../conf/conf'

const RTE = ({name, control, label, defaultValue = ""}) => {
  return (
    <div className="w-full">
        <Controller
          name={name || "content"}
          control={control}
          render={({field: {onChange}})=>(
            <Editor
            apiKey="eqovi6xcr4x5k576ay3116wgocc9y4d3xpvyasybaxwnm4kg"
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