import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf', '.docx'];

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
                fileSize: 2 * 1024 * 1024, // 2 MB, adjust as needed
            },
            fileFilter: (req, file, cb) => {
                const ext = extname(file.originalname).toLowerCase();
                if (!allowedExtensions.includes(ext)) {
                    return cb(new BadRequestException('Bestandstype niet toegestaan'), false);
                }
                cb(null, true);
            },
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('Geen bestand geüpload of bestandstype niet toegestaan');
        }
        return {
            filename: file.filename,
            url: `/uploads/${file.filename}`,
        };
    }
}