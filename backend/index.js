import express from 'express';
import supabase from './supabase.js';

const app =express()
app.use(express.json());

app.get('/todos',async(req,res)=>{
    const{data, error} = await supabase
    .from('todos')
    .select('*')
    .order('id')

    if(error){
        return res.status(500).json({error:error.message})
    }
    res.json(data)
})



app.listen(5000,()=>{
    {
        console.log("Server is running on port 5000");
    }
})