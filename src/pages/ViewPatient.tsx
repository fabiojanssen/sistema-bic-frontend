import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Edit } from "lucide-react";

const ViewPatient = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Mock data - será substituído pela integração com a API
  const [patient] = useState({
    nome: "João",
    sobrenome: "Silva",
    sexo: "M",
    dataNascimento: "1990-01-01",
    foto: "",
    queixa: "Dificuldade de concentração",
    medicamento: "Nenhum",
    diagnostico: "Em avaliação",
  });

  const handleEdit = () => {
    navigate(`/patient/edit/${id}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold">Visualizar Paciente</h1>
        </div>
        <Button onClick={handleEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Paciente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <div className="p-2 bg-gray-50 rounded-md">{patient.nome}</div>
            </div>

            <div className="space-y-2">
              <Label>Sobrenome</Label>
              <div className="p-2 bg-gray-50 rounded-md">{patient.sobrenome}</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Sexo</Label>
            <div className="p-2 bg-gray-50 rounded-md">
              {patient.sexo === "M" ? "Masculino" : "Feminino"}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Data de Nascimento</Label>
            <div className="p-2 bg-gray-50 rounded-md">
              {new Date(patient.dataNascimento).toLocaleDateString()}
            </div>
          </div>

          {patient.foto && (
            <div className="space-y-2">
              <Label>Foto</Label>
              <div className="w-32 h-32 rounded-md overflow-hidden">
                <img
                  src={patient.foto}
                  alt="Foto do paciente"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Queixa</Label>
            <div className="p-2 bg-gray-50 rounded-md min-h-[60px]">
              {patient.queixa}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Medicamento</Label>
            <div className="p-2 bg-gray-50 rounded-md min-h-[60px]">
              {patient.medicamento}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Diagnóstico</Label>
            <div className="p-2 bg-gray-50 rounded-md min-h-[60px]">
              {patient.diagnostico}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewPatient;