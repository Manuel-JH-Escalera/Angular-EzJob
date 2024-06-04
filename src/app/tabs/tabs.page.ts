import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { createTabTransition } from './tab-Transition';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(private router: Router, private animationCtrl: AnimationController) {}

  async ionTabsDidChange(event: CustomEvent) {
    const selectedTab = event.detail.tab;
    this.router.navigate([`/tabs/${selectedTab}`], {
      // @ts-ignore
      animated: true,
      animationBuilder: createTabTransition(this.animationCtrl)
    });
  }
}