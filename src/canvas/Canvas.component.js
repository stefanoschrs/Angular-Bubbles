import {Component} from 'angular2/core';
import {Circles} from '../Circles.service';
import {CircleComponent} from '../circle/Circle.component';

@Component({
	selector: 'bb-canvas',
	template: `
		<svg [attr.viewBox]="'0 0 ' + canvasWidth + ' ' + canvasHeight" preserveAspectRatio="xMidYMid meet">
			<svg:g bb-circle
				*ngFor="let circle of circles.collisionCircles"
				[x]="circle.x"
				[y]="circle.y"
				[radius]="circle.radius"
				[color]="circle.color"
				[visible]="circle.visible">
			</svg:g>
		</svg>
	`,
	styles: [require('css!./Canvas.component.css').toString()],
	directives: [CircleComponent],
	providers: [Circles]
})
export class CanvasComponent{
	static parameters = ['canvasWidth', 'canvasHeight', Circles];
	constructor(canvasWidth, canvasHeight, circles){
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.circles = circles;
	}

	ngOnInit(){
		this.running = true;
		this.timeStep = 0;

		this.onAnimationFrame();
	}

	ngOnDestroy(){
		this.running = false;
	}

	onAnimationFrame(){
		this.timeStep++;
		this.circles.update(this.timeStep);

		if(this.running){
			requestAnimationFrame(() => this.onAnimationFrame());
		}
	}
}