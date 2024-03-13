import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.page.html',
  styleUrls: ['./calculate.page.scss'],
})
export class CalculatePage implements OnInit {

  @Input() hoursNeeded: string;
  @Input() soberAt: string;
  @Input() animation: string;
  @Input() bac: number;
  @Input() modalCtrl: ModalController;
  soberLevel: string;

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    if (this.bac <= 0.039999999)
    {
      this.soberLevel = 'No loss of coordination, slight euphoria, and loss of shyness. Relaxation, but depressant effects are not apparent.';
      this.animation = 'calculateAnimation1';
    }
    else if (this.bac > 0.040 && this.bac <= 0.059999999)
    {
      this.soberLevel = 'Feeling of well-being, relaxation, lower inhibitions, and sensation of warmth. Euphoria. Some minor impairment of judgment and memory, lowering of caution.';
      this.animation = 'calculateAnimation2';
    }
    else if (this.bac > 0.06 && this.bac <= 0.0999999999)
    {
      this.soberLevel = 'Slight impairment of balance, speech, vision, reaction time, and hearing. Euphoria. Reduced judgment and self-control. Impaired reasoning and memory.';
      this.animation = 'calculateAnimation3';
    }
    else if (this.bac > 0.100 && this.bac <= 0.1299999999)
    {
      this.soberLevel = 'Significant impairment of motor coordination and loss of good judgment. Speech may be slurred; balance, peripheral vision, reaction time, and hearing will be impaired.';
      this.animation = 'calculateAnimation4';
    }
    else if (this.bac > 0.130 && this.bac <= 0.1599999999)
    {
      this.soberLevel = 'Gross motor impairment and lack of physical control. Blurred vision and major loss of balance. Euphoria is reducing and beginning dysphoria (a state of feeling unwell)';
      this.animation = 'calculateAnimation5';
    }
    else if (this.bac > 0.160 && this.bac <= 0.1999999999)
    {
      this.soberLevel = 'Dysphoria predominates, nausea may appear. The drinker has the appearance of a sloppy drunk.';
      this.animation = 'calculateAnimation6';
    }
    else if (this.bac > 0.200 && this.bac <= 0.249999999)
    {
      this.soberLevel = 'Needs assistance in walking; total mental confusion. Dysphoria with nausea and vomiting; possible blackout.';
      this.animation = 'calculateAnimation7';
    }
    else if (this.bac > 0.250 && this.bac <= 0.399999999)
    {
      this.soberLevel = 'Alcohol poisoning. Loss of consciousness.';
      this.animation = 'calculateAnimation8';
    }
    else if (this.bac > 0.40 && this.bac <= 0.4399999999)
    {
      this.soberLevel = 'Onset of coma, possible death due to respiratory arrest.';
      this.animation = 'calculateAnimation9';
    }
    else if(this.bac > 0.4399999999)
    {
      this.soberLevel = 'Uhh you probably can\'t read this so whatever lol';
      this.animation = 'calculateAnimation10';
    }
  }

}
