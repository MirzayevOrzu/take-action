import { Module } from '@nestjs/common';
import { CoreModules } from './common/modules/CoreModules';

@Module({
    imports: [
        CoreModules,
    ],
})
export class AppModule {}
