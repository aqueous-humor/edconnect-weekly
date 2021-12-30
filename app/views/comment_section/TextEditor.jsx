import React, { useState, useEffect } from 'react';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false; //a way around broken ssr https://github.com/zenoamaro/react-quill/issues/122#issuecomment-560192943
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ editorValue, setEditorValue, }) => {
  return (
    <ReactQuill
      className='bg-light'
      theme="snow"
      value={editorValue}
      onChange={setEditorValue}
    />
  )
}

export default TextEditor;