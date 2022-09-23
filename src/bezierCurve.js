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
        (options.quadraticCurve == true) ? quadraticCurve(ctx, options) : false ;
        
        function quadraticCurve(ctx, options) {
          console.log(options.endX)
          ctx.beginPath();
          ctx.moveTo(options.startX, options.startY);
          ctx.quadraticCurveTo(options.controlPoint[0].controlX,options.controlPoint[0].controlY, options.endX, options.endY);
          (options.strokeColor) ? ctx.strokeStyle = options.strokeColor : false;
          (options.fillColor) ? ctx.fillStyle = options.fillColor : false;
          (options.fillColor) ? ctx.fill() : false;
          ctx.stroke();
        }
      }

    }
  }
}