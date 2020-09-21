const { debug } = require('console');
// Requerir o express ( framework para se usar node.js )
const express = require('express');

// Requerir nebd para a database
const Datastore = require('nedb');

const app = express();

// Iniciar server na porta 8080
app.listen(8080, () => console.log('Listening at 8080'));

// Usar o html da pasta public
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

// Database
const database = new Datastore('database.db');

// REGISTRAR -----------------------------------------------------------
app.post('/registrar', (request, response) => {
   
    const created = 1;

    database.loadDatabase(); // Pega o conteúdo da database

    database.find({}, (err, data)=>{

        if(err){

            console.log("DEU ERRO");
        }

        for(item of data){

            if(item.id == request.body.id){

                response.json({

                    status: "success",
                    text: "CONTA JA EXISTE"
                }); 
                return;
            }
        }


        response.json({
    
            status: "success",
            text: "CONTA CRIADA"
        });

        database.insert(request.body); // Colocar a informação na database
    })
});

// LOGIN -------------------------------------------------------------------
app.post('/login', (request, response) => {

    database.loadDatabase(); // Pega o conteúdo da database

    database.find({}, (err, data)=>{

        if(err){

            console.log("DEU ERRO");
        }

        for(item of data){

            if(item.id == request.body.id){

                if(item.senha == request.body.senha){

                    // Responder que conseguiu logar
                    response.json({

                        status: "success",
                        text: "LOGADO"
                    });
                    return;
                }
            }
        }

          // Responder que não conseguiu logar
          response.json({

            status: "success",
            text: "CONTA NÃO EXISTE"
        });
    })
});