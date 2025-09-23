import { Router } from 'express';
import { listGames, addGame, updateGame, deleteGame } from '../Controleur/game.controller.js';
import { authenticate, authorizeRole } from '../middlewares/auth.js';

const router = Router();
router.get('/', listGames);
router.post('/', authenticate, authorizeRole('ROLE_ADMIN'), addGame);
router.patch('/:id', authenticate, authorizeRole('ROLE_ADMIN'), updateGame);
router.delete('/:id', authenticate, authorizeRole('ROLE_ADMIN'), deleteGame);

export default router;
