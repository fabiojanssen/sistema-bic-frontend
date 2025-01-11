import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

const NewPatient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    sexo: "",
    dataNascimento: "",
    foto: "",
    queixa: "",
    medicamento: "",
    diagnostico: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementará a lógica de envio do formulário
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, foto: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">Novo Paciente</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sobrenome">Sobrenome</Label>
            <Input
              id="sobrenome"
              name="sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Sexo</Label>
          <RadioGroup
            onValueChange={(value) => setFormData(prev => ({ ...prev, sexo: value }))}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="M" id="sexo-m" />
              <Label htmlFor="sexo-m">Masculino</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="F" id="sexo-f" />
              <Label htmlFor="sexo-f">Feminino</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataNascimento">Data de Nascimento</Label>
          <Input
            id="dataNascimento"
            name="dataNascimento"
            type="date"
            value={formData.dataNascimento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="foto">Foto</Label>
          <Input
            id="foto"
            name="foto"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="queixa">Queixa</Label>
          <Textarea
            id="queixa"
            name="queixa"
            value={formData.queixa}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="medicamento">Medicamento</Label>
          <Textarea
            id="medicamento"
            name="medicamento"
            value={formData.medicamento}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="diagnostico">Diagnóstico</Label>
          <Textarea
            id="diagnostico"
            name="diagnostico"
            value={formData.diagnostico}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewPatient;