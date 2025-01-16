import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Bold, Italic, Underline } from "lucide-react";
import { Button } from "./ui/button";

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

  const handleFormat = (command: string) => {
    document.execCommand(command, false);
  };

  return (
    <div
      className={cn(
        "relative min-h-[200px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background",
        className
      )}
    >
      <div className="flex gap-2 mb-2 border-b pb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleFormat("bold")}
          type="button"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleFormat("italic")}
          type="button"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleFormat("underline")}
          type="button"
        >
          <Underline className="h-4 w-4" />
        </Button>
      </div>
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