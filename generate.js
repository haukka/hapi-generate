var launch = require('commander');
var fs = require('fs');
var path = require('path');
var allowedTypes = ['string', 'number', 'date', 'boolean'];

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

launch
    .usage('node generate.js [name] hapi [field1]:[type1] [field2]:[type2]')
    .parse(process.argv)


if (launch.args.length > 2) {
    if (launch.args[1].indexOf("hapi")) {
	console.log('You should define the name hapi for the template');
    } else {
	start_creation(launch.args);
    }
} else {
    console.log('you should put some arguments to create the files');
}

function start_creation(data) {
    check_fields(data);
    var nameschema = data[0].capitalize() + "Schema";
    var name = data[0].toLowerCase();
    var genname = data[0].capitalize();
    var fields = [];
    var i = 2;

    while (i < data.length) {
	fields.push(data[i]);
	i++;
    }
    if (data[1] == "hapi")
	generate_hapi_template(name, genname,nameschema, fields);
}

function check_fields(data) {
    var i = 2;

    while (i < data.length) {
	if (allowedTypes.indexOf(data[i].slice(data[i].indexOf(':') + 1, data[i].length)) == -1) {
	    console.log(data[i] + " is incorrect");
	    process.exit();
	}
	i++;
    }
}

function generate_hapi_template(name, genname, nameschema, fields) {
    createModelHapi(nameschema, fields, genname);
    createRouterHapi(genname, name);
    createControllerHapi(name, genname);
}

function format_fields(fields) {
    var model = '{\n\t'; 
    for (i = 0; i < fields.length; i++) {
	model += fields[i].slice(0, fields[i].indexOf(':')-1) + ":{\n";
	model += '\t' + "type: " + fields[i].slice(fields[i].indexOf(':') + 1, fields[i].length).capitalize() + '\n' + '\t}';
	if (i >= 0 && (i+1) != fields.length)
	    model += ',\n\t';
    }
    model += '\n}';
    return model;
}

function createModelHapi(nameschema, fields, name) {
    var routes = fs.readFileSync(path.join(__dirname, '.', 'template_hapi', 'template_model.js'), 'utf-8');
    var fields_elem = format_fields(fields);
    routes = routes.replace(/{name}/g, name);
    routes = routes.replace(/{nameschema}/g, nameschema);
    routes = routes.replace(/{namemodel}/g, name);
    routes = routes.replace(/{fields}/, fields_elem);
    fs.writeFile('./'+ name + 'Model.js', routes, {mode: 0666}, function (err) {
        if (err) { throw err; }
        console.info("creation du model");
    });
}

function createRouterHapi(genname, name) {
    var routes = fs.readFileSync(path.join(__dirname, '.', 'template_hapi', 'template_routes.js'), 'utf-8');
    routes = routes.replace(/{genname}/g, genname);
    routes = routes.replace(/{name}/g, name);
    fs.writeFile('./'+ genname + 'Router.js', routes, {mode: 0666}, function (err) {
        if (err) { throw err; }
        console.info("creation du router");
    });
}

function createControllerHapi(name, namemodel) {
    var routes = fs.readFileSync(path.join(__dirname, '.', 'template_hapi', 'template_controller.js'), 'utf-8');
    routes = routes.replace(/{name}/g, name);
    routes = routes.replace(/{namemodel}/g, namemodel);
    fs.writeFile('./'+ namemodel + 'Controller.js', routes, {mode: 0666}, function (err) {
        if (err) { throw err; }
        console.info("creation du controller");
    });
}
