# react-scroll-snap-points-slider

React slider (use CSS Scroll Snap Points)

### Features

- very nice scroll experience on mobile devices

### Installation

> `npm install --save react-scroll-snap-points-slider`

### Usage

import:

`import RactScrollSnapPointsSlider from "react-scroll-snap-points-slider";`

and use as:

```jsx
<RactScrollSnapPointsSlider
    dots={true}
    onSlideChanged={() => {}}
    slides={
        images.map((image, i) => (
            <figure key={i} onClick={() => {}}>
                <img src={image.source} />
            </figure>
        ))
    }
/>
```

### Demo

TODO: add code sandbox example...

### License

[MIT](https://github.com/oleh-polishchuk/react-scroll-snap-points-slider/blob/master/LICENSE)
