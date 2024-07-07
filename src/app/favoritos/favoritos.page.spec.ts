import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FavoritosPage } from './favoritos.page';
import { TrabajoService } from '../trabajo.service';

describe('FavoritosPage', () => {
  let component: FavoritosPage;
  let fixture: ComponentFixture<FavoritosPage>;
  let trabajoServiceSpy: jasmine.SpyObj<TrabajoService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TrabajoService', [
      'getSavedJobs',
      'saveJob',
    ]);

    await TestBed.configureTestingModule({
      declarations: [FavoritosPage],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: TrabajoService, useValue: spy }],
    }).compileComponents();

    trabajoServiceSpy = TestBed.inject(
      TrabajoService
    ) as jasmine.SpyObj<TrabajoService>;
    fixture = TestBed.createComponent(FavoritosPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load saved jobs on init', () => {
    const mockSavedJobs = [
      {
        title: 'Saved Job',
        link: 'http://saved.com',
        company: 'Saved Co',
        location: 'Saved City',
        date: '2023-01-01',
      },
    ];
    trabajoServiceSpy.getSavedJobs.and.returnValue(mockSavedJobs);

    fixture.detectChanges();

    expect(trabajoServiceSpy.getSavedJobs).toHaveBeenCalled();
    expect(component.savedTrabajos).toEqual(mockSavedJobs);
  });
});
