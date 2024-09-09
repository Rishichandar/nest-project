

// src/app.module.ts
import { Module, NestModule, MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginRegisterModule } from './loginandregister/login-register.module';
import { LoggingMiddleware } from './middleware/logging.middleware'; // Import your middleware
import { AboutModule } from './source/about/aboutmodule'; // Import AboutModule

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Posbytz'),
    LoginRegisterModule,
    AboutModule, // Add the AboutModule here
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware) 
      .forRoutes({path:'users', method: RequestMethod.GET}); // Apply to GET /users route as authorized
  }
}
