
import express from "express"
const router=express.Router();
import{Createnote, Deletenote, getallnote, getnotebyid, Updatenote}from "../controllers/notesControllers.js";
import { protect } from "../middleware/authMiddleware.js";

router.get('/', protect, getallnote);
router.get("/:id", protect, getnotebyid)
router.post('/', protect, Createnote);
router.put('/:id', protect, Updatenote);
router.delete('/:id', protect, Deletenote)
export default router;