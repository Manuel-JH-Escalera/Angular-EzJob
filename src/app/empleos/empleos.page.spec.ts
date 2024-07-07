import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { EmpleosPage } from './empleos.page';
import { TrabajoService } from '../trabajo.service';

describe('EmpleosPage', () => {
  let component: EmpleosPage;
  let fixture: ComponentFixture<EmpleosPage>;
  let trabajoServiceSpy: jasmine.SpyObj<TrabajoService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TrabajoService', [
      'getCombinedTrabajos',
      'saveJob',
      'isJobSaved',
    ]);

    await TestBed.configureTestingModule({
      declarations: [EmpleosPage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: TrabajoService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({ title: 'test' }) },
        },
      ],
    }).compileComponents();

    trabajoServiceSpy = TestBed.inject(
      TrabajoService
    ) as jasmine.SpyObj<TrabajoService>;
    fixture = TestBed.createComponent(EmpleosPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch trabajos and apply filter on init', () => {
    const mockTrabajos = [
      {
        title: 'Test Job',
        link: 'http://test.com',
        company: 'Test Co',
        location: 'Test City',
        date: '2023-01-01',
      },
      {
        title: 'Another Job',
        link: 'http://another.com',
        company: 'Another Co',
        location: 'Another City',
        date: '2023-01-02',
      },
    ];
    trabajoServiceSpy.getCombinedTrabajos.and.returnValue(of(mockTrabajos));

    fixture.detectChanges();

    expect(trabajoServiceSpy.getCombinedTrabajos).toHaveBeenCalled();
    expect(component.trabajos).toEqual(mockTrabajos);
    expect(component.filteredTrabajos.length).toBe(1);
    expect(component.filteredTrabajos[0].title).toBe('Test Job');
    expect(component.loading).toBeFalse();
  });
});
