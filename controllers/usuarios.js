const { request, response } = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuarioGet = async(req = request, res = response) => {
    // const query = req.query;
    // const { nombre, apellido = 'sin apellido', key } = req.query; // se puede desestructurar
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuarioPut = async(req = request, res = response) => {
    // const id = req.params.id;
    const { id } = req.params; //se puede desestructurar
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(); //valor por defecto 10. Es para hacer mas complicada la encriptación
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findOneAndUpdate(id, resto);

    res.json(usuario);
}

const usuarioPost = async(req = request, res = response) => {



    //const {google ...resto} = req.body; //desestructuración: excluye google y obtiene el resto
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Verificar si el correo existe


    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); //valor por defecto 10. Es para hacer mas complicada la encriptación
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD

    await usuario.save();
    res.json({
        msg: 'post API - usuarioPost',
        usuario
    });
}

const usuarioDelete = async(req, res = response) => {
    const { id } = req.params;

    // Fisicament lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json(usuario);
}

module.exports = {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete
}