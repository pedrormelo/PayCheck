'use client';

import { useState } from 'react';

export default function TesteConexao() {
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);

    const testarConexao = async () => {
        setCarregando(true);
        setMensagem('');

        try {
            const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teste`);
            if (!response.ok) throw new Error('Erro ao conectar com o backend.');

            const data: { mensagem: string } = await response.json();
            setMensagem(`✅ Sucesso: ${data.mensagem}`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMensagem(`❌ Erro: ${error.message}`);
            } else {
                setMensagem('❌ Erro desconhecido');
            }
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold text-center">Teste de Conexão</h1>
            <button
                onClick={testarConexao}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                disabled={carregando}
            >
                {carregando ? 'Testando...' : 'Testar Conexão'}
            </button>
            {mensagem && <p className="text-center">{mensagem}</p>}
        </div>
    );
}
