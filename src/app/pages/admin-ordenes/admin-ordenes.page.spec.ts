import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminOrdenesPage } from './admin-ordenes.page';

describe('AdminOrdenesPage', () => {
  let component: AdminOrdenesPage;
  let fixture: ComponentFixture<AdminOrdenesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminOrdenesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
