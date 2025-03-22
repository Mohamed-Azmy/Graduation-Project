



 export const academicEmail =()=>{
    const domains = ["tanta.edu.eg"] ;
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `/^UG_\d{8}@${domain}/`
}
