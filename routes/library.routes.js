import { Router } from 'express';
import { getLibrary, addToLibrary, removeFromLibrary } from '../Controleur/library.controller.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();
router.get('/', authenticate, getLibrary);
router.post('/:gameId', authenticate, addToLibrary);
router.delete('/:gameId', authenticate, removeFromLibrary);

export default router;
