const { request, response } = require('express');

const usuarioGet = (req = request, res = response) => {
    // const query = req.query;
    const { nombre, apellido = 'sin apellido', key } = req.query; // se puede desestructurar
    res.json({
        msg: 'get API - controlador',
        nombre,
        apellido,
        key
    });
}

const usuarioPut = (req = request, res = response) => {
    // const id = req.params.id;
    const { id } = req.params; //se puede desestructurar
    res.json({
        msg: 'put API - controlador',
        id
    });
}

const usuarioPost = (req = request, res = response) => {

    const { nombre, apellido } = req.body;
    res.json({
        msg: 'post API - controlador',
        nombre,
        apellido
    });
}

const usuarioDelete = (req, res = response) => {
    res.json({ msg: 'delete API - controlador' });
}

module.exports = {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete
}