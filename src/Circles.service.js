import {Injectable} from 'angular2/core';
import {SourceCircle} from './SourceCircle';

@Injectable()
export class Circles{
	collisionCircles = [];
	collisionCircleMap = new Map();

	static parameters = ['canvasWidth', 'canvasHeight', 'sourceCircleCount'];
	constructor(canvasWidth, canvasHeight, sourceCircleCount){
		this.makeSourceCircles(sourceCircleCount, canvasWidth, canvasHeight);
		this.makeSourceCirclePairs();
	}

	update(timeStep){
		for(const circle of this.sourceCircles){
			circle.move();
		}

		for(const pair of this.sourceCirclePairs){
			const {left, right} = pair;
			const dist = this.distance(left.x, left.y, right.x, right.y);
			const overlap = dist - left.radius - right.radius;

			if(overlap < 0){
				const midX = (left.x + right.x) / 2;
				const midY = (left.y + right.y) / 2;

				let collisionCircle = this.collisionCircleMap.get(pair);
				if(collisionCircle){
					collisionCircle.x = midX;
					collisionCircle.y = midY;
					collisionCircle.radius = -overlap;
				}
				else{
					collisionCircle = {
						x     : midX,
						y     : midY,
						radius: -overlap
					};
					this.collisionCircleMap.set(pair, collisionCircle);
					this.collisionCircles.push(collisionCircle);
				}

				if(!collisionCircle.visible){
					collisionCircle.visible = true;
					collisionCircle.color = this.colorString({
						red  : timeStep % 255,
						green: (timeStep + 170) % 230,
						blue : (timeStep + 85) % 230,
						alpha: 0.5
					});
				}
			}
			else if(this.collisionCircleMap.has(pair)){
				this.collisionCircleMap.get(pair).visible = false;
			}
		}
	}

	makeSourceCircles(count, canvasWidth, canvasHeight){
		this.sourceCircles = [];

		for(let i=0 ; i < count ; i++){
			this.sourceCircles.push(new SourceCircle(canvasWidth, canvasHeight));
		}
	}

	makeSourceCirclePairs(){
		this.sourceCirclePairs = [];

		for(let i=0 ; i < this.sourceCircles.length - 1 ; i++){
			for(let j=i ; j < this.sourceCircles.length - 1 ; j++){
				this.sourceCirclePairs.push({
					left : this.sourceCircles[i],
					right: this.sourceCircles[j + 1]
				});
			}
		}
	}

	colorString(color){
		return `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`;
	}

	distance(x1, y1, x2, y2){
		return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
	}

}