// the drawing board
var board = JXG.JSXGraph.initBoard("jxgbox", {
  boundingbox: [-10, 5, 10, -5],
  keepaspectratio: true,
  showCopyright: false,
  showNavigation: false,
  showInfobox: false,
});

// store all points and lines information
var points = [];
var lines = [];
var clickedPoints = [];
var info_count = 0;

// create a new sub window at assigned place
// this window show some information about the point
// refer to: https://mrcodingroom.freesite.host/js%E6%87%B8%E6%B5%AE%E5%BC%8F%E7%AA%97%E3%80%81%E6%8B%96%E5%8B%95%E8%A6%96%E7%AA%97%E3%80%81%E5%BB%A3%E5%91%8A%E8%A6%96%E7%AA%97/
const createADWindow = (app, id, startX, startY, point) => {
  // set up sub window
  if (document.getElementById(id)) return;
  const mainDiv = document.createElement("div");
  mainDiv.id = id;
  mainDiv.style.cssText = `position: absolute; top:${startY}px; left: ${startX}px; border-radius: 5px; font-size: 18px;`;
  mainDiv.style.width = "100px";
  mainDiv.style.height = "100px";
  mainDiv.style.backgroundColor = "rgb(143, 171, 217)";
  mainDiv.style.color = "aliceblue";

  // point's information
  var name = point.getName();
  var posX = point.X();
  var posY = point.Y();
  mainDiv.innerHTML =
    "<p>" + name + "</p>" + "<p> (" + posX + ", " + posY + ")" + "</p>";

  // add new window
  app.appendChild(mainDiv);
};

// create a window that show the point's information when hover the point
function show_info(p) {
  // get mouse position
  // refer to: https://tw511.com/a/01/2703.html
  var parent = document.querySelector(".draw");
  var posX = 0;
  var posY = 0;
  var event = event || window.event;
  if (event.pageX || event.pageY) {
    posX = event.pageX;
    posY = event.pageY;
  } else if (event.clientX || event.clientY) {
    posX =
      event.clientX +
      document.documentElement.scrollLeft +
      document.body.scrollLeft;
    posY =
      event.clientY +
      document.documentElement.scrollTop +
      document.body.scrollTop;
  }

  // create new window
  createADWindow(parent, "new", posX - 50, posY + 20, p);
}

// hide information when not hovering the point
function hide_info(p) {
  if (document.getElementById("new")) {
    document.getElementById("new").remove();
  }
}

function select_info(info) {
  var info_obj = document.querySelector(".select-info");

  info_count += 1;
  if (info_count > 15) {
    info_obj.innerHTML = "";
    info_count = 0;
  }

  info_obj.innerHTML += info;
}

function delete_line(l) {
  var p1 = l.point1;
  var p2 = l.point2;
  var name = l.getName();

  // recored information
  var info = "Delete line: (" + p1.getName() + ", " + p2.getName() + ")<br>";
  select_info(info);

  // remove line
  for (i = 0; i < lines.length; i++) {
    if (lines[i].getName() == name) {
      lines.splice(i, 1);
      break;
    }
  }
  l.remove();
}

// record point that is clicked
// draw a new line when click two points
function click_point(p) {
  // show select information
  var name = p.getName();
  var info = "Select point: " + name + "<br>";
  select_info(info);

  clickedPoints.push(p);

  // draw new line
  if (clickedPoints.length > 1) {
    var p1 = clickedPoints.pop();
    var p2 = clickedPoints.pop();
    var l = board.create("line", [p1, p2], {
      straightFirst: false,
      straightLast: false,
    });

    l.on("down", function () {
      delete_line(this);
    });

    var info = "Create line: (" + p1.getName() + ", " + p2.getName() + ")<br>";
    select_info(info);
    lines.push(l);
  }
}

// draw a new line when new point added
function add_line() {
  var p1 = points[points.length - 2];
  var p2 = points[points.length - 1];
  var l = board.create("line", [p1, p2], {
    straightFirst: false,
    straightLast: false,
  });

  l.on("down", function () {
    delete_line(this);
  });

  lines.push(l);
}

// add a random new point when button is clicked
function add_point() {
  var x = Math.floor(Math.random() * 19) - 9;
  var y = Math.floor(Math.random() * 9) - 4;
  var p = board.create("point", [x, y], { size: 6 });

  // points event triggers
  p.on("over", function () {
    show_info(this);
  });

  p.on("out", function () {
    hide_info(this);
  });

  p.on("down", function () {
    click_point(this);
  });
  points.push(p);

  // information show
  var info = "Create point: " + p.getName() + " (" + x + ", " + y + ")<br>";
  select_info(info);

  // draw line when over 1 points
  if (points.length != 1) {
    add_line();
  }
}

// delete the last point and the line attached on the point
function delete_point() {
  var p = points.pop();
  var p_name = p.getName();

  // information show
  var info = "Delete point: " + p_name + " (" + p.X() + ", " + p.Y() + ")<br>";
  select_info(info);

  // remove point
  p.remove();

  // remove attached lines
  for (i = 0; i < lines.length; i++) {
    var p1 = lines[i].point1.getName();
    var p2 = lines[i].point2.getName();

    if (p1 == p_name || p2 == p_name) {
      delete_line(lines[i]);
      i = 0;
    }
  }

  // remove clicked point
  for (i = 0; i < clickedPoints.length; i++) {
    if (clickedPoints[i].getName() == p_name) {
      clickedPoints.splice(i, 1);
      i = 0;
    }
  }
}
