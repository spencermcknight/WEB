const hasAccess = (req,res,next)=>
{
    console.log(res.locals.user);
    if(res.locals.user == null)
    {
        console.log('nope, not logged in');
        res.redirect("/");
    }
    else
    {
        console.log('room listings should render');
        next();
    }
}

module.exports=hasAccess;