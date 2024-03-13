import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuantityUpdatePage } from './quantity-update.page';

describe('QuantityUpdatePage', () => {
  let component: QuantityUpdatePage;
  let fixture: ComponentFixture<QuantityUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuantityUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
