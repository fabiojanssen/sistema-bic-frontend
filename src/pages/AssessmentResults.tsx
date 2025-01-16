import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Editor } from "@/components/Editor";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  {
    id: "academic",
    title: "HABILIDADES ACADÊMICAS",
    content: "O paciente demonstra bom desenvolvimento nas habilidades de leitura e escrita, com capacidade adequada de compreensão textual. Apresenta facilidade em matemática básica, embora necessite de suporte em operações mais complexas.",
    color: "bg-purple-100",
    span: 1,
    row: 1
  },
  {
    id: "cognitive",
    title: "RASTREIO COGNITIVO",
    content: "Demonstra boa capacidade de atenção sustentada e memória de trabalho. Funções executivas preservadas, com adequado planejamento e organização de tarefas.",
    color: "bg-purple-100",
    span: 1,
    row: 1
  },
  {
    id: "language",
    title: "HABILIDADES DE LINGUAGEM",
    content: "Apresenta boa expressão verbal, vocabulário adequado para idade. Compreensão preservada de comandos complexos. Narrativa coerente e organizada.",
    color: "bg-purple-100",
    span: 1,
    row: 1
  },
  {
    id: "anamnesis",
    title: "DADOS DA ANAMNESE",
    content: "Histórico familiar significativo para questões de desenvolvimento. Gestação e parto sem intercorrências. Desenvolvimento neuropsicomotor dentro dos marcos esperados.",
    color: "bg-indigo-100",
    span: 3,
    row: 2
  },
  {
    id: "complementary",
    title: "CHECKLIST COMPLEMENTARES",
    content: "Realizados testes padronizados com resultados dentro da média esperada para idade. Necessidade de acompanhamento específico em algumas áreas.",
    color: "bg-violet-100",
    span: 1,
    row: 3
  },
  {
    id: "school",
    title: "ENTREVISTA ESCOLAR",
    content: "Escola relata bom desempenho acadêmico. Socialização adequada com pares. Participação ativa em atividades propostas.",
    color: "bg-violet-100",
    span: 1,
    row: 3
  },
  {
    id: "multidisciplinary",
    title: "RELATÓRIO MULTIDISCIPLINAR",
    content: "Avaliação conjunta com equipe multidisciplinar indica necessidade de intervenção fonoaudiológica e acompanhamento psicopedagógico.",
    color: "bg-violet-100",
    span: 1,
    row: 3
  },
  {
    id: "additional",
    title: "INFORMAÇÕES ADICIONAIS",
    content: "Família demonstra boa adesão às orientações. Necessidade de reavaliação em 6 meses para acompanhamento da evolução.",
    color: "bg-fuchsia-100",
    span: 3,
    row: 4
  }
];

const AssessmentResults = () => {
  const [editingSections, setEditingSections] = useState<Record<string, boolean>>({});
  const [savingStates, setSavingStates] = useState<Record<string, boolean>>({});

  const handleContentChange = async (sectionId: string, value: string) => {
    setSavingStates(prev => ({ ...prev, [sectionId]: true }));
    setEditingSections(prev => ({ ...prev, [sectionId]: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Conteúdo salvo para seção ${sectionId}:`, value);
    } finally {
      setSavingStates(prev => ({ ...prev, [sectionId]: false }));
      setEditingSections(prev => ({ ...prev, [sectionId]: false }));
    }
  };

  const renderSectionsByRow = (rowNumber: number) => {
    return sections
      .filter(section => section.row === rowNumber)
      .map((section) => (
        <Card 
          key={section.id} 
          className={cn(
            "shadow-sm", 
            section.color,
            section.span === 3 ? "col-span-3" : "col-span-1"
          )}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Editor
              defaultValue={section.content}
              onChange={(value) => handleContentChange(section.id, value)}
            />
            <div className="h-6 mt-2">
              {savingStates[section.id] && editingSections[section.id] && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Resultados de Avaliação</h1>
            <div className="grid grid-cols-3 gap-4">
              {renderSectionsByRow(1)}
              {renderSectionsByRow(2)}
              {renderSectionsByRow(3)}
              {renderSectionsByRow(4)}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AssessmentResults;