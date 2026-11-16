'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Bold, Italic, Link2, List, Quote, ListOrdered } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (htmlContent: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange }) => {
  // Initialize the Tiptap editor engine
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-orange-500 underline cursor-pointer',
        },
      }),
    ],
    content: content,
    // Sync the local state changes back up to the parent form component
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[350px] p-4 text-xs text-gray-700 leading-relaxed max-h-[500px] overflow-y-auto',
      },
    },
  });

  if (!editor) {
    return <div className="p-4 text-xs text-gray-400">Loading Text Editor Engine...</div>;
  }

  // Helper function to handle link prompt insertions
  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL Link address:', previousUrl);
    
    if (url === null) return; // Cancelled
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
      {/* 1. Functional Formatting Action Bar Toolbar */}
      <div className="bg-gray-50/70 border-b border-gray-100 px-4 py-2 flex items-center gap-1.5 select-none">
        
        {/* Bold Button */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('bold') ? 'bg-orange-100 text-orange-600' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <Bold size={14} />
        </button>

        {/* Italic Button */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('italic') ? 'bg-orange-100 text-orange-600' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <Italic size={14} />
        </button>

        <span className="w-px h-4 bg-gray-200 mx-1" />

        {/* Link Button */}
        <button
          type="button"
          onClick={setLink}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('link') ? 'bg-orange-100 text-orange-600' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <Link2 size={14} />
        </button>

        {/* Bullet List Button */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('bulletList') ? 'bg-orange-100 text-orange-600' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <List size={14} />
        </button>

        {/* Ordered List Button */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('orderedList') ? 'bg-orange-100 text-orange-600' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <ListOrdered size={14} />
        </button>

        {/* Blockquote Button */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('blockquote') ? 'bg-orange-100 text-orange-600' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <Quote size={14} />
        </button>
      </div>

      {/* 2. Interactive Text Input Target Area */}
      <EditorContent editor={editor} />
    </div>
  );
};
