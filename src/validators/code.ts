const Joi = require("joi")
export const executeValidator = Joi.object({
  format: Joi.string().valid("c", "cpp", "py", "js", "java"),
  code: Joi.string(),
})

export const validateBody = (list:string[],code:string) =>{
  for(let i = 0; i < list.length; i++){
    if(code.includes(list[i]))return false;
  }
  return true;
}