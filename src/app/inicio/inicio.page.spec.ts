import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InicioPage } from './inicio.page';
import { TrabajoService } from '../trabajo.service';
import { of } from 'rxjs';

describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;
  let trabajoServiceSpy: jasmine.SpyObj<TrabajoService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TrabajoService', [
      'getCombinedTrabajos',
      'updateTrabajosChiletrabajos',
      'updateTrabajosTrabajando',
      'saveJob',
      'isJobSaved',
    ]);

    await TestBed.configureTestingModule({
      declarations: [InicioPage],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [{ provide: TrabajoService, useValue: spy }],
    }).compileComponents();

    trabajoServiceSpy = TestBed.inject(
      TrabajoService
    ) as jasmine.SpyObj<TrabajoService>;
    fixture = TestBed.createComponent(InicioPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch combined trabajos on init', () => {
    const mockTrabajos = [
      {
        title: 'Test Job',
        link: 'http://test.com',
        company: 'Test Co',
        location: 'Test City',
        date: '2023-01-01',
      },
    ];
    trabajoServiceSpy.getCombinedTrabajos.and.returnValue(of(mockTrabajos));

    fixture.detectChanges();

    expect(trabajoServiceSpy.getCombinedTrabajos).toHaveBeenCalled();
    expect(component.trabajosCombinados).toEqual(mockTrabajos);
    expect(component.loading).toBeFalse();
  });
});
