"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRol = exports.getOneRol = exports.updateRol = exports.newRol = exports.getRol = void 0;
const rol_1 = require("../models/rol");
const getRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listRol = yield rol_1.Rol.findAll({ attributes: ['COD_ROL', 'NOMBRE_ROL'] });
        res.json(listRol);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los roles.' });
    }
});
exports.getRol = getRol;
const newRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_rol } = req.body;
    try {
        yield rol_1.Rol.create({
            "NOMBRE_ROL": nombre_rol
        });
        return res.status(201).json({
            msg: 'Rol creado correctamente'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error al crear el rol',
            error
        });
    }
});
exports.newRol = newRol;
const updateRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_rol } = req.params;
    const { nombre_rol } = req.body;
    const idRol = yield rol_1.Rol.findOne({ where: { COD_ROL: cod_rol } });
    if (!idRol) {
        return res.status(404).json({
            msg: "El id del rol no exist"
        });
    }
    try {
        yield rol_1.Rol.update({
            NOMBRE_ROL: nombre_rol
        }, { where: { COD_ROL: cod_rol } });
        return res.json({
            msg: 'Usuario ' + cod_rol + ' actualizado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el rol: ' + cod_rol,
            error
        });
    }
});
exports.updateRol = updateRol;
const getOneRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_rol } = req.params;
    console.log(cod_rol);
    const idRol = yield rol_1.Rol.findOne({ where: { COD_ROL: cod_rol } });
    if (!idRol) {
        return res.status(404).json({
            msg: "El id: " + cod_rol + " de rol no existe"
        });
    }
    try {
        const rolOne = yield rol_1.Rol.findOne({ where: { COD_ROL: cod_rol } });
        res.json(rolOne);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al encontrar el roll: ' + cod_rol,
            error
        });
    }
});
exports.getOneRol = getOneRol;
const deleteRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cod_rol } = req.params;
    const idRol = yield rol_1.Rol.findOne({ where: { COD_ROL: cod_rol } });
    if (!idRol) {
        return res.status(404).json({
            msg: "El id: " + cod_rol + " del rol no existee"
        });
    }
    try {
        yield rol_1.Rol.destroy({ where: { COD_ROL: cod_rol } });
        return res.json({
            msg: 'Rol de ' + cod_rol + ' borrado correctamente'
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al actualizar el rol: ' + cod_rol,
            error
        });
    }
});
exports.deleteRol = deleteRol;
