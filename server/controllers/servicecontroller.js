

export const get_username = async(req, res)=> {

    try
    {
        res.status(200).json(req.username);
    }
    catch(err)
    {
        console.log(`Error: ${err}`)
    }
}