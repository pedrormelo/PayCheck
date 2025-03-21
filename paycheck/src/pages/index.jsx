// src/pages/index.jsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// src/index.jsx
import './tailwind.css';  // Certifique-se de importar o arquivo CSS

// Importe outros componentes conforme necessário

export default function IndexSearch() {
  const tableHeaders = [
    { id: "id", label: "ID" },
    { id: "empresa", label: "EMPRESA" },
    { id: "competencia", label: "COMPETÊNCIA" },
    { id: "situacao", label: "SITUAÇÃO" },
    { id: "dataVen", label: "DATA VEN" },
    { id: "dataRen", label: "DATA REN" },
    { id: "valor", label: "VALOR" },
  ];

  return (
    <div className="bg-white flex flex-col justify-between min-h-screen">
      {/* Header Navigation */}
      <header className="flex items-center justify-center h-[67px] bg-[#0e0e0e] text-white">
        <div className="flex items-center gap-[45px]">
          <div className="font-medium text-2xl leading-9">STOCK</div>
          <Separator orientation="vertical" className="h-9 bg-white/50" />
          <div className="font-medium text-2xl leading-9">SysTab</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative">
        {/* Logo placeholder - replace with actual logo */}
        <div className="mb-16 text-4xl font-bold">PayCheck!</div>

        {/* Search Bar */}
        <div className="w-[1000px] mb-2">
          <div className="flex items-center gap-[23px] px-[41px] py-[13px] bg-[#0e0e0e] rounded-[52px_52px_24px_24px]">
            <div className="flex-1 border-b border-[#979797]">
              <Input
                className="bg-transparent border-none text-[26px] text-[#979797] font-light placeholder:text-[#979797] focus-visible:ring-0 px-0"
                placeholder="buscar ID ou nome do contrato..."
              />
            </div>

            <Select>
              <SelectTrigger className="w-[172px] h-[39px] bg-[#d9d9d9] rounded-[28px] text-black border-none">
                <SelectValue
                  placeholder="situação"
                  className="font-medium text-2xl"
                />
                <ChevronDown className="h-3 w-6" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
              </SelectContent>
            </Select>

            <Separator orientation="vertical" className="h-9 bg-white/50" />

            <Select>
              <SelectTrigger className="w-[254px] h-[39px] bg-[#d9d9d9] rounded-[28px] text-black border-none">
                <SelectValue
                  placeholder="competência"
                  className="font-medium text-2xl"
                />
                <ChevronDown className="h-3 w-6" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="finance">Financeira</SelectItem>
                <SelectItem value="tech">Tecnologia</SelectItem>
                <SelectItem value="admin">Administrativa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="w-[1008px] bg-gray-200 rounded-b-md overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-300">
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-center font-medium"
                  >
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="h-[400px]">
              {/* Table data goes here */}
            </TableBody>
          </Table>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-24 right-[460px] flex gap-2">
          <Button
            size="icon"
            className="rounded-full bg-black text-white h-12 w-12"
          >
            <Plus className="h-6 w-6" />
          </Button>
          <Button
            size="icon"
            className="rounded-full bg-black text-white h-12 w-12 px-8"
          >
            <Search className="h-6 w-6" />
          </Button>
        </div>

        {/* QR Code placeholder */}
        <div className="absolute bottom-12 right-12 h-[91px] w-[91px] bg-gray-200 rounded-md flex items-center justify-center">
          <div className="h-16 w-16 border-2 border-black grid grid-cols-4 grid-rows-4">
            {/* QR Code representation */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-10 bg-[#0e0e0e] text-white flex items-center justify-center text-sm">
        <p className="font-medium">
          Gerenciador de Contratos do GETI da Sec. de Saúde - Jaboatão dos
          Guararapes - Março de 2025 - Ver: 0.1.0
        </p>
      </footer>
    </div>
  );
}
