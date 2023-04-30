import { TestBed } from '@angular/core/testing';

import { NavTabService } from './nav-tab.service';

describe('NavTabService', () => {
  let service: NavTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
