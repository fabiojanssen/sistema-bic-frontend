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

const AssessmentResults = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState("");
  
  const handleContentChange = async (value: string) => {
    setContent(value);
    setIsSaving(true);
    
    try {
      // Simular chamada à API com delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Aqui você implementaria a chamada real à API
      console.log("Conteúdo salvo:", value);
    } finally {
      setIsSaving(false);
    }
  };

  const EditorToolbar = () => (
    <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-t-lg border-b">
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="mx-1 h-6" />
      <Toggle aria-label="Toggle bullet list">
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle numbered list">
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="mx-1 h-6" />
      <Toggle aria-label="Toggle highlight">
        <Highlighter className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle text color">
        <Palette className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle strikethrough">
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle heading">
        <Heading className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Clear formatting">
        <X className="h-4 w-4" />
      </Toggle>
    </div>
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