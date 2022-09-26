const authorize = (req,res,next) =>
{
    console.log("authorize called",req.query)
    const {user} = req.query;
    console.log(user);
    if(user === 'john')
    {
        console.log(user);
        req.user = {name:"john", id:2}
        next()
    }
    else{
        res.status(401).send("Unauthorized")
    }
    
}
module.exports = authorize