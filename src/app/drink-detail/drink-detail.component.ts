import { Component, OnInit, Input } from '@angular/core';
import { Drink } from '../drink';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DrinkService } from '../drink.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.scss']
})
export class DrinkDetailComponent implements OnInit {
  @Input() drink: Drink;
  separated: any;
  mainColor: string;
  secondaryColor: string;
  forBorder: string;
  // forBorderTop: string;
  constructor(
    private route: ActivatedRoute,
    private drinkService: DrinkService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getDrink();
  }

  getDrink(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // console.log(id);
    this.drinkService.getDrink(id).subscribe(drink =>
      {
        this.drink = drink;
        this.separated = drink.ingredients.split(',');
        // console.log(this.separated);
        this.getColor();
      }
    );
  }

  getColor() {
    this.drinkService.getColors(this.drink.img).subscribe(res => {
      this.forBorder = '8px solid ' + res[0];
      this.mainColor = res[0];
      this.secondaryColor = res[1];
      // this.forBorder = 'thin solid ' + res[1];
      // this.forBorderTop = 'thick solid ' + res[1];
      // console.log(this.mainColor);
      // console.log(this.secondaryColor);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
