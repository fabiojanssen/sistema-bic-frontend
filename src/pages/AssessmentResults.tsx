import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Editor } from "@/components/Editor";
import { Loader2 } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Resultados de Avaliação</h1>
            <Card>
              <CardContent className="pt-6">
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
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AssessmentResults;