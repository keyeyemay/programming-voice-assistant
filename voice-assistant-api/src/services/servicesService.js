const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (name) => {
    const services = fileService.readData(dataFilePath);
    if (name) {
        return services.filter(service =>
            service.name.toLowerCase().includes(name.toLowerCase())
        );
    }
    return services;
};

const findOne = (id) => {
    const services = fileService.readData(dataFilePath);
    return services.find(service => service.id === id);
};

const create = (serviceData) => {
    const services = fileService.readData(dataFilePath);

    const newId = services.length > 0
        ? Math.max(...services.map(s => s.id)) + 1
        : 1;

    const newService = { id: newId, ...serviceData };
    services.push(newService);
    fileService.writeData(dataFilePath, services);

    return newService;
};

const update = (id, serviceData) => {
    const services = fileService.readData(dataFilePath);
    const index = services.findIndex(s => s.id === id);

    if (index === -1) return null;

    services[index] = { ...services[index], ...serviceData };
    fileService.writeData(dataFilePath, services);

    return services[index];
};

const remove = (id) => {
    const services = fileService.readData(dataFilePath);
    const filteredServices = services.filter(s => s.id !== id);

    if (filteredServices.length === services.length) {
        return false;
    }

    fileService.writeData(dataFilePath, filteredServices);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };
