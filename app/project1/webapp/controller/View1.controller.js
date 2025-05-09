sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller, MessageToast, MessageBox) => {
    "use strict";

    return Controller.extend("firstapp.project1.controller.View1", {
        onInit() {
            const oFormModel = new sap.ui.model.json.JSONModel({
                nome: "",
                cpf: "",
                idade: ""
            });
            this.getView().setModel(oFormModel, "formModel");
        },

        onNavButton: function() {
            this.getOwnerComponent().getRouter().navTo("View2");
            
        },

        // Validação em tempo real.
        onNomeLiveChange: function(oEvent) {
            const oInput = oEvent.getSource();
            let nome = oInput.getValue();

            // Remove caracteres não permitidos (mantem apenas letras e espaços).
            nome = nome.replace(/[^A-Za-zÀ-ÿ\s]/g, "");

            // Atualiza o valor se houver alteração
            if(nome !== oInput.getValue()) {
                oInput.setValue(nome);
            }

            // Validação básica em tempo de execução
            if(!nome || nome.trim() === "") {
                oInput.setValueState("Error");
                oInput.setValueStateText("O nome não pode estar vazio!");
            }else if(nome.length < 3) {
                oInput.setValueState("Warning");
                oInput.setValueStateText("O nome deve conter mais de 3 letras!");
            }else {
                oInput.setValueState("None");
                oInput.setValueStateText("");
            }
        },

        // Validação completa (ao sair do campo)
        onNomeChange: function(oEvent) {
            try {
                const oInput = oEvent.getSource();
                const nome = oInput.getValue();

                // Função auxiliar para definir o estado
                const setInputState = (state, message) => {
                    oInput.setValueState(state);
                    oInput.setValueStateText(message);
                };

                //Validações
                if(!nome || nome.trim() === "") {
                    setInputState("Error", "O nome não pode ser vazio.");
                    return;
                }
            
                if(nome.length < 3) {
                    setInputState("Error", "O nome deve ter pelo menos 3 caracteres.");
                    return;
                }

                if(nome.length > 50) {
                    setInputState("Warning", "Nome muito longo!");
                    return;
                } 

                // Validação visual ao usuário
                setInputState("Success", "");

                // Atualiza o modelo
                const oModel = this.getView().getModel("formModel");
                oModel.setProperty("/nome", nome.trim());
            } catch(error) {
                console.error("Erro na validação do nome:", error);
                MessageToast.show("Erro ao validar o nome");
            }
        },

        onIdadeLiveChange: function(oEvent) {
            const oInput = oEvent.getSource();
            let idade = oInput.getValue();

            // Remove tudo que não for número
            idade = idade.replace(/[^0-9]/g, "");

            // Atualiza o valor do input se necessário
            if(idade !== oInput.getValue()) {
                oInput.setValue(idade);
            }

            // Validação básica em tempo real
            if(Number(idade) == 0) {
                oInput.setValueState("Error");
                oInput.setValueStateText("A idade deve ser maior que zero.");
            }else if(Number(idade) > 120) {
                oInput.setValueState("Warning");
                oInput.setValueStateText("A idade máxima permitida é 120.");
            }else {
                oInput.setValueState("None");
                oInput.setValueStateText("");
            }
        },

        onIdadeChange: function(oEvent) {
            try {
                const oInput = oEvent.getSource();
                const idade = oInput.getValue();

                const setInputState = (state, message) => {
                    oInput.setValueState(state);
                    oInput.setValueStateText(message);
                }

                // Validações finais ao sair do campo
                if(Number(idade) == 0) {
                    setInputState("Error", "A idade não pode ser menor que zero!");
                    return;
                }

                if(Number(idade) > 120) {
                    setInputState("Error", "A idade nao deve ser menor do que 120!");
                    return;
                }

                setInputState("Success", "");

                // Atualiza o modelo, se necessário
                const oModel = this.getView().getModel("formModel");
                oModel.setProperty("/idade", idade);

            } catch(error) {
                console.error("Erro na validação da idade:", error);
                MessageToast.show("Erro ao validar a idade");
            }
        },

        onCpfLiveChange: function(oEvent) {
            const oInput = oEvent.getSource();
            let cpf = oInput.getValue();

            cpf = cpf.replace(/[^0-9]/g, "");

            if(cpf !== oInput.getValue()){
                oInput.setValue(cpf);
            }
            
            if(cpf.length < 11){
                oInput.setValueState("Warning");
                oInput.setValueStateText("O CPF deve conter 11 digitos!");
            }else {
                oInput.setValueState("None");
                oInput.setValueStateText("");
            }
        },

        onCpfChange: function(oEvent) {
            const oInput = oEvent.getSource();
            const cpf = oInput.getValue();

            if(cpf.length !== 11) {
                oInput.setValueState("Error");
                oInput.setValueStateText("O CPF deve conter 11 dígitos numéricos.");
            }else {
                oInput.setValueState("Success");
                oInput.setValueStateText("CPF válido!");
            }
        },

        validateFields: function() {

            // Obtem as referências dos elementos de input do formulário
            const oNomeInput = this.byId("inputNome");
            const oIdadeInput = this.byId("inputIdade");
            const oCpfInput = this.byId("inputCPF");

            const nome = oNomeInput.getValue();
            const idade = oIdadeInput.getValue();
            const cpf = oCpfInput.getValue();

            let isValid = true;
            let errorMessage = "";

            if (!nome || nome.trim() === "") {
                oNomeInput.setValueState("Error");
                errorMessage = "Nome inválido.\n";
                isValid = false;
            }

            if (parseInt(idade) == 0) {
                oIdadeInput.setValueState("Error");
                errorMessage += "Idade zero é Inválida.\n";
                isValid = false;
            }

            if (cpf.length !== 11) {
                oCpfInput.setValueState("Error");
                errorMessage += "CPF inválido.\n";
                isValid = false;    
            }

            return { isValid, errorMessage };
        },

        clearForm: function() {

            // Limpa os campos na interface do usuário
            this.getView().getModel("formModel").setData({
                nome: "",
                cpf: "",
                idade: ""
            });

            // Remove os estados de validaçao
            this.byId("inputNome").setValueState("None");
            this.byId("inputIdade").setValueState("None");
            this.byId("inputCPF").setValueState("None");
        },

        onSalvarPessoa: async function() {
            try {

                const { isValid, errorMessage } = this.validateFields();

                if (!isValid) {
                    MessageBox.error("Por favor, corrija os seguintes erros:\n" + errorMessage);
                    return;
                }

                const oFormData = this.getView().getModel("formModel").getData();
                const oModel = this.getView().getModel();
                const oBinding = oModel.bindList("/pessoa");
                
                const oContext = oBinding.create({
                    cpf: oFormData.cpf,
                    nome: oFormData.nome,
                    idade: parseInt(oFormData.idade)
                });

                await oContext.created();

                MessageToast.show("Pessoa criada com sucesso!");

                this.clearForm();

                this.byId("pessoasTable").getBinding("items").refresh();
            } catch (error) {
                sap.m.MessageBox.error("Erro ao salvar:\n " + error.message);
            }
        }
    });
});