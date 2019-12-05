const hasAccess = (req,res,next)=>
{
    let errors = [];
    console.log(res.locals.user);
    errors.push("Must be logged in to access page");
    if(res.locals.user == null)
    {
        res.render("index",
        {
            index:errors
        })
    }
    else
    {
        next();
    }
}

module.exports=hasAccess;