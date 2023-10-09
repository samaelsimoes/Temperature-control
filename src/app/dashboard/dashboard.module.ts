import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule, Routes } from "@angular/router";

//import { AuthGuard } from "./AuthGuard";
import { IndexDashboardComponent } from "./index/index-dashboard.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CardsComponent } from "./cards/cards.component";
import { ServerComponent } from "./server/server.component";
import { ChuveiroFileComponent } from "./chuveiro/chuveiro.component";
import { TableListComponent } from "./table-list/table-list.component";
import { TypographyComponent } from "./typography/typography.component";
import { IconsComponent } from "./icons/icons.component";
import { MapsComponent } from "./maps/maps.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { UpgradeComponent } from "./upgrade/upgrade.component";
import { DataCentersComponent } from "./data-centers/data-centers.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

const routes: Routes = [
    {
        path: 'index',
        component: IndexDashboardComponent,
        //canActivate: [AuthGuard],
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'index',
    },
    /*{
        path: 'dashboard',
        component: ServerComponent
    },
    {
        path: 'chuveiro',
        component: ChuveiroFileComponent
    },*/
];

@NgModule({
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        CardsComponent,
        ServerComponent,
        ChuveiroFileComponent,
        TableListComponent,
        TypographyComponent,
        MapsComponent,
        UpgradeComponent,
        DataCentersComponent,
        IconsComponent,
        NotificationsComponent,
        IndexDashboardComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
        FooterComponent,
        NavbarComponent,
        SidebarComponent
    ],
    providers: [
        //AuthGuard
    ],
})

export class DashBoardModule { }