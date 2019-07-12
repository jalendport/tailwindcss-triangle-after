# Triangle After Tailwind Plugin

## Installation

Add this plugin to your project:

```bash
# Install via npm
npm install --save-dev tailwindcss-triangle-after

# Install via Yarn
yarn add -D tailwindcss-triangle-after
```

## Usage

This plugin generates styles for CSS based triangles via `::after` pseudo-elements.

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
    trianglesAfter: theme => ({
      select: {
        color: "#000000",
        direction: "down",
        size: [10, 6],
      },
      next: {
        color: theme("colors.blue.600"),
        direction: "right",
        right: "2rem",
        top: "3rem",
        size: 12,
      },
    }),
    // ...
  },
  variants: {
    // ...
    trianglesAfter: ["responsive", "hover"],
    // ...
  },
  plugins: [require("tailwindcss-triangle-after")()],
};
```

This configuration would create the following classes ideal for customizing `<select>` elements and adding arrows to pagination links:

```css
.triangle-after-select {
  position: relative;
}

.triangle-after-select::after {
  border-color: transparent;
  border-style: solid;
  content: "";
  height: 0;
  position: absolute;
  pointer-events: none;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  right: 1rem;
  border-top-color: #000000;
  border-width: 6px 5px 0 5px;
}

.triangle-after-next {
  position: relative;
}

.triangle-after-next::after {
  border-color: transparent;
  border-style: solid;
  content: "";
  height: 0;
  position: absolute;
  pointer-events: none;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  right: 2rem;
  border-left-color: #3182ce;
  border-width: 12px 0 12px 12px;
}
```

## Options

| Name        | Type                                    | Required / Default   | Description                                                                                                                                                                                                                                                                                           |
| ----------- | --------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color`     | `string`                                | _required_, `""`     | The color of the triangle. Needs to be a CSS color name, hex code, rgb(a) value, or reference to one of your Tailwind colors via `theme()`.                                                                                                                                                           |
| `direction` | `string`                                | _required_, `""`     | The direction the arrow points. Needs to be: `up`, `down`, `left` or `right`.                                                                                                                                                                                                                         |
| `top`       | `string`                                | _optional_, `"50%"`  | The distance from the top of the parent element. Needs to be a valid CSS spacing value.                                                                                                                                                                                                               |
| `right`     | `string`                                | _optional_, `"1rem"` | The distance from the right of the parent element. Needs to be a valid CSS spacing value.                                                                                                                                                                                                             |
| `size`      | `array` of integers OR single `integer` | _required_, `""`     | The width and height of the triangle. If an array is passed, the first item in the array is used as the width and the second item as the height (_e.g._ `[width, height]`). If a single integer is passed it will be used for both the width and the height, and so the triangle will be equilateral. |
