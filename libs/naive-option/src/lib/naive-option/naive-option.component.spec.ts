import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NaiveOptionComponent } from './naive-option.component';

describe('NaiveOptionComponent', () => {
  let component: NaiveOptionComponent;
  let fixture: ComponentFixture<NaiveOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaiveOptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NaiveOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
