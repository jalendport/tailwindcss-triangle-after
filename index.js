const _ = require("lodash");

const baseTriangle = {
  borderColor: "transparent",
  borderStyle: "solid",
  content: '""',
  height: 0,
  position: "absolute",
  pointerEvents: "none",
  width: 0,
};

const getTriangle = function(triangle) {
  let triangleStyles = _.clone(baseTriangle);

  triangleStyles["top"] = triangle.top ? triangle.top : null;
  triangleStyles["right"] = triangle.right ? triangle.right : null;
  triangleStyles["bottom"] = triangle.bottom ? triangle.bottom : null;
  triangleStyles["left"] = triangle.left ? triangle.left : null;

  triangleStyles["zIndex"] = triangle.zIndex ? triangle.zIndex : null;

  if (triangle.translate.length === 2) {
    triangleStyles["transform"] = `translate(
        ${triangle.translate[0]},
        ${triangle.translate[1]}
      )`;
  } else {
    triangleStyles["transform"] = `translateX(${triangle.translate})`;
  }

  if (triangle.size.length === 2) {
    var tY =
      triangle.direction == "up" || triangle.direction == "down"
        ? triangle.size[1] + "px"
        : triangle.size[1] / 2 + "px";
    var tX =
      triangle.direction == "up" || triangle.direction == "down"
        ? triangle.size[0] / 2 + "px"
        : triangle.size[0] + "px";
  } else {
    var tY = triangle.size + "px";
    var tX = triangle.size + "px";
  }

  switch (triangle.direction) {
    case "up":
      triangleStyles["borderBottomColor"] = triangle.color;
      triangleStyles["borderWidth"] = [0, tX, tY, tX].join(" ");
      break;
    case "down":
      triangleStyles["borderTopColor"] = triangle.color;
      triangleStyles["borderWidth"] = [tY, tX, 0, tX].join(" ");
      break;
    case "left":
      triangleStyles["borderRightColor"] = triangle.color;
      triangleStyles["borderWidth"] = [tY, tX, tY, 0].join(" ");
      break;
    case "right":
      triangleStyles["borderLeftColor"] = triangle.color;
      triangleStyles["borderWidth"] = [tY, 0, tY, tX].join(" ");
      break;
  }

  return triangleStyles;
};

module.exports = function() {
  return function({ addUtilities, e, theme, variants }) {
    const triangles = theme("trianglesAfter", {});

    const utilities = _.map(triangles, (triangle, name) => ({
      [`.${e(`triangle-after-${name}`)}`]: { position: "relative" },
      [`.${e(`triangle-after-${name}`)}:after`]: getTriangle(triangle),
    }));

    addUtilities(utilities, variants("trianglesAfter"));
  };
};
