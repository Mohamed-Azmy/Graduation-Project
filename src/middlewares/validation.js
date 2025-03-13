export const validation = (schema)=>{
    return (req,res,next)=>{
        let valideationResult =[]
        for (const key of Object.keys(schema)) {
        const validationError = schema[key].validate(req[key],{abortEarly:false});
        if(validationError?.error){
            valideationResult.push(validationError.error.details) ;
        } 
        if(valideationResult.length>0){
            return res.status(400).json({mesg:"validation error" ,error:valideationResult});
        }
    }    
        next();
    }   
    
}
