import { Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';

@Provide()
export class ApiService {
  async getCarousel(options: IUserOptions) {
    return {
      uid: options.uid,
      images: [
        {
          id: 1,
          name: 'xxxx',
          src: 'xxxx',
        },
        {
          id: 2,
          name: 'xxxx',
          src: 'xxxx',
        },
      ],
    };
  }
}
