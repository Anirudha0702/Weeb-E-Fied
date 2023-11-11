const router=require('express').Router();
const axios=require('axios');

router.get("/:episode",async(req,res)=>{
    const {episode}=req.params; 
    const strikeURL=`${process.env.BASE_URL}/watch/${episode}`;
    console.log(episode)
        try {
            const { data } = await axios.get(strikeURL,
                { params: { server: "gogocdn" } });
            console.log(data)
             res.status(200).json(data.sources)
        } catch (err) {
            console.log(err.message)
            res.status(404).json({ error: "Episode not found" })
           
        }
})
module.exports=router; 