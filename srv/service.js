const cds = require('@sap/cds');

module.exports = cds.service.impl(async function (){
    const { pessoa } = this.entities;
    const db = await cds.connect.to('db');

    // Validação comum para CREATE e UPDATE
    function validatePessoa(data, req){
        const { nome, idade, cpf } = data;

        if (!nome || nome.trim() === "") {
            req.error(400, "O nome não pode ser vazio!");
        }

        if (parseInt(idade) == 0) {
            req.error(400, "A idade deve ser maior que zero!")
        }

        const cpfStr = String(cpf).replace(/\D/g, "");

        if (cpfStr.length !== 11) {
            req.error(400, "O CPF deve conter 11 dígitos numéricos.");
        }
    }

    // CREATE 
    this.before('CREATE', 'pessoa', async (req) => {
        validatePessoa(req.data, req);

        // Verifica se o CPF já existe
        const exists = await SELECT.from(pessoa).where({ cpf: req.data.cpf });
        if (exists.length > 0) {
            req.error(400, "CPF já cadastrado!");
        }
    });

    // READ 
    this.on('READ', 'pessoa', async (req) => {
        try{
            const results = await SELECT.from(pessoa);
            return results;
        } catch (error) {
            req.error(500, "Erro ao ler dados: " + error.message);
        }
    });

    // UPDATE
    this.before('UPDATE', 'pessoa', (req) => {
        validatePessoa(req.data, req);
    });

    // DELETE
    this.before('DELETE', 'pessoa', async (req) => {
        const cpf = req.data.cpf;
        if(!cpf) {
            req.error(400, "CPF é necessário para deletar o registro!");
        }
    })
});
