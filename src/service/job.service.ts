import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { Job } from '../entity/Job';

interface IJob {
  id?: number;
  content: string;
}

@Provide()
export class JobService {
  @InjectEntityModel(Job)
  jobModel: Repository<Job>;

  async get() {
    const res = await this.jobModel.findOneBy({
      id: 1,
    });
    return res;
  }

  async update(body: IJob) {
    const { id, content } = body;
    await this.jobModel.save({
      id,
      content,
    });
  }
}
