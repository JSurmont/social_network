import { Candidate } from './../models/candidate.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, delay, map, switchMap, take, tap } from "rxjs";
import { environment } from "src/environments/environment";

const CINQ_MINUTES: number = 300000;

@Injectable()
export class CandidateService {

  private lastCandidatesLoad: number = 0;

  constructor(
    private http: HttpClient
  ) {}

  private _loading$ = new BehaviorSubject<boolean>(false);
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  private _candidates$ = new BehaviorSubject<Candidate[]>([]);
  get candidates$(): Observable<Candidate[]> {
    return this._candidates$.asObservable();
  }

  private setLoadingStatus( loading: boolean) {
    this._loading$.next(loading);
  }

  getCandidatesFromServer() {
    if (Date.now() - this.lastCandidatesLoad <= CINQ_MINUTES) {
      return;
    }
    this.setLoadingStatus(true);
    this.http.get<Candidate[]>(`${environment.apiUrl}/candidates`).pipe(
      delay(1000),
      tap(candidates => {
        this._candidates$.next(candidates);
        this.lastCandidatesLoad = Date.now();
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  getCandidateById(id: number): Observable<Candidate> {
    if (!this.lastCandidatesLoad) {
      this.getCandidatesFromServer();
    }
    return this.candidates$.pipe(
      map(candidates => candidates.filter(candidate => candidate.id === id)[0])
    );
  }

  hireCandidate(id: number): void {
    this.candidates$.pipe(
      take(1),
      map(candidates => candidates
        .map(candidate => candidate.id === id ?
          { ...candidate, company: 'Snapface Ltd' } :
          candidate
        )
      ),
      tap(updatedCandidates => this._candidates$.next(updatedCandidates)),
      delay(1000),
      switchMap(updatedCandidates =>
        this.http.patch(`${environment.apiUrl}/candidates/${id}`,
        updatedCandidates.find(candidate => candidate.id === id)))
    ).subscribe;
  }

  refuseCandidate(id: number): void {
    this.setLoadingStatus(true);
    this.http.delete(`${environment.apiUrl}/candidates/${id}`).pipe(
      delay(1000),
      switchMap(() => this.candidates$),
      take(1),
      map(candidates => candidates.filter(candidates => candidates.id !== id)),
      tap(candidates => {
        this._candidates$.next(candidates);
        this.setLoadingStatus(false);
      })
    ).subscribe;
  }

}
