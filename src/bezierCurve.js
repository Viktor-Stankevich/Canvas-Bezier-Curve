// Класс для создания Canvas
class CreateCanvas {
  constructor(options) {

    this.cnv = document.createElement('canvas');
    this.ctx = this.cnv.getContext('2d');
    this.size = { w : 0, h : 0, cx : 0, cy : 0 };

    options.el.appendChild(this.cnv);

    this.setCanvasSize(options);

    // Отзывчивость
    (options.fullSize == true) ? window.addEventListener('resize', () => this.setCanvasSize(options)) : false;
 }
  // Размер Canvas
  setCanvasSize(options) {
    (options.fullSize == true) ? fullSize(this.cnv, options.el, this.size) : customSize(this.cnv, options.width, options.height, this.size);
    function fullSize(cnv, el, size) {
      cnv.width = el.offsetWidth;
      cnv.height = el.offsetHeight;
      size.w = cnv.width;
      size.h = cnv.height;
      size.cx = cnv.width / 2;
      size.cy = cnv.height / 2;
    }

    function customSize(cnv, width, height, size) {
      cnv.width = width;
      cnv.height = height;
      size.w = cnv.width;
      size.h = cnv.height;
      size.cx = cnv.width / 2;
      size.cy = cnv.height / 2;
    }
  }
}

// Класс для создания кривой
class DrawCurve extends CreateCanvas {
  constructor(options) {
    super(options);
    // Вызов метода draw
    this.draw(options.draw, this.size)

  }

  // Рисование кривой
  draw(options, size) {
    for (let i = 0; i < options.length; i++) {

      (options[i].figure == 'BezierCurve') ? bezierCurve(this.ctx, options[i]) :
      (options[i].figure == 'Square') ? square(this.ctx, options[i]) : false;
      
      function bezierCurve(ctx, options) {
        (options.quadraticCurve == true && (options.bezierCurve == false || !options.bezierCurve)) ? quadraticCurve(ctx, options, size) : 
        (options.bezierCurve == true && (options.quadraticCurve == false || !options.quadraticCurve)) ? bezierCurve(ctx, options, size) : false;
        
        function quadraticCurve(ctx, options, size) {

          let _startX = size.w * (options.startX / 100);
          let _startY = size.h * (options.startY / 100);
          let _endX = size.w * (options.endX / 100);
          let _endY = size.h * (options.endY / 100);

          ctx.beginPath();
          ctx.moveTo(_startX, _startY);
          let _controlX = size.w * (options.controlPoint[0].controlX / 100);
          let _controlY = size.h * (options.controlPoint[0].controlY / 100);
          ctx.quadraticCurveTo(_controlX, _controlY, _endX, _endY);
          (options.strokeColor) ? ctx.strokeStyle = options.strokeColor : false;
          (options.fillColor) ? ctx.fillStyle = options.fillColor : false;
          (options.fillColor) ? ctx.fill() : false;
          ctx.stroke();
        }

        function bezierCurve(ctx, options, size) {

          let _startX = size.w * (options.startX / 100);
          let _startY = size.h * (options.startY / 100);
          let _endX = size.w * (options.endX / 100);
          let _endY = size.h * (options.endY / 100);

          ctx.beginPath();
          ctx.moveTo(_startX, _startY);
          const controls = {x : [], y : []};
          for (let i = 0; i < options.controlPoint.length; i++) {
            let _controlX = size.w * (options.controlPoint[i].controlX / 100);
            let _controlY = size.h * (options.controlPoint[i].controlY / 100);
            controls.x.push(_controlX);
            controls.y.push(_controlY);
          }
          ctx.bezierCurveTo(controls.x[0], controls.y[0], controls.x[1], controls.y[1], _endX, _endY);
          (options.strokeColor) ? ctx.strokeStyle = options.strokeColor : false;
          (options.fillColor) ? ctx.fillStyle = options.fillColor : false;
          (options.fillColor) ? ctx.fill() : false;
          ctx.stroke();
        }
      }

    }
  }
}