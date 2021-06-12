import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalTweetsComponent } from './external-tweets.component';

describe('ExternalTweetsComponent', () => {
  let component: ExternalTweetsComponent;
  let fixture: ComponentFixture<ExternalTweetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalTweetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
