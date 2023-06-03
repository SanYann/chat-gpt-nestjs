## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn add chat-gpt-nestjs
```

## Usage
First create two env variables:
```javascript
API_KEY=sk-XxxxXXXxxx
ORGANIZATION_ID=xxxxx
```
note that ORGANIZATION_ID is optional

Using register async configuration in your module

```javascript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from 'chat-gpt-nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
    ChatModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        organizationId: configService.get('ORGANIZATION_ID'),
        apiKey: configService.get('API_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}

```

You can now use openai in your services as follow as an example:
```javascript
import { Injectable } from '@nestjs/common';
import { ChatService } from 'chat-gpt-nestjs';

@Injectable()
export class AppService {
  constructor(private readonly appService: ChatService) {}

  async createCompletion(prompt:string) {
    try {
      const completion = await this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
      });

      return completion.data.choices[0].text
    } catch (e) {
      console.error(e);
    }
  }
}
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

chat-gpt-nestjs is [MIT licensed](LICENSE).
