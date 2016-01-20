import {Injectable} from 'angular2/core'
import {Http, HTTP_PROVIDERS} from 'angular2/http'

import {Crisis} from './Crisis'

@Injectable()
export class CrisisService {
  const rootUrl: string = '/crises'

  getCrisis(id: Number): Crisis {
    return http.get(`${rootUrl}/${id}`)
     .map(res => res.json())
     .subscribe(crisis => crisis)
  }

  getCrises(): Crisis[] {
    return http.get(rootUrl)
     .map(res => res.json())
     .subscribe(crises => crises)
  }

}
