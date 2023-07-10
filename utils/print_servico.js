const PDFkitT = require('pdfkit-table');
const fs = require('fs');

module.exports.print = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const pdf = new PDFkitT();

            const option = {
                year: 'numeric',
                month: ('long' || 'short' || 'numeric'),
                weekday: ('long' || 'short'),
                day: 'numeric'
            }
            const locale = 'pt-br'
            new Date().toLocaleDateString(locale, option)

            const empresa = 'SS LAVADOR DE CAMINHÕES';
            const servicos = 'Lavagem de caminhões Completa/ Aparência – Lavagem de Baús/ Siders – Lavagem de equipamentos agrícolas – Lavagem de tanques com água quente e fria.';
            const endereco = 'Rua Guilherme Bathke, 241 ,Anexo ao posto Aventura (Centro) ';
            const endereco2 = 'Balsa Nova – PR  Cep: 83650-000';
            const contato = 'Fone: (041) 9 9941-0035 (Sidinei)';
            const titulo = 'SERVIÇOS HIGIENIZAÇÃO';
            const dadoServico = `Veículo(s) da(s) placa(s) ${data.veiculo1} ${data.veiculo2 ? 'e ' + data.veiculo2 : ''}`;
            const dadoServico2 = `Motorista: ${data.motorista}`;
            const dadoServico3 = `Ordem de Serviço: ${data.ordemServico}`;
            const dadoServico4 = `Data do Serviço: ${data.dataServico}`;
            const dadoServico5 = `Solicitante: ${data.departamento}`;

            const assinaturaCnpj = '50.659.209/0001-30';
            const assinaturaNome = 'SS LAVADOR DE CAMINHÕES';
            const assinaturaEndereco = 'Rua Guilherme Bathke, 241 ,Anexo ao posto Aventura (Centro) ';
            const assinaturaEndereco2 = 'Balsa Nova – PR  Cep: 83650-000';

            pdf.text().fontSize(16);
            pdf.text(empresa, {
                width: 480,
                align: 'center'
            });

            pdf.moveDown();
            pdf.text().fontSize(12);
            pdf.text(servicos, {
                width: 480,
                align: 'center'
            });

            pdf.moveDown();
            pdf.text(endereco, {
                width: 480,
                align: 'left'
            });

            pdf.text(endereco2, {
                width: 480,
                align: 'left'
            });

            pdf.text(contato, {
                width: 480,
                align: 'left'
            });

            pdf.moveDown();
            pdf.text(titulo, {
                width: 480,
                align: 'center',
                underline: true
            });

            pdf.moveDown();
            pdf.text(dadoServico, {
                width: 480,
                align: 'left'
            });

            pdf.text(dadoServico2, {
                width: 480,
                align: 'left'
            });

            pdf.text(dadoServico3, {
                width: 480,
                align: 'left'
            });

            pdf.text(dadoServico4, {
                width: 480,
                align: 'left'
            });

            pdf.text(dadoServico5, {
                width: 480,
                align: 'left'
            });

            pdf.moveDown();
            await desenhaTable(pdf, data.produtos);

            pdf.moveDown();
            pdf.text().fontSize(8);
            pdf.text(assinaturaCnpj, {
                width: 480,
                align: 'right'
            });
            pdf.text(assinaturaNome, {
                width: 480,
                align: 'right'
            });
            pdf.text(assinaturaEndereco, {
                width: 480,
                align: 'right'
            });
            pdf.text(assinaturaEndereco2, {
                width: 480,
                align: 'right'
            });

            pdf.pipe(fs.createWriteStream('output.pdf'));
            pdf.end();

            resolve('OK')
        } catch (error) {
            reject(error.message)
        }
    })
}

async function desenhaTable(doc, itens) {
    let rows = [];
    let row = [];
    let valorTotal = 0;
    let cont = 1;

    for (const item of itens) {
        
        row = [];
        row.push("#"+cont);
        row.push(item.descricao);
        row.push(item.quantidade);
        row.push(item.valorTotal);
        rows.push(row);
        valorTotal += Number(item.valorTotal);
        cont ++;
    }

    rows.push([`#${cont++}`,'','','']);
    rows.push([`#${cont++}`,'','','']);
    rows.push([`#${cont++}`,'','','']);
    rows.push([`#${cont++}`,'','','']);
    rows.push(['','','Total:', valorTotal]);    

    const table = {
        headers: ["#","Descrição do Serviço", "Quantidade", "Valor Total"],

        rows: rows,
    };
    // or columnsSize
    await doc.table(table, {
        columnsSize: [20, 280, 100, 80],
    });
};
