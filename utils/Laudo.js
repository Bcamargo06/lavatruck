const PDFKit = require('pdfkit');
const fs = require('fs');

module.exports.laudoToPdf = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const pdf = new PDFKit();

            const option = {
                year: 'numeric',
                month: ('long' || 'short' || 'numeric'),
                weekday: ('long' || 'short'),
                day: 'numeric'
            }
            const locale = 'pt-br'
            new Date().toLocaleDateString( locale, option)
            
            const empresa = 'SS LAVADOR DE CAMINHÕES';
            const servicos = 'Lavagem de caminhões Completa/ Aparência – Lavagem de Baús/ Siders – Lavagem de equipamentos agrícolas – Lavagem de tanques com água quente e fria.';
            const endereco = 'Rua Guilherme Bathke, 241 ,Anexo ao posto Aventura (Centro) ';
            const endereco2 = 'Balsa Nova – PR  Cep: 83650-000';
            const contato = 'Fone: (041) 9 9941-0035 (Sidinei)';
            const titulo = 'LAUDO DE HIGIENIZAÇÃO';
            const corpo = `Declaramos que o(s) veículo(s) da(s) placa(s) ${data.veiculo1} ${data.veiculo2 ? 'e ' + data.veiculo2 : ''} foi devidamente lavado, em água quente 100° graus célsius, efetuado toda a higienização necessária e se encontra apto para o transporte de produtos.`
            const cabecalho1 = 'Serviços:';
            const cabecalho2 = `O Motorista ${data.motorista}, informa que os últimos carregamentos foram:`;
            const carga1 = `Ùltimo: ${data.carga1}`;
            const carga2 = `Penùltimo: ${data.carga2 || data.carga1}`;
            const carga3 = `Antepenùltimo: ${data.carga3 || (data.carga2 || data.carga1)}`;
            const dataAtual = `Balsa Nova ${new Date().getDate()} de ${stringMes()} de ${new Date().getFullYear()}.`;
            const motorista = `Motorista: ${data.motorista}`;
            const departamento = `Departamento: ${data.departamento}`;
            const lacre = `Lacre: ${data.lacre}`;
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
            pdf.text(corpo, {
                width: 480,
                align: 'left'
            });

            pdf.moveDown();
            pdf.text(cabecalho1, {
                width: 480,
                align: 'left'
            });
            for (let idxProduto = 0; idxProduto < data.produtos.length; idxProduto++) {
                let produto = data.produtos[idxProduto];
                
                let gridProduto = `${idxProduto + 1} - ${produto.descricao}`;
                
                pdf.text(gridProduto, {
                    width: 480,
                    align: 'left'
                });
            }

            pdf.moveDown();
            pdf.text(cabecalho2, {
                width: 480,
                align: 'left'
            });
            pdf.text(carga1, {
                width: 480,
                align: 'left'
            });
            pdf.text(carga2, {
                width: 480,
                align: 'left'
            });
            pdf.text(carga3, {
                width: 480,
                align: 'left'
            });
            
            pdf.moveDown();
            pdf.text(dataAtual, {
                width: 480,
                align: 'left'
            });
            pdf.text(motorista, {
                width: 480,
                align: 'left'
            });
            pdf.text(departamento, {
                width: 480,
                align: 'left'
            });
            pdf.text(lacre, {
                width: 480,
                align: 'left'
            })

            pdf.moveDown();
            pdf.moveDown();
            pdf.moveDown();
            pdf.moveDown();
            pdf.moveDown();
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

function stringMes() {
    return ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][new Date().getMonth()];
}
