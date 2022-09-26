window.onload = () => {
  
  const element = document.body;

  let drawCurve = new DrawCurve({
    el: element,
    fullSize: true,
    draw: [
      {
        figure: 'BezierCurve',
        bezierCurve: true,
        animation: true,
        startX: 10,
        startY: 50,
        controlPoint: [
          {
            // В процентах
            controlX: 30,
            controlY: 40
          },
          {
            controlX: 70,
            controlY: 60
          },
        ],
        endX: 100,
        endY: 50,
        strokeColor: '#fff',
      },
      {
        figure: 'BezierCurve',
        bezierCurve: true,
        animation: true,
        startX: 20,
        startY: 60,
        controlPoint: [
          {
            // В процентах
            controlX: 50,
            controlY: 30
          },
          {
            controlX: 70,
            controlY: 60
          },
        ],
        endX: 100,
        endY: 50,
        strokeColor: '#fff',
      },
      {
        figure: 'BezierCurve',
        bezierCurve: true,
        animation: true,
        startX: 5,
        startY: 30,
        controlPoint: [
          {
            // В процентах
            controlX: 30,
            controlY: 40
          },
          {
            controlX: 70,
            controlY: 60
          },
        ],
        endX: 100,
        endY: 50,
        strokeColor: '#fff',
      },
    ]
  })

}
