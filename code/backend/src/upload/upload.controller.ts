import { Controller, Post, UploadedFile, UseInterceptors,} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';


@Controller('upload')
export class UploadController {
    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueName = `${Date.now()}-${file.originalname}`;
                    cb(null, uniqueName);
                },
            }),
            limits: {
                fileSize: 5 * 1024 * 1024, 
            },
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return{
            filename: file.filename,
            url: `/uploads/${file.filename}`,
        };
    }
}