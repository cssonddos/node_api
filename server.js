'use strict';

const os = require('os');
const express = require('express');
const HttpStatus = require('http-status-codes');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();

app.all('/', (req, res) => {
    printRoute(req);
    res.status(200).send(os.hostname() + ' | ' + os.platform() + ' | ' + os.release() + ' - ' + req.method);
});

app.all('/api/values', (req, res) => {
    printRoute(req);
    myFunc(req,res);
});

app.all('/api/values/:id', (req, res) => {
    printRoute(req);
    res.status(req.param('id')).send(req.method + ' = ' + req.param('id'));
});

app.all('/api/values/timeout/:delay', (req, res) => {
    printRoute(req);
    var timeout = req.param('delay');
    myFunc(req,res,timeout);
});

app.all('/teste/values', (req, res) => {
    printRoute(req);
    myFunc(req,res);
});

app.all('/teste/values/:id', (req, res) => {
    printRoute(req);
    res.status(req.param('id')).send(req.method + ' = ' + req.param('id'));
});

app.all('/teste/timeout/:delay', (req, res) => {
    printRoute(req);
    var timeout = req.param('delay');
    myFunc(req,res,timeout);
});

//-------------

app.all('/testeaks/values', (req, res) => {
    printRoute(req);
    myFunc(req,res);
});

app.all('/testeaks/values/:id', (req, res) => {
    printRoute(req);
    res.status(req.param('id')).send(req.method + ' = ' + req.param('id'));
});

app.all('/testeaks/timeout/:delay', (req, res) => {
    printRoute(req);
    var timeout = req.param('delay');
    myFunc(req,res,timeout);
});
function printRoute(req){
    console.log('Rota no app: ' + req.path);
}

function myFunc(req, res, timeout) {
    if(timeout == null){
        if(req.method == 'HEAD'){
            res.status(202).send(req.method);
        }else{
            res.status(200).send(req.method);
        }
    }else{
        setTimeout(() => {
            if(req.method == 'HEAD'){
                res.status(202).send(req.method + ' = ' + timeout + 'ms');
            }else{
                res.status(200).send(req.method + ' = ' + timeout + 'ms');
            }
        }, timeout);
    }
  }

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);