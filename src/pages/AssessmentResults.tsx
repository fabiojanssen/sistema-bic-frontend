import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Editor } from "@/components/Editor";
import { Loader2 } from "lucide-react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Highlighter,
  Palette,
  Strikethrough,
  Heading,
  X
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const COLORS = [
  { name: 'Preto', value: '#000000' },
  { name: 'Cinza Escuro', value: '#4A4A4A' },
  { name: 'Cinza', value: '#757575' },
  { name: 'Vermelho', value: '#FF0000' },
  { name: 'Azul', value: '#0000FF' },
  { name: 'Verde', value: '#008000' },
  { name: 'Roxo', value: '#800080' },
  { name: 'Laranja', value: '#FFA500' },
  { name: 'Marrom', value: '#8B4513' },
  { name: 'Rosa', value: '#FF69B4' },
];

const AssessmentResults = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState("");
  
  const handleContentChange = async (value: string) => {
    setContent(value);
    setIsSaving(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Conteúdo salvo:", value);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFormat = (format: string, value?: string) => {
    const editorElement = document.querySelector('[role="textbox"]') as HTMLElement | null;
    if (!editorElement) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    document.execCommand(format, false, value);
    editorElement.focus();
  };

  const EditorToolbar = () => (
    <TooltipProvider>
      <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-t-lg border-b">
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle 
              aria-label="Negrito" 
              onPressedChange={() => handleFormat('bold')}
            >
              <Bold className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Negrito</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle 
              aria-label="Itálico"
              onPressedChange={() => handleFormat('italic')}
            >
              <Italic className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Itálico</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle 
              aria-label="Sublinhado"
              onPressedChange={() => handleFormat('underline')}
            >
              <Underline className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sublinhado</p>
          </TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle 
              aria-label="Lista com marcadores"
              onPressedChange={() => handleFormat('insertUnorderedList')}
            >
              <List className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Lista com marcadores</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle 
              aria-label="Lista numerada"
              onPressedChange={() => handleFormat('insertOrderedList')}
            >
              <ListOrdered className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Lista numerada</p>
          </TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle 
              aria-label="Destacar texto"
              onPressedChange={() => handleFormat('backColor', 'yellow')}
            >
              <Highlighter className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Destacar texto</p>
          </TooltipContent>
        </Tooltip>

        <Popover>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Toggle aria-label="Cor do texto">
                  <Palette className="h-4 w-4" />
                </Toggle>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cor do texto</p>
            </TooltipContent>
          </Tooltip>
          <PopoverContent className="w-64">
            <div className="grid grid-cols-5 gap-2">
              {COLORS.map((color) => (
                <button
                  key={color.value}
                  className="w-8 h-8 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleFormat('foreColor', color.value)}
                  title={color.name}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle 
              aria-label="Texto tachado"
              onPressedChange={() => handleFormat('strikethrough')}
            >
              <Strikethrough className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Texto tachado</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle 
              aria-label="Título"
              onPressedChange={() => handleFormat('formatBlock', '<h2>')}
            >
              <Heading className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Título</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle 
              aria-label="Limpar formatação"
              onPressedChange={() => handleFormat('removeFormat')}
            >
              <X className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Limpar formatação</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Resultados de Avaliação</h1>
            <Card>
              <CardContent className="p-0">
                <EditorToolbar />
                <div className="p-4">
                  <Editor onChange={handleContentChange} />
                  <div className="h-6 mt-4">
                    {isSaving && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Salvando
                      </div>
                    )}
                    {!isSaving && content && (
                      <p className="text-sm text-muted-foreground">Salvo</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AssessmentResults;