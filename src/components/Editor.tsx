import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type EditorProps = {
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
};

export function Editor({ onChange, className, defaultValue = "" }: EditorProps) {
  const [content, setContent] = useState(defaultValue);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (content !== "") {
      timeout = setTimeout(() => {
        onChange(content);
      }, 500);
    }
    
    return () => clearTimeout(timeout);
  }, [content, onChange]);

  return (
    <div
      className={cn(
        "relative min-h-[200px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background",
        className
      )}
    >
      <div
        className="min-h-[200px] w-full resize-none p-4"
        contentEditable
        onInput={(e) => setContent(e.currentTarget.innerHTML)}
        role="textbox"
        aria-multiline="true"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}