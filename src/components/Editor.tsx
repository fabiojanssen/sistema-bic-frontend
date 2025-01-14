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
      }, 500);
    }
    
    return () => clearTimeout(timeout);
  }, [content, onChange]);

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
        onInput={(e) => setContent(e.currentTarget.textContent || "")}
        role="textbox"
        aria-multiline="true"
      />
    </div>
  );
}