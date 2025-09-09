import express from "express";
import {createClient, updateClient, getClients, getClient, deleteClient} from "../controllers/clientController.mjs";

const router = express.Router();

router.get('/', getClients);
router.post('/', createClient);
router.get('/:id', getClient);
router.put('/:id', updateClient);
router.patch('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;