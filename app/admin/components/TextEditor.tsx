'use client';

import { useRef } from 'react';

interface TextEditorProps {
  defaultValue?: string;
}

export default function TextEditor({ defaultValue = '' }: TextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Hàm hỗ trợ chèn thẻ định dạng vào đoạn văn bản đang được bôi đen
  const insertFormat = (startTag: string, endTag: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const replacement = `${startTag}${selectedText || 'Văn bản'}${endTag}`;

    textarea.setRangeText(replacement, start, end, 'select');
    textarea.focus();
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Thanh công cụ Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-gray-100 border-b text-sm font-medium text-gray-700">
        <button
          type="button"
          onClick={() => insertFormat('<b>', '</b>')}
          className="px-2.5 py-1 bg-white border rounded hover:bg-gray-50 font-bold"
          title="In đậm"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => insertFormat('<i>', '</i>')}
          className="px-2.5 py-1 bg-white border rounded hover:bg-gray-50 italic"
          title="In nghiêng"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => insertFormat('<span style="font-size: 20px;">', '</span>')}
          className="px-2.5 py-1 bg-white border rounded hover:bg-gray-50"
          title="Chữ lớn"
        >
          A+
        </button>
        <button
          type="button"
          onClick={() => insertFormat('<span style="font-size: 13px;">', '</span>')}
          className="px-2.5 py-1 bg-white border rounded hover:bg-gray-50"
          title="Chữ nhỏ"
        >
          A-
        </button>
      </div>

      {/* Ô nhập nội dung */}
      <textarea
        ref={textareaRef}
        id="content"
        name="content"
        rows={10}
        required
        defaultValue={defaultValue}
        placeholder="Viết nội dung bài viết..."
        className="w-full p-4 focus:outline-none text-gray-900 leading-relaxed"
      ></textarea>
    </div>
  );
}