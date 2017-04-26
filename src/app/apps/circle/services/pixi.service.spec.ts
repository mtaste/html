/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PixiService } from './pixi.service';

describe('PixiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PixiService]
    });
  });

  it('should ...', inject([PixiService], (service: PixiService) => {
    expect(service).toBeTruthy();
  }));
});
