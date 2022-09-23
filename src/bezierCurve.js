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