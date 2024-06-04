import { AnimationController } from '@ionic/angular';

export function createTabTransition(animationCtrl: AnimationController) {
  return (baseEl: HTMLElement, opts: any) => {
    const DURATION = 500;
    const { direction } = opts;
    const leavingEl = opts.leavingEl;
    const enteringEl = opts.enteringEl;

    const rootTransition = animationCtrl.create()
      .duration(DURATION)
      .easing('cubic-bezier(0.36,0.66,0.04,1)');

    const enteringPage = animationCtrl.create()
      .addElement(enteringEl)
      .fromTo('opacity', 0, 1);

    const leavingPage = animationCtrl.create()
      .addElement(leavingEl)
      .fromTo('opacity', 1, 0);

    if (direction === 'back') {
      rootTransition.addAnimation([enteringPage, leavingPage]);
    } else {
      rootTransition.addAnimation([enteringPage, leavingPage]);
    }

    return rootTransition;
  };
}