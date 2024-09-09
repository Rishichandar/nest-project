

// src/app.module.ts
import { Module, NestModule, MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginRegisterModule } from './loginandregister/login-register.module';
import { LoggingMiddleware } from './middleware/logging.middleware'; // Import your middleware
import { AboutModule } from './source/about/aboutmodule';
import { CareerModule } from './source/career/careermodule';
import { FooterModule } from './source/footer/footermodule';
import { HomeModule } from './source/home/homemodule';
import { NavbarModule } from './source/navbar/navbarmodule';
import { SupportModule } from './source/support/supportmodule';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Posbytz'),
    LoginRegisterModule,
    AboutModule, // Add the AboutModule here
    CareerModule,
    FooterModule,
    HomeModule,
    NavbarModule,
    SupportModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware) 
      .forRoutes({path:'users', method: RequestMethod.GET}); // Apply to GET /users route as authorized
  }
}
