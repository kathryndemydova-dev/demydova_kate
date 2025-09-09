import Client from '../models/clientModel.mjs';


export const getClients = async (req, res) => {
  try {
    const {search, page = 1, limit = 6} = req.query;

    let filter = {};
    if (search) {
      filter.name = {$regex: search, $options: "i"};
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [clients, total] = await Promise.all([
      Client.find(filter)
        .sort({createdAt: -1})
        .skip(skip)
        .limit(parseInt(limit)),
      Client.countDocuments(filter)
    ]);

    res.status(200).json({
      message: "Clients successfully retrieved",
      data: clients,
      total
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while retrieving clients",
      error: err.message
    });
  }
};

export const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({message: 'Client not found'});
    }
    res.status(200).json({
      message: "Client successfully found",
      data: client
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while retrieving the client",
      error: err.message
    });
  }
};

export const createClient = async (req, res) => {
  try {
    const newClient = new Client(req.body);
    await newClient.save();

    res.status(201).json({
      message: "Client created successfully",
      data: newClient
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while creating the client",
      error: err.message
    });
  }
};

export const updateClient = async (req, res) => {
  try {
    const updated = await Client.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if (!updated) {
      return res.status(404).json({message: "Client not found"});
    }

    res.status(200).json({
      message: "Client updated successfully",
      data: updated
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while updating the client",
      error: err.message
    });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const deleted = await Client.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({message: "Client not found"});
    }

    res.status(200).json({
      message: "Client deleted successfully",
      data: deleted
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while deleting the client",
      error: err.message
    });
  }
};