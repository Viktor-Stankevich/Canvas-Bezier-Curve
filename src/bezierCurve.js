// Класс для создания Canvas
class CreateCanvas {
  constructor(options) {

    this.cnv = document.createElement('canvas');
    this.ctx = this.cnv.getContext('2d');

    options.el.appendChild(this.cnv);

    this.setCanvasSize(options);

    // Отзывчивость
    (options.fullSize == true) ? window.addEventListener('resize', () => this.setCanvasSize(options)) : false;
 }
  // Размер Canvas
  setCanvasSize(options) {
    (options.fullSize == true) ? fullSize(this.cnv, options.el) : customSize(this.cnv, options.width, options.height);

    function fullSize(cnv, el) {
      cnv.width = el.offsetWidth;
      cnv.height = el.offsetHeight;
    }

    function customSize(cnv, width, height) {
      cnv.width = width;
      cnv.height = height;

    }
  }
}

// Класс для создания кривой
class DrawCurve extends CreateCanvas {
  constructor(options) {
    super(options);

    // Вызов метода draw
    this.draw(options.draw)

  }

  // Рисование кривой
  draw(options) {
    for (let i = 0; i < options.length; i++) {

      (options[i].figure == 'BezierCurve') ? bezierCurve(this.ctx, options[i]) :
      (options[i].figure == 'Square') ? square(this.ctx, options[i]) : false;
      
      function bezierCurve(ctx, options) {
        (options.quadraticCurve == true && (options.bezierCurve == false || !options.bezierCurve)) ? quadraticCurve(ctx, options) : 
        (options.bezierCurve == true && (options.quadraticCurve == false || !options.quadraticCurve)) ? bezierCurve(ctx, options) : false;
        
        function quadraticCurve(ctx, options) {
          ctx.beginPath();
          ctx.moveTo(options.startX, options.startY);
          ctx.quadraticCurveTo(options.controlPoint[0].controlX,options.controlPoint[0].controlY, options.endX, options.endY);
          (options.strokeColor) ? ctx.strokeStyle = options.strokeColor : false;
          (options.fillColor) ? ctx.fillStyle = options.fillColor : false;
          (options.fillColor) ? ctx.fill() : false;
          ctx.stroke();
        }

        function bezierCurve(ctx, options) {
          ctx.beginPath();
          ctx.moveTo(options.startX, options.startY);
          const controls = {x : [], y : []};
          for (let i = 0; i < options.controlPoint.length; i++) {
            console.log(options.endY)
            let _controlX = options.controlPoint[i].controlX;
            let _controlY = options.controlPoint[i].controlY;
            controls.x.push(_controlX);
            controls.y.push(_controlY);
          }
          ctx.bezierCurveTo(controls.x[0], controls.y[0], controls.x[1], controls.y[1], options.endX, options.endY);
          (options.strokeColor) ? ctx.strokeStyle = options.strokeColor : false;
          (options.fillColor) ? ctx.fillStyle = options.fillColor : false;
          (options.fillColor) ? ctx.fill() : false;
          ctx.stroke();
        }
      }

    }
  }
}