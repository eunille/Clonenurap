import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../routeservice/auth.service';
import { CommonModule, NgFor } from '@angular/common';
import { Route, Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-deleteworkspace',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './deleteworkspace.component.html',
  styleUrl: './deleteworkspace.component.css'

})
export class DeleteworkspaceComponent {
  workspaceId: string;
  workspaceName: string;
  constructor(private authService: AuthService, private router: Router, private aRoute: ActivatedRoute) {
    this.workspaceId = ""
    this.workspaceName = ""
  }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.workspaceId = params["params"]["id"];
    });
    this.fetchWorkspace(this.workspaceId);
  }

  deleteWorkspace(): void {
    if (this.workspaceId) {
      this.authService.deleteWorkspace(this.workspaceId).subscribe(
        (response) => {
          console.log("delete")
          this.goToWorkspaceList();
        },
        (error) => {
          console.error('Error deleting workspace:', error);
        }
      );
    } else {
      console.error('Workspace ID is missing.');
    }
  }

  fetchWorkspace(workspaceId: any): any {
    // Call authService to get the list of workspaces
    this.authService.getWorkspace(workspaceId).subscribe(
      (response) => {
        // Update workspaces array with the fetched data
        this.workspaceName = response.data.workspace.name;
        console.log("fetched")
      },
      (error) => {
        if (!error.error) return
        if (error.error['message'] == "workspaces not found") {
          console.error("Workspace not found")
        } else {
          console.error('Error fetching workspaces:', error);
        }
      }
    );
  }

  goToWorkspaceList() {
    this.router.navigate(["/workspacelist"]);
  }
}
