import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApiGlobals } from '../../utility/ApiGlobals';
import Project from '../../utility/Project';
import {AuthService} from '../auth-service/auth.service';

@Injectable()
export class ProjectService {

  private ownedKey = 'ownedProjects';
  private developerKey = 'developerProjects';

  constructor(private http: HttpClient,
              private authService: AuthService) {}

  // Get owned projects
  getOwnedProjects(refresh: boolean): Observable<Project[]> {

    return new Observable<Project[]>(observable => {

      const ownedProjects = localStorage.getItem(this.ownedKey);

      if (refresh || !ownedProjects) {

        this.http.get(ApiGlobals.apiRoot + ApiGlobals.ownedURI)
          .subscribe(
            (projects: Project[]) => {

            console.log(projects);
            localStorage.setItem(this.ownedKey, JSON.stringify(projects));
            observable.next(projects);
          },
            (err: HttpErrorResponse) => {

              if (err.status === 401) {

                this.authService.logout();

              } else if (err.status === 403) {

                window.location.assign(err.error);
              }
            });

      } else {

        observable.next(JSON.parse(ownedProjects));
      }
    });
  }

  // Get developer projects
  getDeveloperProjects(refresh: boolean) {}

  // Create new project
  createNewProject(projectName: string): Observable<any> {

    return new Observable<any>(observable => {

      this.http.post(ApiGlobals.apiRoot + ApiGlobals.newURI,
        {name: projectName})
        .subscribe(
          () => { observable.next(); },
          (err: HttpErrorResponse) => {

            if (err.status === 401) {

              this.authService.logout();

            } else if (err.status === 403) {

              window.location.assign(err.error);
            }

            observable.error();
          });
    });
  }
}

