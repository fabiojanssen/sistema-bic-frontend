import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type EditorProps = {
  onChange: (value: string) => void;
  className?: string;
};

export function Editor({ onChange, className }: EditorProps) {
  const [content, setContent] = useState("");
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (content !== "") {
      timeout = setTimeout(() => {
        onChange(content);
      }, 500); // Delay de 500ms entre salvamentos
    }
    
    return () => clearTimeout(timeout);
  }, [content, onChange]);

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
  };

  const handleFormat = (format: string, value?: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    switch (format) {
      case 'bold':
        execCommand('bold');
        break;
      case 'italic':
        execCommand('italic');
        break;
      case 'underline':
        execCommand('underline');
        break;
      case 'strikethrough':
        execCommand('strikethrough');
        break;
      case 'unorderedList':
        execCommand('insertUnorderedList');
        break;
      case 'orderedList':
        execCommand('insertOrderedList');
        break;
      case 'highlight':
        execCommand('backColor', 'yellow');
        break;
      case 'color':
        execCommand('foreColor', value);
        break;
      case 'heading':
        execCommand('formatBlock', '<h2>');
        break;
      case 'clearFormat':
        execCommand('removeFormat');
        break;
    }
  };

  return (
    <div
      className={cn(
        "relative min-h-[500px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background",
        className
      )}
    >
      <div
        className="min-h-[500px] w-full resize-none"
        contentEditable
        onInput={(e) => setContent(e.currentTarget.innerHTML)}
        role="textbox"
        aria-multiline="true"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}