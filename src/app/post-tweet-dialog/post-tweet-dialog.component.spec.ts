import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTweetDialogComponent } from './post-tweet-dialog.component';

describe('PostTweetDialogComponent', () => {
  let component: PostTweetDialogComponent;
  let fixture: ComponentFixture<PostTweetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTweetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTweetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
