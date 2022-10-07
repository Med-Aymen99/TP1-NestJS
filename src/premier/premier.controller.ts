/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('premier')
export class PremierController {
    @Get()
    getPremier(){
    
        console.log('getPremier');
        return "getPremier";
    }

    @Post()
    postPremier(){
        console.log('postPremier');
        return "postPremier";
    }
    
    @Delete()
    deletePremier(){
        console.log('deletePremier');
        return "deletePremier";
    }

    @Put()
    putPremier(){
        console.log('putPremier');
        return "putPremier";
    }

}
