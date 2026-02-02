import express from 'express';
import supabase from './supabase.js';

const app =express()
app.use(express.json())

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


app.post('/todos',async(req,res)=>{
    const {title} = req.body;

    if(!title){
        return res.status(400).json({error:"title required"})
    }

    const {data, error} = await supabase.from('todos').insert([{title}]).select()

    if (error){
        return res.status(500).json({error:error.message})
    }

    res.status(200).json(data[0])
})

app.put('/todos/:id', async(req,res)=>{
    const {id} = req.params
    const {completed} = req.body

    const {data,error} = await supabase
    .from ('todos')
    .update({completed})
    .eq('id',id)
    .select()

    if(error){
        return res.status(500).json({error: error.message})
    }

    res.json(data[0])
})

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params

  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json({ message: 'deleted' })
})

app.listen(5000,()=>{
    {
        console.log("Server is running on port 5000");
    }
})