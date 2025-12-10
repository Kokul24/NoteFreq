import note from "../models/Notes.js";


export async function getallnote(req,res){
    try{
        const notes=await note.find({ user: req.user.id }).sort({ createdAt: -1 })
        res.status(200).json(notes)

    }
    catch(error){
        console.error("Get all notes failed:",error)
        res.status(500).json({"message":"Internal server failuare"})
    }


}
export async function Createnote(req,res){
  try{
    const {title,Content}=req.body
    const newNote=new note({"title":title,"Content":Content, "user": req.user.id})
    const savednote=await newNote.save();
    res.status(201).json(savednote);
  }
  catch(error){
    console.error("Internal server failed:",error);
    res.status(500).json({"message":"Internal server error"});
  }

    
}
export async function Updatenote(req,res){
    try {
    const {title,Content}=req.body
    const noteToUpdate = await note.findById(req.params.id);
    
    if (!noteToUpdate) {
        return res.status(404).json({message:"Note not found"});
    }
    
    if (noteToUpdate.user.toString() !== req.user.id) {
        return res.status(403).json({message:"Not authorized to update this note"});
    }
    
    const updatednote=await note.findByIdAndUpdate(req.params.id,{title,Content},{new:true});
    return res.status(200).json(updatednote);
}
catch(error){
    console.error("Update note failed",error);
    res.status(500).json({"message":"Internal server failuare"})
}
}
export async function Deletenote(req,res){
    try{
    const noteToDelete = await note.findById(req.params.id);
    
    if (!noteToDelete) {
        return res.status(404).json({message:"Note not found"});
    }
    
    if (noteToDelete.user.toString() !== req.user.id) {
        return res.status(403).json({message:"Not authorized to delete this note"});
    }
    
    const Deletednote=await note.findByIdAndDelete(req.params.id);
    return res.status(200).json({message:"Note deleted Successfully"});
}
catch(error){
    res.status(500).json({message:"Internal server error"})
}
    
    
}
export async function getnotebyid(req,res){
    try{
        const findbyid=await note.findById(req.params.id);
        if(!findbyid){
            return res.status(404).json({message:"Error in getting the note By ID"})
        }
        
        if (findbyid.user.toString() !== req.user.id) {
            return res.status(403).json({message:"Not authorized to access this note"});
        }
        
        return res.status(200).json(findbyid);
    
    }
    catch(error){
        res.status(500).json({message:"Internal server error"})

    }
}

