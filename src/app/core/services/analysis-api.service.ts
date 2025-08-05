import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page, BrawlerStats, PlayerRanking, TeamRanking, TeamCard, PlayerCard } from '../models/analysis.models';

@Injectable({
  providedIn: 'root'
})
export class AnalysisApiService {
  private readonly API_BASE_URL = 'http://localhost:8080/api/analysis';

  constructor(private http: HttpClient) { }

  private buildParams(filters: any, page?: number, size?: number, sort?: string): HttpParams {
    let params = new HttpParams();
    if (page !== undefined) params = params.set('page', page.toString());
    if (size !== undefined) params = params.set('size', size.toString());
    if (sort) params = params.set('sort', sort);
    if (filters.timePeriod && filters.timePeriod !== 'all') params = params.set('timePeriod', filters.timePeriod);

    return params;
  }

  // --- MÉTODOS PARA BRAWLERS ---
  getBrawlerTierList(filters: any, page: number, size: number, sort: string): Observable<Page<BrawlerStats>> {
    const params = this.buildParams(filters, page, size, sort);
    return this.http.get<Page<BrawlerStats>>(`${this.API_BASE_URL}/brawlers/tierlist`, { params });
  }

  // --- MÉTODOS PARA PLAYERS ---
  getPlayerRankings(filters: any, page: number, size: number, sort: string): Observable<Page<PlayerRanking>> {
    const params = this.buildParams(filters, page, size, sort);
    return this.http.get<Page<PlayerRanking>>(`${this.API_BASE_URL}/players/rankings`, { params });
  }

  getPlayerCard(playerTag: string, filters: any): Observable<PlayerCard> {
    const params = this.buildParams(filters);
    return this.http.get<PlayerCard>(`${this.API_BASE_URL}/players/${playerTag}`, { params });
  }

  // --- MÉTODOS PARA TIMES ---
  getTeamRankings(filters: any, page: number, size: number, sort: string): Observable<Page<TeamRanking>> {
    const params = this.buildParams(filters, page, size, sort);
    return this.http.get<Page<TeamRanking>>(`${this.API_BASE_URL}/teams/rankings`, { params });
  }

  getTeamCard(teamName: string, filters: any): Observable<TeamCard> {
    const params = this.buildParams(filters);
    return this.http.get<TeamCard>(`${this.API_BASE_URL}/teams/${teamName}`, { params });
  }
}
