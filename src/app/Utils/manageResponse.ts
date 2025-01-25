import { Response } from "express";

const manageResponse=(res:Response,status:number,message:string,data:any)=>{
      return res.status(status).json({
            success:true,
            message,
            data
      })
}

export default manageResponse;