import {Injectable} from 'angular2/core'
import {Crisis} from './Crisis'

@Injectable()
export class CrisisService {

  getCrisis(id: Number): Crisis {
    return this.getCrises()
      .then(crises => crises.find(crisis => crisis.id === id))
  }

  getCrises(): Crisis[] {
    return new Promise<Crisis[]>(resolve => {
      setTimeout(resolve(CRISES), 350)
    })
  }

}
