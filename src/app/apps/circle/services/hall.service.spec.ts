/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HallService } from './hall.service';

describe('HallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HallService]
    });
  });

  it('should ...', inject([HallService], (service: HallService) => {
    expect(service).toBeTruthy();
  }));
});
