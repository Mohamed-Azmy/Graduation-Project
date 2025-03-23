import { customAlphabet } from 'nanoid';



 export const academicEmail = async()=>{
    const domains = ["tanta.edu.eg"] ;
    const randomNumbers = customAlphabet('1234567890', 8)();
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return  `UG_${randomNumbers}@${domain}`;
}
