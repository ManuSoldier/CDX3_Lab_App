/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppTopbarComponent } from './app.topbar.component';
import { AppRightpanelComponent} from './app.rightpanel.component';
import { AppInlineProfileComponent } from './app.profile.component';
import { AppFooterComponent } from './app.footer.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ RouterTestingModule ],
        declarations: [ AppComponent,
                AppTopbarComponent,
                AppMenuComponent,
                AppSubMenuComponent,
                AppFooterComponent,
                AppInlineProfileComponent,
                AppRightpanelComponent
            ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
