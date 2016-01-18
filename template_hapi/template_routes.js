const {genname}Controller = require('./{genname}Controller');

module.exports = [
    {path: '/api/{name}', method: 'GET', config: {genname}Controller.findall},
    {path: '/api/{name}', method: 'POST', config: {genname}Controller.create},
    {path: '/api/{name}/{{name}_id}', method: 'GET', config: {genname}Controller.findone},
    {path: '/api/{name}/{{name}_id}', method: 'PUT', config: {genname}Controller.update},
    {path: '/api/{name}/{{name}_id}', method: 'DELETE', config: {genname}Controller.deletoneone}
];
