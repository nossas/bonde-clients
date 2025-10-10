import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast
} from 'bonde-components/chakra';

type CsvRow = {
  email: string;
  subject: string;
  body: string;
  [key: string]: string;
};

type Props = {
  onDataChange: (data: CsvRow[]) => void;
  currentData?: CsvRow[];
};

const parseCSV = (text: string): any[] => {
  const lines = text.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const rows: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',').map(v => v.trim());
    const row: any = {};

    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    if (Object.values(row).some(v => v !== '')) {
      rows.push(row);
    }
  }

  return rows;
};

const SingleShotUpload: React.FC<Props> = ({ onDataChange, currentData = [] }) => {
  const [csvData, setCsvData] = useState<CsvRow[]>(currentData);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const downloadTemplate = () => {
    const template = 'email,subject,body\nexemplo@email.com,Assunto do email,Corpo do email aqui';
    const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'template_singleshot.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const validateCsvData = (data: any[]): { valid: boolean; error?: string } => {
    if (data.length === 0) {
      return { valid: false, error: 'O arquivo CSV está vazio' };
    }

    const requiredFields = ['email', 'subject', 'body'];
    const firstRow = data[0];
    
    for (const field of requiredFields) {
      if (!firstRow.hasOwnProperty(field)) {
        return { 
          valid: false, 
          error: `Campo obrigatório "${field}" não encontrado. Use: email, subject, body` 
        };
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (!row.email || !emailRegex.test(row.email)) {
        return { 
          valid: false, 
          error: `Email inválido na linha ${i + 2}: "${row.email}"` 
        };
      }
      if (!row.subject || row.subject.trim() === '') {
        return { 
          valid: false, 
          error: `Assunto vazio na linha ${i + 2}` 
        };
      }
      if (!row.body || row.body.trim() === '') {
        return { 
          valid: false, 
          error: `Corpo do email vazio na linha ${i + 2}` 
        };
      }
    }

    return { valid: true };
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsedData = parseCSV(text);

        const validation = validateCsvData(parsedData);
        
        if (!validation.valid) {
          setError(validation.error || 'Erro ao validar CSV');
          toast({
            title: 'Erro no arquivo',
            description: validation.error,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          setIsProcessing(false);
          return;
        }

        setCsvData(parsedData as CsvRow[]);
        onDataChange(parsedData as CsvRow[]);
        
        toast({
          title: 'Sucesso!',
          description: `${parsedData.length} registro(s) carregado(s)`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setIsProcessing(false);
      } catch (error: any) {
        const errorMsg = `Erro ao processar: ${error.message}`;
        setError(errorMsg);
        toast({
          title: 'Erro',
          description: errorMsg,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setIsProcessing(false);
      }
    };

    reader.onerror = () => {
      const errorMsg = 'Erro ao ler o arquivo';
      setError(errorMsg);
      toast({
        title: 'Erro',
        description: errorMsg,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsProcessing(false);
    };

    reader.readAsText(file, 'UTF-8');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveData = () => {
    setCsvData([]);
    onDataChange([]);
    setError(null);
  };

  return (
    <Box mt={4} p={4} borderWidth={1} borderRadius="md" borderColor="gray.200">
      <VStack align="stretch" spacing={4}>
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            📤 Upload de Planilha para Disparo Único
          </Text>
          <Text fontSize="sm" color="gray.600">
            Faça upload de um arquivo CSV com os emails e mensagens personalizadas.
          </Text>
        </Box>

        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle>Formato do CSV</AlertTitle>
            <AlertDescription fontSize="sm">
              Colunas obrigatórias: <strong>email</strong>, <strong>subject</strong>, <strong>body</strong>
            </AlertDescription>
          </Box>
        </Alert>

        <HStack spacing={3}>
          <Button
            onClick={downloadTemplate}
            variant="outline"
            size="sm"
          >
            ⬇️ Baixar Template
          </Button>
          
          <Button
            onClick={() => fileInputRef.current?.click()}
            colorScheme="blue"
            isLoading={isProcessing}
            size="sm"
          >
            {csvData.length > 0 ? '🔄 Substituir' : '📁 Upload'}
          </Button>

          {csvData.length > 0 && (
            <Button
              onClick={handleRemoveData}
              variant="ghost"
              colorScheme="red"
              size="sm"
            >
              ✕ Remover
            </Button>
          )}
        </HStack>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />

        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <AlertDescription fontSize="sm">{error}</AlertDescription>
          </Alert>
        )}

        {csvData.length > 0 && (
          <Box>
            <HStack mb={2}>
              <Text fontSize="sm" fontWeight="semibold" color="green.600">
                ✓ {csvData.length} registro(s) carregado(s)
              </Text>
            </HStack>
            
            <Box maxH="300px" overflowY="auto" borderWidth={1} borderRadius="md">
              <Table size="sm" variant="striped">
                <Thead position="sticky" top={0} bg="gray.50" zIndex={1}>
                  <Tr>
                    <Th>Email</Th>
                    <Th>Assunto</Th>
                    <Th>Corpo (prévia)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {csvData.slice(0, 10).map((row, index) => (
                    <Tr key={index}>
                      <Td fontSize="xs">{row.email}</Td>
                      <Td fontSize="xs">{row.subject}</Td>
                      <Td fontSize="xs">
                        {row.body.substring(0, 50)}
                        {row.body.length > 50 ? '...' : ''}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            
            {csvData.length > 10 && (
              <Text fontSize="xs" color="gray.500" mt={2}>
                Mostrando 10 de {csvData.length} registros
              </Text>
            )}
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default SingleShotUpload;