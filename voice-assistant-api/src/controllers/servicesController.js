const servicesService = require('../services/servicesService');

const getAllServices = (req, res) => {
    const { name } = req.query;
    const services = servicesService.findAll(name);
    res.json(services);
};

const getServiceById = (req, res) => {
    const id = parseInt(req.params.id);
    const service = servicesService.findOne(id);

    if (!service) {
        return res.status(404).json({ error: 'Услуга не найдена' });
    }

    res.json(service);
};

const createService = (req, res) => {
    const { name, description, intent } = req.body;

    // Простая валидация
    if (!name || !description || !intent) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
    }

    const newService = servicesService.create({ name, description, intent });
    res.status(201).json(newService);
};

const updateService = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedService = servicesService.update(id, req.body);

    if (!updatedService) {
        return res.status(404).json({ error: 'Услуга не найдена' });
    }

    res.json(updatedService);
};

const deleteService = (req, res) => {
    const id = parseInt(req.params.id);
    const success = servicesService.remove(id);

    if (!success) {
        return res.status(404).json({ error: 'Услуга не найдена' });
    }

    res.status(204).send();
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};
