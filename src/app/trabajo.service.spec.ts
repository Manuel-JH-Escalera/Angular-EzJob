import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TrabajoService } from './trabajo.service';

describe('TrabajoService', () => {
  let service: TrabajoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrabajoService],
    });
    service = TestBed.inject(TrabajoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get trabajos from Chiletrabajos', () => {
    const mockTrabajos = [
      {
        title: 'Test Job',
        link: 'http://test.com',
        company: 'Test Co',
        location: 'Test City',
        date: '2023-01-01',
      },
    ];

    service.getTrabajosChiletrabajos().subscribe((trabajos) => {
      expect(trabajos).toEqual(mockTrabajos);
    });

    const req = httpMock.expectOne(
      'https://scraper-portales-trabajo.onrender.com/scrape/chiletrabajos'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockTrabajos);
  });

  it('should get trabajos from Trabajando', () => {
    const mockTrabajos = [
      {
        title: 'Test Job',
        link: 'http://test.com',
        company: 'Test Co',
        location: 'Test City',
        date: '2023-01-01',
      },
    ];

    service.getTrabajosTrabajando().subscribe((trabajos) => {
      expect(trabajos).toEqual(mockTrabajos);
    });

    const req = httpMock.expectOne(
      'https://scraper-portales-trabajo.onrender.com/scrape/trabajando'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockTrabajos);
  });

  it('should save and retrieve jobs', () => {
    const testJob = {
      title: 'Test Job',
      link: 'http://test.com',
      company: 'Test Co',
      location: 'Test City',
      date: '2023-01-01',
    };

    service.saveJob(testJob);
    expect(service.isJobSaved(testJob)).toBeTruthy();
    expect(service.getSavedJobs()).toContain(testJob);

    service.saveJob(testJob);
    expect(service.isJobSaved(testJob)).toBeFalsy();
    expect(service.getSavedJobs()).not.toContain(testJob);
  });

  it('should combine trabajos from both sources', (done) => {
    const mockChiletrabajos = [
      {
        title: 'Chile Job',
        link: 'http://chile.com',
        company: 'Chile Co',
        location: 'Santiago',
        date: '2023-01-01',
      },
    ];
    const mockTrabajando = [
      {
        title: 'Trabajando Job',
        link: 'http://trabajando.com',
        company: 'Trabajando Co',
        location: 'Valparaíso',
        date: '2023-01-02',
      },
    ];

    service.getCombinedTrabajos().subscribe((trabajos) => {
      expect(trabajos.length).toBe(2);
      expect(trabajos).toContain(mockChiletrabajos[0]);
      expect(trabajos).toContain(mockTrabajando[0]);
      done();
    });

    const reqChile = httpMock.expectOne(
      'https://scraper-portales-trabajo.onrender.com/scrape/chiletrabajos'
    );
    const reqTrabajando = httpMock.expectOne(
      'https://scraper-portales-trabajo.onrender.com/scrape/trabajando'
    );

    reqChile.flush(mockChiletrabajos);
    reqTrabajando.flush(mockTrabajando);
  });
});
